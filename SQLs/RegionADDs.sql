CREATE MATERIALIZED VIEW dbo."RegionADDs" AS

select 
	r."ID" as "ID",
	apbn."ID" as "APBNID",
	COALESCE((
		select 0.1 * (sum(apbd."DAU") + sum(apbd."DBH"))
		from dbo."APBDs" apbd 
		inner join dbo."RegionParents" kab on apbd."fkRegionID" = kab."ID"
		where  apbd."IsActivated" AND apbd."fkAPBNID" = apbn."ID" AND
			((r."Type" = 0 AND kab."ParentParentID" = r."ID") 
			OR (r."Type" = 1 AND kab."ParentID" = r."ID") 
			OR (r."Type" = 2 AND kab."ID" = r."ID"))
	), 0) as "ADD"
from dbo."Regions" r
cross join dbo."APBNs" apbn
where r."Type" in (0, 1, 2)
union
select 
	r."ID" as "ID",
	apbn."ID" as "APBNID",
	COALESCE((
		select (0.1 * apbd."DAU" + apbd."DBH") * dc."DesaCount" / kab."DesaCount"
		from dbo."APBDs" apbd 
			
		inner join dbo."RegionDesaCounts" kab on apbd."fkRegionID" = kab."ID" 
		where  apbd."IsActivated" AND apbd."fkAPBNID" = apbn."ID" AND (
			(apbd."fkRegionID" = mr."ParentID" AND r."Type" = 3) 
			OR  (apbd."fkRegionID" = mr."ParentParentID" AND r."Type" = 4) 
		)
	), 0) as "ADD"
from dbo."Regions" r
cross join dbo."APBNs" apbn
inner join dbo."RegionParents" mr on r."ID" = mr."ID"
inner join dbo."RegionDesaCounts" dc on r."ID" = dc."ID"
where r."Type" in (3, 4);

CREATE UNIQUE INDEX "RegionADDs_IDX_ID"
  ON dbo."RegionADDs" ("ID"); 