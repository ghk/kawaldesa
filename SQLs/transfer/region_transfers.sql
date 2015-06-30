CREATE OR REPLACE VIEW region_transfers AS

select 
	r.id as region_id,
	transfer.year as year,
	coalesce(transfer.dd, 0) as dd,
	coalesce(transfer.add, 0) as add,
	coalesce(transfer.bhpr, 0) as bhpr
from transfers transfer
inner join region_parents r on transfer.fk_region_id = r.id
where transfer.is_activated = true

union

select 
	pr.id as region_id,
	transfer.year as year,
	coalesce(sum(transfer.dd), 0) as dd,
	coalesce(sum(transfer.add), 0) as add,
	coalesce(sum(transfer.bhpr), 0) as bhpr
from transfers transfer
inner join region_parents r on transfer.fk_region_id = r.id
inner join region_parents pr on r.parent_id = pr.id
where transfer.is_activated = true
group by transfer.year, pr.id

union

select 
	pr.id as region_id,
	transfer.year as year,
	coalesce(sum(transfer.dd), 0) as dd,
	coalesce(sum(transfer.add), 0) as add,
	coalesce(sum(transfer.bhpr), 0) as bhpr
from transfers transfer
inner join region_parents r on transfer.fk_region_id = r.id
inner join region_parents pr on r.parent_parent_id = pr.id
where transfer.is_activated = true
group by transfer.year, pr.id

union

select 
	pr.id as region_id,
	transfer.year as year,
	coalesce(sum(transfer.dd), 0) as dd,
	coalesce(sum(transfer.add), 0) as add,
	coalesce(sum(transfer.bhpr), 0) as bhpr
from transfers transfer
inner join region_parents r on transfer.fk_region_id = r.id
inner join region_parents pr on r.parent_parent_parent_id = pr.id
where transfer.is_activated = true
group by transfer.year, pr.id

union

select 
	pr.id as region_id,
	transfer.year as year,
	coalesce(sum(transfer.dd), 0) as dd,
	coalesce(sum(transfer.add), 0) as add,
	coalesce(sum(transfer.bhpr), 0) as bhpr
from transfers transfer
inner join region_parents r on transfer.fk_region_id = r.id
inner join region_parents pr on r.parent_parent_parent_parent_id = pr.id
where transfer.is_activated = true
group by transfer.year, pr.id;
