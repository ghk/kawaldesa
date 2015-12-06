-- View: region_transfers

-- DROP VIEW region_transfers;

CREATE OR REPLACE VIEW region_transfers AS 
 SELECT r.id AS region_id,
    transfer.year,
    COALESCE(sum(transfer.dd), 0::numeric) AS dd,
    COALESCE(sum(transfer.add), 0::numeric) AS add,
    COALESCE(sum(transfer.bhpr), 0::numeric) AS bhpr
   FROM transfers transfer
     JOIN region_parents r ON transfer.fk_region_id::text = r.id::text
  WHERE transfer.is_activated = true
  group by transfer.year, r.id
UNION
 SELECT pr.id AS region_id,
    transfer.year,
    COALESCE(sum(transfer.dd), 0::numeric) AS dd,
    COALESCE(sum(transfer.add), 0::numeric) AS add,
    COALESCE(sum(transfer.bhpr), 0::numeric) AS bhpr
   FROM transfers transfer
     JOIN region_parents r ON transfer.fk_region_id::text = r.id::text
     JOIN region_parents pr ON r.parent_id::text = pr.id::text
  WHERE transfer.is_activated = true
  GROUP BY transfer.year, pr.id
UNION
 SELECT pr.id AS region_id,
    transfer.year,
    COALESCE(sum(transfer.dd), 0::numeric) AS dd,
    COALESCE(sum(transfer.add), 0::numeric) AS add,
    COALESCE(sum(transfer.bhpr), 0::numeric) AS bhpr
   FROM transfers transfer
     JOIN region_parents r ON transfer.fk_region_id::text = r.id::text
     JOIN region_parents pr ON r.parent_parent_id::text = pr.id::text
  WHERE transfer.is_activated = true
  GROUP BY transfer.year, pr.id
UNION
 SELECT pr.id AS region_id,
    transfer.year,
    COALESCE(sum(transfer.dd), 0::numeric) AS dd,
    COALESCE(sum(transfer.add), 0::numeric) AS add,
    COALESCE(sum(transfer.bhpr), 0::numeric) AS bhpr
   FROM transfers transfer
     JOIN region_parents r ON transfer.fk_region_id::text = r.id::text
     JOIN region_parents pr ON r.parent_parent_parent_id::text = pr.id::text
  WHERE transfer.is_activated = true
  GROUP BY transfer.year, pr.id
UNION
 SELECT pr.id AS region_id,
    transfer.year,
    COALESCE(sum(transfer.dd), 0::numeric) AS dd,
    COALESCE(sum(transfer.add), 0::numeric) AS add,
    COALESCE(sum(transfer.bhpr), 0::numeric) AS bhpr
   FROM transfers transfer
     JOIN region_parents r ON transfer.fk_region_id::text = r.id::text
     JOIN region_parents pr ON r.parent_parent_parent_parent_id::text = pr.id::text
  WHERE transfer.is_activated = true
  GROUP BY transfer.year, pr.id;

ALTER TABLE region_transfers
  OWNER TO postgres;
