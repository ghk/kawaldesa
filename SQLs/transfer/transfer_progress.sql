select generate_series(1, 12) as month;


select 
  extract(month from d.max_date) as month,
  r.id as region_id,
  apbn.key as apbn_key,
  (select coalesce(sum(t.dd), 0) from transfer_region_parents t where t.date < d.max_date and t.year = d.year 
	and ( (t.desa_id = r.id and r.type = 4) or (t.kecamatan_id = r.id and r.type=3) or (t.kabupaten_id = r.id and r.type = 2) or (t.provinsi_id = r.id and r.type = 1) or (t.nasional_id = r.id and r.type = 0) ) 
  )as transferred_dd,
  (select coalesce(sum(t.add), 0) from transfer_region_parents t where t.date < d.max_date and t.year = d.year 
	and ( (t.desa_id = r.id and r.type = 4) or (t.kecamatan_id = r.id and r.type=3) or (t.kabupaten_id = r.id and r.type = 2) or (t.provinsi_id = r.id and r.type = 1) or (t.nasional_id = r.id and r.type = 0) ) 
  )as transferred_add,
  (select coalesce(sum(t.bhpr), 0) from transfer_region_parents t where t.date < d.max_date and t.year = d.year 
	and ( (t.desa_id = r.id and r.type = 4) or (t.kecamatan_id = r.id and r.type=3) or (t.kabupaten_id = r.id and r.type = 2) or (t.provinsi_id = r.id and r.type = 1) or (t.nasional_id = r.id and r.type = 0) ) 
  )as transferred_bhpr,
  alloc.dd as allocated_dd,
  alloc.add as allocated_add,
  alloc.bhpr as allocated_bhpr
from apbns apbn
 left join (select to_date((generate_series(1, 12) + 1) || ' ' || a.year, 'mm yyyy') - interval '1 second' as max_date, a.year from (select distinct(year) from apbns) as a) as d on d.year = apbn.year
 cross join region_parents r 
 left join region_allocations alloc on alloc.apbn_key = apbn.key and alloc.region_id = r.id
where r.id = '0';