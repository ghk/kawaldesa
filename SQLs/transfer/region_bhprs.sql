CREATE OR REPLACE VIEW region_bhprs AS

select 
	apbn.id as apbn_id,
	r.id as region_id,
	coalesce(alloc.bhpr, 0) as bhpr
from regional_bhpr_allocations alloc
inner join region_parents r on alloc.fk_region_id = r.id
inner join apbds apbd on alloc.fk_apbd_id = apbd.id
inner join apbns apbn on apbd.fk_apbn_id = apbn.id
where alloc.is_activated = true

union

select 
	apbn.id as apbn_id,
	pr.id as region_id,
    coalesce(sum(alloc.bhpr), 0) as bhpr
from regional_bhpr_allocations alloc
inner join region_parents r on alloc.fk_region_id = r.id
inner join region_parents pr on r.parent_id = pr.id
inner join apbds apbd on alloc.fk_apbd_id = apbd.id
inner join apbns apbn on apbd.fk_apbn_id = apbn.id
where alloc.is_activated = true
group by apbn.id, pr.id

union

select 
	apbn.id as apbn_id,
	pr.id as region_id,
    coalesce(sum(alloc.bhpr), 0) as bhpr
from regional_bhpr_allocations alloc
inner join region_parents r on alloc.fk_region_id = r.id
inner join region_parents pr on r.parent_parent_id = pr.id
inner join apbds apbd on alloc.fk_apbd_id = apbd.id
inner join apbns apbn on apbd.fk_apbn_id = apbn.id
where alloc.is_activated = true
group by apbn.id, pr.id

union

select 
	apbn.id as apbn_id,
	pr.id as region_id,
    coalesce(sum(alloc.bhpr), 0) as bhpr
from regional_bhpr_allocations alloc
inner join region_parents r on alloc.fk_region_id = r.id
inner join region_parents pr on r.parent_parent_parent_id = pr.id
inner join apbds apbd on alloc.fk_apbd_id = apbd.id
inner join apbns apbn on apbd.fk_apbn_id = apbn.id
where alloc.is_activated = true
group by apbn.id, pr.id

union

select 
	apbn.id as apbn_id,
	pr.id as region_id,
    coalesce(sum(alloc.bhpr), 0) as bhpr
from regional_bhpr_allocations alloc
inner join region_parents r on alloc.fk_region_id = r.id
inner join region_parents pr on r.parent_parent_parent_parent_id = pr.id
inner join apbds apbd on alloc.fk_apbd_id = apbd.id
inner join apbns apbn on apbd.fk_apbn_id = apbn.id
where alloc.is_activated = true
group by apbn.id, pr.id;
