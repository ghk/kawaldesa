DROP MATERIALIZED VIEW dbo."FrozenRecapitulations";
CREATE MATERIALIZED VIEW dbo."FrozenRecapitulations" AS
        SELECT
	apbn."ID" * 100000 + r."ID" as "ID",
	r."ID" as "RegionID",
	apbn."ID" as "APBNID",
	apbn."Year" as "APBNYear",
	r."fkParentID" as "ParentRegionID",
	r."Name" as "RegionName",
	apbn."DanaPerDesa" * (select dc."DesaCount" from dbo."RegionDesaCounts" dc where dc."ID" = r."ID") as "BudgetedAPBN",
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."RegionParents" desa on t."fkDestinationID" = desa."ID"
		where t."fkSourceID" = 0 AND t."fkActorID" = 0 AND t."IsActivated" AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "TransferredAPBN",
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."RegionParents" desa on t."fkDestinationID" = desa."ID"
		where t."fkSourceID" = 0 AND t."fkActorID" = desa."ID" AND t."IsActivated"
			AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "AcknowledgedAPBN",
	(select add."ADD" from dbo."RegionADDs" add where add."ID" = r."ID" AND add."APBNID" = apbn."ID") as "BudgetedADD",
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."RegionParents" desa on t."fkDestinationID" = desa."ID"
		where t."fkSourceID" = desa."ParentParentID" AND t."fkActorID" =  desa."ParentParentID" AND t."IsActivated" AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "TransferredADD",
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."RegionParents" desa on t."fkDestinationID" = desa."ID"
		where t."fkSourceID" = desa."ParentParentID" AND t."fkActorID" = desa."ID" AND t."IsActivated" AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "AcknowledgedADD"
    FROM dbo."Regions" r, dbo."APBNs" apbn;

CREATE UNIQUE INDEX "FrozenRecapitulations_IDX_ID"
  ON dbo."FrozenRecapitulations" ("ID"); 
CREATE INDEX "FrozenRecapitulations_IDX_ParentRegionID"
  ON dbo."FrozenRecapitulations" ("ParentRegionID");