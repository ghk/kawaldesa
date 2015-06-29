CREATE OR REPLACE VIEW national_dd_sums AS 
SELECT (apbn.key || '-'::text) || r.id::text AS id,
    r.id AS region_id,
    apbn.key AS apbn_key,
    r.name AS region_name,
    r.parent_id AS parent_region_id,
    sum(dd.regional_transfer) AS regional_transfer,
    sum(dd.dd) AS dd,
    COALESCE(sum(rdc.desa_count), 0::numeric) AS completed_desa
   FROM apbns apbn
     CROSS JOIN region_parents r
     left JOIN (
	select dd.dd, dd.regional_transfer, dd.fk_region_id, rc.parent_id, rc.parent_parent_id, dd.fk_apbn_id from national_dd_allocations dd 	
	inner join region_parents rc  ON dd.fk_region_id = rc.id 
	where dd.is_activated = true
	) dd ON ((r.type = 0 AND dd.parent_parent_id::text = r.id::text) OR (r.type = 1 AND dd.parent_id::text = r.id::text))  AND apbn.id = dd.fk_apbn_id 
     LEFT JOIN region_desa_counts rdc ON dd.fk_region_id::text = rdc.id::text and dd.dd is not null
  WHERE r.type <= 1
  GROUP BY r.id, apbn.key, r.name, r.parent_id;


ALTER TABLE national_dd_sums
  OWNER TO postgres;
