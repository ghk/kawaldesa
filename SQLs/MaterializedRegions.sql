drop materialized view dbo."MaterializedRegions";
create materialized view dbo."MaterializedRegions" AS

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

CREATE UNIQUE INDEX "MaterializedRegions_IDX_ID"
  ON dbo."MaterializedRegions" ("ID"); 

CREATE INDEX "MaterializedRegions_IDX_ParentID"
  ON dbo."MaterializedRegions" ("ParentID"); 

CREATE INDEX "MaterializedRegions_IDX_ParentParentID"
  ON dbo."MaterializedRegions" ("ParentParentID"); 

CREATE INDEX "MaterializedRegions_IDX_ParentParentParentID"
  ON dbo."MaterializedRegions" ("ParentParentParentID"); 

CREATE INDEX "MaterializedRegions_IDX_ParentParentParentParentID"
  ON dbo."MaterializedRegions" ("ParentParentParentParentID");