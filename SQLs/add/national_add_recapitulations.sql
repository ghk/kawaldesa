create or replace view national_add_recapitulations as
select
  apbn.key || '-' || r.id as id,
  r.id as region_id,
  apbn.key as apbn_key,
  r.name as region_name,
  r.parent_id as parent_region_id,
  add.dbh as dbh,
  add.dau as dau,
  add.dak as dak,
  add.add as add,
  rdc.desa_count as total_desa,
  case when add is null then 0 else rdc.desa_count end as completed_desa

  from apbns apbn
  cross join region_parents r
  inner join region_desa_counts rdc on r.id = rdc.id
  inner join apbds apbd on apbd.fk_apbn_id = apbn.id and apbd.fk_region_id = r.id
  left outer join national_add_allocations add 
	on add.is_activated = true
	and apbd.id = add.fk_apbd_id 
	and r.id = add.fk_region_id
  where r.type = 2
 union
 select
  add.apbn_key|| '-' || add.region_id as id,
  add.region_id as region_id,
  add.apbn_key as apbn_key,
  add.region_name as region_name,
  add.parent_region_id as parent_region_id,
  add.dbh as dbh,
  add.dau as dau,
  add.dak as dak,
  add.add as add,
  rdc.desa_count as total_desa,
  add.completed_desa as completed_desa

  from national_add_sums add
  inner join region_desa_counts rdc on add.region_id = rdc.id;
