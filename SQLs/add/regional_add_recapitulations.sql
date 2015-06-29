create or replace view regional_add_recapitulations as
select
  apbn.key || '-' || r.id as id,
  r.id as region_id,
  apbn.key as apbn_key,
  r.name as region_name,
  r.parent_id as parent_region_id,
  add.base_allocation as base_allocation,
  add.population as population,
  add.population_ratio as population_ratio,
  add.population_weight as population_weight,
  add.poor_population as poor_population,
  add.poor_population_ratio as poor_population_ratio,
  add.poor_population_weight as poor_population_weight,
  add.area as area,
  add.area_ratio as area_ratio,
  add.area_weight as area_weight,
  add.ikg as ikg,
  add.ikg_ratio as ikg_ratio,
  add.ikg_weight as ikg_weight,
  add.total_weight as total_weight,
  add.formula_based_allocation as formula_based_allocation,
  add.add as add
  from apbns apbn
  cross join region_parents r
  inner join apbds apbd on apbn.id = apbd.fk_apbn_id and apbd.fk_region_id = r.parent_parent_id
  inner join region_desa_counts rdc on r.id = rdc.id
  left outer join regional_add_allocations add 
	on add.is_activated = true
	and apbd.id = add.fk_apbd_id 
	and r.id = add.fk_region_id
  where r.type = 4
 union
 select
  
  add.apbn_key || '-' || add.region_id as id,
  add.region_id as region_id,
  add.apbn_key as apbn_key,
  add.region_name as region_name,
  add.parent_region_id as parent_region_id,
  add.base_allocation as base_allocation,
  add.population as population,
  add.population_ratio as population_ratio,
  add.population_weight as population_weight,
  add.poor_population as poor_population,
  add.poor_population_ratio as poor_population_ratio,
  add.poor_population_weight as poor_population_weight,
  add.area as area,
  add.area_ratio as area_ratio,
  add.area_weight as area_weight,
  add.ikg as ikg,
  add.ikg_ratio as ikg_ratio,
  add.ikg_weight as ikg_weight,
  add.total_weight as total_weight,
  add.formula_based_allocation as formula_based_allocation,
  add.add as add

  FROM regional_add_sums add
     JOIN region_desa_counts rdc ON add.region_id::text = rdc.id::text;
