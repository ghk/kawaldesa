create materialized view region_desa_counts AS
 SELECT 
	desa.id as id,
	desa.type as type,
	(select count(d2.id)
		from region_parents d2 where 
		(d2.id = desa.id and d2.is_kelurahan <> true)
				) as desa_count
  from region_parents desa where desa.type = 4 
union
 SELECT 
	desa.id as id,
	desa.type as type,
	(select count(d2.id)
		from region_parents d2 where 
		(d2.parent_id = desa.id and d2.is_kelurahan <> true) 
				) as desa_count
  from region_parents desa where desa.type = 3
union
 SELECT 
	desa.id as id,
	desa.type as type,
	(select count(d2.id)
		from region_parents d2 where 
		(d2.parent_parent_id = desa.id and d2.is_kelurahan <> true) 
				) as desa_count
  from region_parents desa where desa.type = 2
union
 SELECT 
	desa.id as id,
	desa.type as type,
	(select count(d2.id)
		from region_parents d2 where 
		(d2.parent_parent_parent_id = desa.id and d2.is_kelurahan <> true) 
				) as desa_count
  from region_parents desa where desa.type = 1 
union
 SELECT 
	desa.id as id,
	desa.type as type,
	(select count(d2.id)
		from region_parents d2 where 
		(d2.parent_parent_parent_parent_id = desa.id and d2.is_kelurahan <> true) 
				) as desa_count
  from region_parents desa where desa.type = 0
  ;
  
CREATE UNIQUE INDEX "region_desa_counts_IDX_id"
  ON region_desa_counts (id); 