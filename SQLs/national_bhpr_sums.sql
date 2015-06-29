CREATE OR REPLACE VIEW national_bhpr_sums AS 
SELECT (apbn.key || '-'::text) || r.id::text AS id,
    r.id AS region_id,
    apbn.key AS apbn_key,
    r.name AS region_name,
    r.parent_id AS parent_region_id,
    sum(bhpr.regional_tax) AS regional_tax,
    sum(bhpr.regional_retribution) AS regional_retribution,
    sum(bhpr.bhpr) AS bhpr,
    COALESCE(sum(rdc.desa_count), 0::numeric) AS completed_desa
   FROM apbns apbn
     CROSS JOIN region_parents r
     LEFT JOIN (
	    select 
            bhpr.bhpr, 
            bhpr.regional_tax, 
            bhpr.regional_retribution, 
            bhpr.fk_region_id, 
            rc.parent_id, 
            rc.parent_parent_id, 
            apbd.fk_apbn_id 
        from national_bhpr_allocations bhpr 	
        INNER join region_parents rc  ON bhpr.fk_region_id = rc.id 
        INNER JOIN apbds apbd ON apbd.id::text = bhpr.fk_apbd_id::text
        where bhpr.is_activated = true
	) bhpr ON ((r.type = 0 AND bhpr.parent_parent_id::text = r.id::text) OR (r.type = 1 AND bhpr.parent_id::text = r.id::text))  AND apbn.id = bhpr.fk_apbn_id 
     LEFT JOIN region_desa_counts rdc ON bhpr.fk_region_id::text = rdc.id::text and bhpr.bhpr is not null
  WHERE r.type <= 1
  GROUP BY r.id, apbn.key, r.name, r.parent_id;


ALTER TABLE national_bhpr_sums
  OWNER TO postgres;
