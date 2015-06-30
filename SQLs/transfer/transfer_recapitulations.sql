CREATE OR REPLACE VIEW transfer_recapitulations AS

        SELECT
	apbn.key ||'-'|| r.id as id,
	r.id as region_id, 
	apbn.id as apbn_id,
	apbn.key as apbn_key,
	r.fk_parent_id as parent_region_id,
    r.name as region_name,
    coalesce(alloc.dd, 0) as budgeted_dd,
    coalesce(transfer.dd, 0) as transferred_dd,
    coalesce(alloc.add, 0) as budgeted_add,
    coalesce(transfer.add, 0) as transferred_add,
    coalesce(alloc.bhpr, 0) as budgeted_bhpr,
    coalesce(transfer.bhpr, 0) as transferred_bhpr
    FROM regions r
    cross join apbns apbn
    left join region_allocations alloc on alloc.apbn_key = apbn.key and alloc.region_id = r.id
    left join region_transfers transfer on transfer.year = apbn.year and transfer.region_id = r.id
    ;
