create or replace view regional_dd_recapitulations as
select
  apbn.key || '-' || r.id as id,
  r.id as region_id,
  apbn.key as apbn_key,
  r.name as region_name,
  r.parent_id as parent_region_id,
  dd.base_allocation as base_allocation,
  dd.population as population,
  dd.population_ratio as population_ratio,
  dd.population_weight as population_weight,
  dd.poor_population as poor_population,
  dd.poor_population_ratio as poor_population_ratio,
  dd.poor_population_weight as poor_population_weight,
  dd.area as area,
  dd.area_ratio as area_ratio,
  dd.area_weight as area_weight,
  dd.ikg as ikg,
  dd.ikg_ratio as ikg_ratio,
  dd.ikg_weight as ikg_weight,
  dd.total_weight as total_weight,
  dd.formula_based_allocation as formula_based_allocation,
  dd.dd as dd
  from apbns apbn
  cross join region_parents r
  inner join apbds apbd on apbn.id = apbd.fk_apbn_id and apbd.fk_region_id = r.parent_parent_id
  inner join region_desa_counts rdc on r.id = rdc.id
  left outer join regional_dd_allocations dd 
	on dd.is_activated = true
	and apbd.id = dd.fk_apbd_id 
	and r.id = dd.fk_region_id
  where r.type = 4
 union
 select
  
  dd.apbn_key || '-' || dd.region_id as id,
  dd.region_id as region_id,
  dd.apbn_key as apbn_key,
  dd.region_name as region_name,
  dd.parent_region_id as parent_region_id,
  dd.base_allocation as base_allocation,
  dd.population as population,
  dd.population_ratio as population_ratio,
  dd.population_weight as population_weight,
  dd.poor_population as poor_population,
  dd.poor_population_ratio as poor_population_ratio,
  dd.poor_population_weight as poor_population_weight,
  dd.area as area,
  dd.area_ratio as area_ratio,
  dd.area_weight as area_weight,
  dd.ikg as ikg,
  dd.ikg_ratio as ikg_ratio,
  dd.ikg_weight as ikg_weight,
  dd.total_weight as total_weight,
  dd.formula_based_allocation as formula_based_allocation,
  dd.dd as dd

  FROM regional_dd_sums dd
     JOIN region_desa_counts rdc ON dd.region_id::text = rdc.id::text;
