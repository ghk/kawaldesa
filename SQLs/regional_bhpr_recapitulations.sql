create or replace view regional_bhpr_recapitulations as
select
  apbn.key || '-' || r.id as id,
  r.id as region_id,
  apbn.key as apbn_key,
  r.name as region_name,
  r.parent_id as parent_region_id,
  bhpr.base_allocation as base_allocation,
  bhpr.pdrd as pdrd,
  bhpr.pdrd_ratio as pdrd_ratio,
  bhpr.formula_based_allocation as formula_based_allocation,
  bhpr.bhpr as bhpr
  from apbns apbn
  cross join region_parents r
  inner join apbds apbd on apbn.id = apbd.fk_apbn_id and apbd.fk_region_id = r.parent_parent_id
  inner join region_desa_counts rdc on r.id = rdc.id
  left outer join regional_bhpr_allocations bhpr 
	on bhpr.is_activated = true
	and apbd.id = bhpr.fk_apbd_id 
	and r.id = bhpr.fk_region_id
  where r.type = 4
 union
 select
  
  bhpr.apbn_key || '-' || bhpr.region_id as id,
  bhpr.region_id as region_id,
  bhpr.apbn_key as apbn_key,
  bhpr.region_name as region_name,
  bhpr.parent_region_id as parent_region_id,
  bhpr.base_allocation as base_allocation,
  bhpr.pdrd as pdrd,
  bhpr.pdrd_ratio as pdrd_ratio,
  bhpr.formula_based_allocation as formula_based_allocation,
  bhpr.bhpr as bhpr

  FROM regional_bhpr_sums bhpr
     JOIN region_desa_counts rdc ON bhpr.region_id::text = rdc.id::text;
