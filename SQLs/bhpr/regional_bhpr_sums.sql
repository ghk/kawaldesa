CREATE OR REPLACE VIEW regional_bhpr_sums AS 
SELECT (apbn.key || '-'::text) || r.id::text AS id,
    r.id AS region_id,
    apbn.key AS apbn_key,
    r.name AS region_name,
    r.parent_id AS parent_region_id,
    sum(bhpr.base_allocation) AS base_allocation,
    sum(bhpr.pdrd) as pdrd,
    sum(bhpr.pdrd_ratio) as pdrd_ratio,
    sum(bhpr.formula_based_allocation) as formula_based_allocation,
    sum(bhpr.bhpr) as bhpr,
    COALESCE(sum(rdc.desa_count), 0::numeric) AS completed_desa
   FROM apbns apbn
     CROSS JOIN region_parents r
     LEFT JOIN ( SELECT 
	    bhpra.base_allocation,
            bhpra.pdrd,
            bhpra.pdrd_ratio,
	    bhpra.formula_based_allocation,
            bhpra.fk_region_id,
            bhpra.bhpr,
            rc.parent_id,
            rc.parent_parent_id,
            apbd.fk_apbn_id
           FROM regional_bhpr_allocations bhpra
             JOIN region_parents rc ON bhpra.fk_region_id::text = rc.id::text
             JOIN apbds apbd ON apbd.id::text = bhpra.fk_apbd_id::text
          WHERE bhpra.is_activated = true) bhpr ON (r.type = 2 AND bhpr.parent_parent_id::text = r.id::text OR r.type = 3 AND bhpr.parent_id::text = r.id::text) AND apbn.id = bhpr.fk_apbn_id
     LEFT JOIN region_desa_counts rdc ON r.id::text = rdc.id::text
  WHERE r.type = 2 or r.type = 3
  GROUP BY r.id, apbn.key, r.name, r.parent_id, rdc.desa_count;

ALTER TABLE regional_bhpr_sums
  OWNER TO postgres;
