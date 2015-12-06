-- Materialized View: transfer_region_parents

-- DROP MATERIALIZED VIEW transfer_region_parents;

CREATE MATERIALIZED VIEW transfer_region_parents AS 
 SELECT t.id,
    t.dd,
    t.add,
    t.bhpr,
    t.date,
    t.year,
    p.id AS desa_id,
    p.parent_id AS kecamatan_id,
    p.parent_parent_id AS kabupaten_id,
    p.parent_parent_parent_id AS provinsi_id,
    p.parent_parent_parent_parent_id AS nasional_id
   FROM transfers t
     JOIN region_parents p ON t.fk_region_id::text = p.id::text
  WHERE t.is_activated
WITH DATA;

ALTER TABLE transfer_region_parents
  OWNER TO postgres;

CREATE UNIQUE INDEX transfer_region_parents_IDX_id
  ON transfer_region_parents(id); 