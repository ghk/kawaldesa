CREATE OR REPLACE VIEW national_add_sums AS 
SELECT (apbn.key || '-'::text) || r.id::text AS id,
    r.id AS region_id,
    apbn.key AS apbn_key,
    r.name AS region_name,
    r.parent_id AS parent_region_id,
    sum(add.dbh) AS dbh,
    sum(add.dau) AS dau,
    sum(add.dak) AS dak,
    sum(add.add) AS add,
    COALESCE(sum(rdc.desa_count), 0::numeric) AS completed_desa
   FROM apbns apbn
     CROSS JOIN region_parents r
     LEFT JOIN (
	    select 
            add.add, 
            add.dbh, 
            add.dau, 
            add.dak, 
            add.fk_region_id, 
            rc.parent_id, 
            rc.parent_parent_id, 
            apbd.fk_apbn_id 
        from national_add_allocations add 	
        INNER join region_parents rc  ON add.fk_region_id = rc.id 
        INNER JOIN apbds apbd ON apbd.id::text = add.fk_apbd_id::text
        where add.is_activated = true
	) add ON ((r.type = 0 AND add.parent_parent_id::text = r.id::text) OR (r.type = 1 AND add.parent_id::text = r.id::text))  AND apbn.id = add.fk_apbn_id 
     LEFT JOIN region_desa_counts rdc ON add.fk_region_id::text = rdc.id::text and add.add is not null
  WHERE r.type <= 1
  GROUP BY r.id, apbn.key, r.name, r.parent_id;


ALTER TABLE national_add_sums
  OWNER TO postgres;
