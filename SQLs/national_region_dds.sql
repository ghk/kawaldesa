-- Materialized View: national_region_dds

-- DROP MATERIALIZED VIEW national_region_dds;

CREATE MATERIALIZED VIEW national_region_dds AS 
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
     LEFT JOIN region_desa_counts rdc ON r.id::text = rdc.id::text
  WHERE r.type <= 1
  GROUP BY r.id, apbn.key, r.name, r.parent_id, rdc.desa_count
WITH DATA;

ALTER TABLE national_region_dds
  OWNER TO postgres;
