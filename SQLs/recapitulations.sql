CREATE OR REPLACE VIEW dbo."Recapitulations" AS
    SELECT
	apbn."ID" * 100000 + r."ID" as "ID",
	r."ID" as "RegionID",
	apbn."ID" as "APBNID",
	apbn."Year" as "APBNYear",
	r."fkParentID" as "ParentRegionID",
	r."Name" as "RegionName",
	COALESCE((
		select apbn."DanaPerDesa" * count(desa."ID")
		from dbo."Regions" desa 
		inner join dbo."Regions" kec on desa."fkParentID" = kec."ID"
		inner join dbo."Regions" kab on kec."fkParentID" = kab."ID"
		inner join dbo."Regions" prov on kab."fkParentID" = prov."ID"
		inner join dbo."Regions" nas on prov."fkParentID" = nas."ID"
		where desa."Type" = 4 AND (
			(r."Type" = 0 AND nas."ID" = r."ID") 
			OR (r."Type" = 1 AND prov."ID" = r."ID") 
			OR (r."Type" = 2 AND kab."ID" = r."ID") 
			OR (r."Type" = 3 AND kec."ID" = r."ID")
		)
	), 0) as "BudgetedAPBN",
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."Regions" desa on t."fkDestinationID" = desa."ID"
		inner join dbo."Regions" kec on desa."fkParentID" = kec."ID"
		inner join dbo."Regions" kab on kec."fkParentID" = kab."ID"
		inner join dbo."Regions" prov on kab."fkParentID" = prov."ID"
		inner join dbo."Regions" nas on prov."fkParentID" = nas."ID"
		where t."fkSourceID" = 0 AND t."fkActorID" = 0 AND t."IsCommited" AND (
			(r."Type" = 0 AND nas."ID" = r."ID") 
			OR (r."Type" = 1 AND prov."ID" = r."ID") 
			OR (r."Type" = 2 AND kab."ID" = r."ID") 
			OR (r."Type" = 3 AND kec."ID" = r."ID")
		)
	), 0) as "TransferredAPBN",
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."Regions" desa on t."fkDestinationID" = desa."ID"
		inner join dbo."Regions" kec on desa."fkParentID" = kec."ID"
		inner join dbo."Regions" kab on kec."fkParentID" = kab."ID"
		inner join dbo."Regions" prov on kab."fkParentID" = prov."ID"
		inner join dbo."Regions" nas on prov."fkParentID" = nas."ID"
		where t."fkSourceID" = 0 AND t."fkActorID" = desa."ID" AND t."IsCommited"
			AND (
			(r."Type" = 0 AND nas."ID" = r."ID") 
			OR (r."Type" = 1 AND prov."ID" = r."ID") 
			OR (r."Type" = 2 AND kab."ID" = r."ID") 
			OR (r."Type" = 3 AND kec."ID" = r."ID")
		)
	), 0) as "AcknowledgedAPBN",
	COALESCE((
		select 0.1 * (sum(apbd."DAU") + sum(apbd."DBH"))
		from dbo."APBDs" apbd 
		inner join dbo."Regions" kab on apbd."fkRegionID" = kab."ID"
		inner join dbo."Regions" prov on kab."fkParentID" = prov."ID"
		inner join dbo."Regions" nas on prov."fkParentID" = nas."ID"
		where (
			(r."Type" = 0 AND nas."ID" = r."ID") 
			OR (r."Type" = 1 AND prov."ID" = r."ID") 
			OR (r."Type" = 2 AND kab."ID" = r."ID") 
		)
	), 0) as "BudgetedADD",
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."Regions" desa on t."fkDestinationID" = desa."ID"
		inner join dbo."Regions" kec on desa."fkParentID" = kec."ID"
		inner join dbo."Regions" kab on kec."fkParentID" = kab."ID"
		inner join dbo."Regions" prov on kab."fkParentID" = prov."ID"
		inner join dbo."Regions" nas on prov."fkParentID" = nas."ID"
		where t."fkSourceID" = kab."ID" AND t."fkActorID" = kab."ID" AND t."IsCommited" AND (
			(r."Type" = 0 AND nas."ID" = r."ID") 
			OR (r."Type" = 1 AND prov."ID" = r."ID") 
			OR (r."Type" = 2 AND kab."ID" = r."ID") 
			OR (r."Type" = 3 AND kec."ID" = r."ID")
		)
	), 0) as "TransferredADD",
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."Regions" desa on t."fkDestinationID" = desa."ID"
		inner join dbo."Regions" kec on desa."fkParentID" = kec."ID"
		inner join dbo."Regions" kab on kec."fkParentID" = kab."ID"
		inner join dbo."Regions" prov on kab."fkParentID" = prov."ID"
		inner join dbo."Regions" nas on prov."fkParentID" = nas."ID"
		where t."fkSourceID" = kab."ID" AND t."fkActorID" = desa."ID" AND t."IsCommited" AND (
			(r."Type" = 0 AND nas."ID" = r."ID") 
			OR (r."Type" = 1 AND prov."ID" = r."ID") 
			OR (r."Type" = 2 AND kab."ID" = r."ID") 
			OR (r."Type" = 3 AND kec."ID" = r."ID")
		)
	), 0) as "AcknowledgedADD"
    FROM dbo."Regions" r, dbo."APBNs" apbn where r."Type" in (0, 1, 2, 3);