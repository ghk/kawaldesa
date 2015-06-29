create or replace view national_bhpr_recapitulations as
select
  apbn.key || '-' || r.id as id,
  r.id as region_id,
  apbn.key as apbn_key,
  r.name as region_name,
  r.parent_id as parent_region_id,
  bhpr.regional_tax as regional_tax,
  bhpr.regional_retribution as regional_retribution,
  bhpr.bhpr as bhpr,
  rdc.desa_count as total_desa,
  case when bhpr is null then 0 else rdc.desa_count end as completed_desa

  from apbns apbn
  cross join region_parents r
  inner join region_desa_counts rdc on r.id = rdc.id
  inner join apbds apbd on apbd.fk_apbn_id = apbn.id and apbd.fk_region_id = r.id
  left outer join national_bhpr_allocations bhpr 
	on bhpr.is_activated = true
	and apbd.id = bhpr.fk_apbd_id 
	and r.id = bhpr.fk_region_id
  where r.type = 2
 union
 select
  bhpr.apbn_key|| '-' || bhpr.region_id as id,
  bhpr.region_id as region_id,
  bhpr.apbn_key as apbn_key,
  bhpr.region_name as region_name,
  bhpr.parent_region_id as parent_region_id,
  bhpr.regional_tax as regional_tax,
  bhpr.regional_retribution as regional_retribution,
  bhpr.bhpr as bhpr,
  rdc.desa_count as total_desa,
  bhpr.completed_desa as completed_desa

  from national_bhpr_sums bhpr
  inner join region_desa_counts rdc on bhpr.region_id = rdc.id;
