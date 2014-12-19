DROP MATERIALIZED VIEW dbo."Recapitulations";

CREATE MATERIALIZED VIEW dbo."Recapitulations" AS
        SELECT
	apbn."ID" * 100000 + r."ID" as "ID",
	r."ID" as "RegionID",
	apbn."ID" as "APBNID",
	apbn."Year" as "APBNYear",
	r."fkParentID" as "ParentRegionID",
	r."Name" as "RegionName",
	apbn."DanaPerDesa" * (select dc."DesaCount" from dbo."MaterializedRegionDesaCounts" dc where dc."ID" = r."ID") as "BudgetedAPBN",
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."MaterializedRegions" desa on t."fkDestinationID" = desa."ID"
		where t."fkSourceID" = 0 AND t."fkActorID" = 0 AND t."IsCommited" AND (
			(r."Type" = 0 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "TransferredAPBN",
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."MaterializedRegions" desa on t."fkDestinationID" = desa."ID"
		where t."fkSourceID" = 0 AND t."fkActorID" = desa."ID" AND t."IsCommited"
			AND (
			(r."Type" = 0 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "AcknowledgedAPBN",
	(select add."ADD" from dbo."MaterializedRegionADDs" add where add."ID" = r."ID" AND add."APBNID" = apbn."ID") as "BudgetedADD",
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."MaterializedRegions" desa on t."fkDestinationID" = desa."ID"
		where t."fkSourceID" = desa."ParentParentID" AND t."fkActorID" =  desa."ParentParentID" AND t."IsCommited" AND (
			(r."Type" = 0 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "TransferredADD",
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."MaterializedRegions" desa on t."fkDestinationID" = desa."ID"
		where t."fkSourceID" = desa."ParentParentID" AND t."fkActorID" = desa."ID" AND t."IsCommited" AND (
			(r."Type" = 0 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "AcknowledgedADD"
    FROM dbo."Regions" r, dbo."APBNs" apbn;

CREATE UNIQUE INDEX "Recapitulations_IDX_ID"
  ON dbo."Recapitulations" ("ID"); 
CREATE INDEX "Recapitulations_IDX_ParentRegionID"
  ON dbo."Recapitulations" ("ParentRegionID");