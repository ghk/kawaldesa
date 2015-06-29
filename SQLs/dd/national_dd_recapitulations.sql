create or replace view national_dd_recapitulations as
select
  apbn.key || '-' || r.id as id,
  r.id as region_id,
  apbn.key as apbn_key,
  r.name as region_name,
  r.parent_id as parent_region_id,
  dd.regional_transfer as regional_transfer,
  dd.dd as dd,
  rdc.desa_count as total_desa,
  case when dd is null then 0 else rdc.desa_count end as completed_desa

  from apbns apbn
  cross join region_parents r
  inner join region_desa_counts rdc on r.id = rdc.id
  left outer join national_dd_allocations dd 
	on dd.is_activated = true
	and apbn.id = dd.fk_apbn_id 
	and r.id = dd.fk_region_id
  where r.type = 2
 union
 select
  dd.apbn_key|| '-' || dd.region_id as id,
  dd.region_id as region_id,
  dd.apbn_key as apbn_key,
  dd.region_name as region_name,
  dd.parent_region_id as parent_region_id,
  dd.regional_transfer as regional_transfer,
  dd.dd as dd,
  rdc.desa_count as total_desa,
  dd.completed_desa as completed_desa

  from national_dd_sums dd
  inner join region_desa_counts rdc on dd.region_id = rdc.id;
