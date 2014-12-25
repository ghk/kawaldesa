drop materialized view dbo."RegionParents";
create materialized view dbo."RegionParents" AS

 SELECT 
	desa."ID" as "ID",
	desa."Type" as "Type",
	desa."Name" as "Name",
	kec."ID" as "ParentID",
	kab."ID" as "ParentParentID",
	prov."ID" as "ParentParentParentID",
	nas."ID" as "ParentParentParentParentID"
  from dbo."Regions" desa
	left join dbo."Regions" kec on desa."fkParentID" = kec."ID"
	left join dbo."Regions" kab on kec."fkParentID" = kab."ID"
	left join dbo."Regions" prov on kab."fkParentID" = prov."ID"
	left join dbo."Regions" nas on prov."fkParentID" = nas."ID";

CREATE UNIQUE INDEX "RegionParents_IDX_ID"
  ON dbo."RegionParents" ("ID"); 

CREATE INDEX "RegionParents_IDX_ParentID"
  ON dbo."RegionParents" ("ParentID"); 

CREATE INDEX "RegionParents_IDX_ParentParentID"
  ON dbo."RegionParents" ("ParentParentID"); 

CREATE INDEX "RegionParents_IDX_ParentParentParentID"
  ON dbo."RegionParents" ("ParentParentParentID"); 

CREATE INDEX "RegionParents_IDX_ParentParentParentParentID"
  ON dbo."RegionParents" ("ParentParentParentParentID");