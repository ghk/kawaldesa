create materialized view region_parents AS

 SELECT 
	desa.id as id,
	desa.type as type,
	desa.name as name,
	desa.is_kelurahan as is_kelurahan,
	kec.id as parent_id,
	kab.id as parent_parent_id,
	prov.id as parent_parent_parent_id,
	nas.id as parent_parent_parent_parent_id
  from regions desa
	left join regions kec on desa.fk_parent_id = kec.id
	left join regions kab on kec.fk_parent_id = kab.id
	left join regions prov on kab.fk_parent_id = prov.id
	left join regions nas on prov.fk_parent_id = nas.id;

CREATE UNIQUE INDEX "region_parents_IDX_id"
  ON region_parents (id); 

CREATE INDEX "region_parents_IDX_parent_id"
  ON region_parents (parent_id); 

CREATE INDEX "region_parents_IDX_parent_parent_id"
  ON region_parents (parent_parent_id); 

CREATE INDEX "region_parents_IDX_parent_parent_parent_id"
  ON region_parents (parent_parent_parent_id); 

CREATE INDEX "region_parents_IDX_parent_parent_parent_parent_id"
  ON region_parents (parent_parent_parent_parent_id);