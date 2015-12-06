-- Materialized View: transfer_progresses

-- DROP MATERIALIZED VIEW transfer_progresses;

CREATE MATERIALIZED VIEW transfer_progresses AS 
 SELECT (((apbn.key || '-'::text) || r.id::text) || '-'::text) || date_part('month'::text, d.max_date) AS id,
    date_part('month'::text, d.max_date)::integer AS month,
    r.id AS region_id,
    apbn.key AS apbn_key,
    ( SELECT COALESCE(sum(t.dd), 0::numeric) AS "coalesce"
           FROM transfer_region_parents t
          WHERE t.date < d.max_date AND t.year = d.year AND (t.desa_id::text = r.id::text AND r.type = 4 OR t.kecamatan_id::text = r.id::text AND r.type = 3 OR t.kabupaten_id::text = r.id::text AND r.type = 2 OR t.provinsi_id::text = r.id::text AND r.type = 1 OR t.nasional_id::text = r.id::text AND r.type = 0)) AS transferred_dd,
    ( SELECT COALESCE(sum(t.add), 0::numeric) AS "coalesce"
           FROM transfer_region_parents t
          WHERE t.date < d.max_date AND t.year = d.year AND (t.desa_id::text = r.id::text AND r.type = 4 OR t.kecamatan_id::text = r.id::text AND r.type = 3 OR t.kabupaten_id::text = r.id::text AND r.type = 2 OR t.provinsi_id::text = r.id::text AND r.type = 1 OR t.nasional_id::text = r.id::text AND r.type = 0)) AS transferred_add,
    ( SELECT COALESCE(sum(t.bhpr), 0::numeric) AS "coalesce"
           FROM transfer_region_parents t
          WHERE t.date < d.max_date AND t.year = d.year AND (t.desa_id::text = r.id::text AND r.type = 4 OR t.kecamatan_id::text = r.id::text AND r.type = 3 OR t.kabupaten_id::text = r.id::text AND r.type = 2 OR t.provinsi_id::text = r.id::text AND r.type = 1 OR t.nasional_id::text = r.id::text AND r.type = 0)) AS transferred_bhpr,
    alloc.dd AS allocated_dd,
    alloc.add AS allocated_add,
    alloc.bhpr AS allocated_bhpr
   FROM apbns apbn
     LEFT JOIN ( SELECT to_date(((generate_series(1, 12) + 1) || ' '::text) || a.year, 'mm yyyy'::text) - '00:00:01'::interval AS max_date,
            a.year
           FROM ( SELECT DISTINCT apbns.year
                   FROM apbns) a) d ON d.year = apbn.year
     CROSS JOIN region_parents r
     LEFT JOIN region_allocations alloc ON alloc.apbn_key = apbn.key AND alloc.region_id::text = r.id::text
WITH DATA;

CREATE UNIQUE INDEX transfer_progresses_IDX_id
  ON transfer_progresses(id); 

CREATE INDEX transfer_progresses_IDX_apbn_key_region_id
  ON transfer_region_parents(apbn_key, region_id); 
  
ALTER TABLE transfer_progresses
  OWNER TO postgres;

