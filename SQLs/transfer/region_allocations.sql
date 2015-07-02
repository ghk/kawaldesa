CREATE MATERIALIZED VIEW region_allocations AS

select 
    apbn.key || '-' || r.id as id,
	apbn.id as apbn_id,
	apbn.key as apbn_key,
	r.id as region_id,
	coalesce(dd.dd, 0) as dd,
	coalesce(add.add, 0) as add,
	coalesce(bhpr.bhpr, 0) as bhpr
from region_parents r
cross join apbns apbn
left join region_dds dd on dd.region_id = r.id and dd.apbn_id = apbn.id
left join region_adds add on add.region_id = r.id and add.apbn_id = apbn.id
left join region_bhprs bhpr on bhpr.region_id = r.id and bhpr.apbn_id = apbn.id;

CREATE UNIQUE INDEX region_allocations_IDX_id
  ON region_allocations(id); 
