CREATE MATERIALIZED VIEW frozen_regional_add_recapitulations AS
        SELECT * from regional_add_recapitulations;
		
CREATE UNIQUE INDEX frozen_regional_add_recapitulations_IDX_id
  ON frozen_regional_add_recapitulations (id); 
CREATE INDEX frozen_regional_add_recapitulations_IDX_apbn_key_parent_region_id
  ON frozen_regional_add_recapitulations (apbn_key, parent_region_id);
