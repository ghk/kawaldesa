CREATE MATERIALIZED VIEW frozen_transfer_recapitulations AS
        SELECT * from transfer_recapitulations;
		
CREATE UNIQUE INDEX frozen_transfer_recapitulations_IDX_id
  ON frozen_transfer_recapitulations(id); 
CREATE INDEX frozen_transfer_recapitulations_IDX_parent_region_id
  ON frozen_transfer_recapitulations(parent_region_id);
CREATE INDEX frozen_transfer_recapitulations_IDX_region_id
  ON frozen_transfer_recapitulations (region_id);
