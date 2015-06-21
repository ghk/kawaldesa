create materialized view dbo."RegionDesaCounts" AS
 SELECT 
	desa."ID" as "ID",
	desa."Type" as "Type",
	(select count(d2."ID")
		from dbo."RegionParents" d2 where 
		(d2."ID" = desa."ID" and d2."IsKelurahan" <> true)
				) as "DesaCount"
  from dbo."RegionParents" desa where desa."Type" = 4 
union
 SELECT 
	desa."ID" as "ID",
	desa."Type" as "Type",
	(select count(d2."ID")
		from dbo."RegionParents" d2 where 
		(d2."ParentID" = desa."ID" and d2."IsKelurahan" <> true) 
				) as "DesaCount"
  from dbo."RegionParents" desa where desa."Type" = 3
union
 SELECT 
	desa."ID" as "ID",
	desa."Type" as "Type",
	(select count(d2."ID")
		from dbo."RegionParents" d2 where 
		(d2."ParentParentID" = desa."ID" and d2."IsKelurahan" <> true) 
				) as "DesaCount"
  from dbo."RegionParents" desa where desa."Type" = 2
union
 SELECT 
	desa."ID" as "ID",
	desa."Type" as "Type",
	(select count(d2."ID")
		from dbo."RegionParents" d2 where 
		(d2."ParentParentParentID" = desa."ID" and d2."IsKelurahan" <> true) 
				) as "DesaCount"
  from dbo."RegionParents" desa where desa."Type" = 1 
union
 SELECT 
	desa."ID" as "ID",
	desa."Type" as "Type",
	(select count(d2."ID")
		from dbo."RegionParents" d2 where 
		(d2."ParentParentParentParentID" = desa."ID" and d2."IsKelurahan" <> true) 
				) as "DesaCount"
  from dbo."RegionParents" desa where desa."Type" = 0
  ;
  
CREATE UNIQUE INDEX "RegionDesaCounts_IDX_ID"
  ON dbo."RegionDesaCounts" ("ID"); 