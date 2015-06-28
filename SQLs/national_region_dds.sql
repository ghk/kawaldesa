create materialized view national_region_dds as
select
  apbn.key || '-' || r.id as id,
  r.id as region_id,
  apbn.key as apbn_key,
  r.name as region_name,
  r.parent_id as parent_region_id,
  sum(dd.regional_transfer) as regional_transfer,
  sum(dd.dd) as dd,
  coalesce(sum(rdc.desa_count), 0::numeric) as completed_desa

  from apbns apbn
  cross join region_parents r
  left outer join national_dd_allocations dd 
	on dd.is_activated = true
	and apbn.id = dd.fk_apbn_id 
	and ( (r.type = 0 and r.parent_parent_id = dd.fk_region_id) or (r.type = 1 and r.parent_id = dd.fk_region_id))
  left outer join region_desa_counts rdc on dd.fk_region_id = rdc.id
  where r.type <= 1
  group by r.id, apbn.key , r.name, r.parent_id, rdc.desa_count
