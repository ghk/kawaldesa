CREATE MATERIALIZED VIEW frozen_transfers AS
        SELECT * from transfers;
		
CREATE UNIQUE INDEX frozen_transfers_IDX_id
  ON frozen_transfers(id); 
CREATE INDEX frozen_transfers_IDX_year_fk_region_id
  ON frozen_transfers (year, fk_region_id);
