CREATE OR REPLACE VIEW regional_dd_sums AS 
SELECT (apbn.key || '-'::text) || r.id::text AS id,
    r.id AS region_id,
    apbn.key AS apbn_key,
    r.name AS region_name,
    r.parent_id AS parent_region_id,
    sum(dd.base_allocation) AS base_allocation,
    sum(dd.population) AS population,
    sum(dd.population_ratio) as population_ratio,
    sum(dd.population_weight) as population_weight,
    sum(dd.poor_population) as poor_population,
    sum(dd.poor_population_ratio) as poor_population_ratio,
    sum(dd.poor_population_weight) as poor_population_weight,
    sum(dd.area) as area,
    sum(dd.area_ratio) as area_ratio,
    sum(dd.area_weight) as area_weight,
    sum(dd.ikg) as ikg,
    sum(dd.ikg_ratio) as ikg_ratio,
    sum(dd.ikg_weight) as ikg_weight,
    sum(dd.total_weight) as total_weight,
    sum(dd.formula_based_allocation) as formula_based_allocation,
    sum(dd.dd) as dd,
    COALESCE(sum(rdc.desa_count), 0::numeric) AS completed_desa
   FROM apbns apbn
     CROSS JOIN region_parents r
     LEFT JOIN ( SELECT 
	    dda.base_allocation,
	    dda.population,
            dda.population_ratio,
            dda.population_weight,
	    dda.poor_population,
            dda.poor_population_ratio,
            dda.poor_population_weight,
	    dda.area,
            dda.area_ratio,
            dda.area_weight,
	    dda.ikg,
            dda.ikg_ratio,
            dda.ikg_weight,
            dda.total_weight,
	    dda.formula_based_allocation,
            dda.fk_region_id,
            dda.dd,
            rc.parent_id,
            rc.parent_parent_id,
            apbd.fk_apbn_id
           FROM regional_dd_allocations dda
             JOIN region_parents rc ON dda.fk_region_id::text = rc.id::text
             JOIN apbds apbd ON apbd.id::text = dda.fk_apbd_id::text
          WHERE dda.is_activated = true) dd ON (r.type = 2 AND dd.parent_parent_id::text = r.id::text OR r.type = 3 AND dd.parent_id::text = r.id::text) AND apbn.id = dd.fk_apbn_id
     LEFT JOIN region_desa_counts rdc ON r.id::text = rdc.id::text
  WHERE r.type = 2 or r.type = 3
  GROUP BY r.id, apbn.key, r.name, r.parent_id, rdc.desa_count;

ALTER TABLE regional_dd_sums
  OWNER TO postgres;
