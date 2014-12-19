drop materialized view dbo."MaterializedRegionDesaCounts";
create materialized view dbo."MaterializedRegionDesaCounts" AS
 SELECT 
	desa."ID" as "ID",
	desa."Type" as "Type",
	(select count(d2."ID")
		from dbo."MaterializedRegions" d2 where 
		(d2."ID" = desa."ID")
				) as "DesaCount"
  from dbo."MaterializedRegions" desa where desa."Type" = 4 
union
 SELECT 
	desa."ID" as "ID",
	desa."Type" as "Type",
	(select count(d2."ID")
		from dbo."MaterializedRegions" d2 where 
		(d2."ParentID" = desa."ID") 
				) as "DesaCount"
  from dbo."MaterializedRegions" desa where desa."Type" = 3
union
 SELECT 
	desa."ID" as "ID",
	desa."Type" as "Type",
	(select count(d2."ID")
		from dbo."MaterializedRegions" d2 where 
		(d2."ParentParentID" = desa."ID") 
				) as "DesaCount"
  from dbo."MaterializedRegions" desa where desa."Type" = 2
union
 SELECT 
	desa."ID" as "ID",
	desa."Type" as "Type",
	(select count(d2."ID")
		from dbo."MaterializedRegions" d2 where 
		(d2."ParentParentParentID" = desa."ID") 
				) as "DesaCount"
  from dbo."MaterializedRegions" desa where desa."Type" = 1 
union
 SELECT 
	desa."ID" as "ID",
	desa."Type" as "Type",
	(select count(d2."ID")
		from dbo."MaterializedRegions" d2 where 
		(d2."ParentParentParentParentID" = desa."ID") 
				) as "DesaCount"
  from dbo."MaterializedRegions" desa where desa."Type" = 0
  ;
  
CREATE UNIQUE INDEX "MaterializedRegionDesaCounts_IDX_ID"
  ON dbo."MaterializedRegionDesaCounts" ("ID"); 