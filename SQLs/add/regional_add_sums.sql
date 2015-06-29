CREATE OR REPLACE VIEW regional_add_sums AS 
SELECT (apbn.key || '-'::text) || r.id::text AS id,
    r.id AS region_id,
    apbn.key AS apbn_key,
    r.name AS region_name,
    r.parent_id AS parent_region_id,
    sum(add.base_allocation) AS base_allocation,
    sum(add.population) AS population,
    sum(add.population_ratio) as population_ratio,
    sum(add.population_weight) as population_weight,
    sum(add.poor_population) as poor_population,
    sum(add.poor_population_ratio) as poor_population_ratio,
    sum(add.poor_population_weight) as poor_population_weight,
    sum(add.area) as area,
    sum(add.area_ratio) as area_ratio,
    sum(add.area_weight) as area_weight,
    sum(add.ikg) as ikg,
    sum(add.ikg_ratio) as ikg_ratio,
    sum(add.ikg_weight) as ikg_weight,
    sum(add.total_weight) as total_weight,
    sum(add.formula_based_allocation) as formula_based_allocation,
    sum(add.add) as add,
    COALESCE(sum(rdc.desa_count), 0::numeric) AS completed_desa
   FROM apbns apbn
     CROSS JOIN region_parents r
     LEFT JOIN ( SELECT 
	    adda.base_allocation,
	    adda.population,
            adda.population_ratio,
            adda.population_weight,
	    adda.poor_population,
            adda.poor_population_ratio,
            adda.poor_population_weight,
	    adda.area,
            adda.area_ratio,
            adda.area_weight,
	    adda.ikg,
            adda.ikg_ratio,
            adda.ikg_weight,
            adda.total_weight,
	    adda.formula_based_allocation,
            adda.fk_region_id,
            adda.add,
            rc.parent_id,
            rc.parent_parent_id,
            apbd.fk_apbn_id
           FROM regional_add_allocations adda
             JOIN region_parents rc ON adda.fk_region_id::text = rc.id::text
             JOIN apbds apbd ON apbd.id::text = adda.fk_apbd_id::text
          WHERE adda.is_activated = true) add ON (r.type = 2 AND add.parent_parent_id::text = r.id::text OR r.type = 3 AND add.parent_id::text = r.id::text) AND apbn.id = add.fk_apbn_id
     LEFT JOIN region_desa_counts rdc ON r.id::text = rdc.id::text
  WHERE r.type = 2 or r.type = 3
  GROUP BY r.id, apbn.key, r.name, r.parent_id, rdc.desa_count;

ALTER TABLE regional_add_sums
  OWNER TO postgres;
