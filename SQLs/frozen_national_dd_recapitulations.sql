CREATE MATERIALIZED VIEW frozen_national_dd_recapitulations AS
        SELECT * from national_dd_recapitulations;
		
CREATE UNIQUE INDEX frozen_national_dd_recapitulations_IDX_id
  ON frozen_national_dd_recapitulations (id); 
CREATE INDEX frozen_national_dd_recapitulations_IDX_apbn_key_parent_region_id
  ON frozen_national_dd_recapitulations (apbn_key, parent_region_id);