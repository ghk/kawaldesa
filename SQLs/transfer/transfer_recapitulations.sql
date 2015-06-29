CREATE OR REPLACE VIEW dbo."TransferRecapitulations" AS
        SELECT
	apbn.key ||'-'|| r.id as id,
	r.id as region_id, 
	apbn.id as apbn_id,
	apbn.key as apbn_key,
	r.fk_parent_id as parent_region_id,
    r.name as region_name,
    alloc.dd as budgeted_dd,
	COALESCE((
		select sum(t.amount) 
		from transactions t 
		inner join region_parents desa on t.fk_destination_id = desa.id
		where t.fk_source_id = "0" AND t.fk_actor_id = "0" AND t.fk_apbn_id = apbn.id AND t.is_activated AND (
			(r.type = 0 AND desa.parent_parent_parent_parent_id = r.id) 
			OR (r.type = 1 AND desa.parent_parent_parent_id = r.id) 
			OR (r.type = 2 AND desa.parent_parent_id = r.id) 
			OR (r.type = 3 AND desa.parent_id = r.id)
			OR (r.type = 4 AND desa.id = r.id)
		)
	), 0) as transferred_dd,
    alloc.add as budgeted_add,
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."RegionParents" desa on t."fkDestinationID" = desa."ID"
		where t."fkSourceID" = desa."ParentParentID" AND t."fkActorID" =  desa."ParentParentID" AND t."fkAPBNID" = apbn."ID" AND t."IsActivated" AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "TransferredADD",
	COALESCE((
		select sum(t."Amount") 
		from dbo."Transactions" t 
		inner join dbo."RegionParents" desa on t."fkDestinationID" = desa."ID"
		where t."fkSourceID" = desa."ParentParentID" AND t."fkActorID" = desa."ID" AND t."fkAPBNID" = apbn."ID" AND t."IsActivated" AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "AcknowledgedADD"
    FROM dbo."Regions" r, dbo."APBNs" apbn;
