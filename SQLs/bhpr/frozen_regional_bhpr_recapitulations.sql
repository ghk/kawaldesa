CREATE MATERIALIZED VIEW frozen_regional_bhpr_recapitulations AS
        SELECT * from regional_bhpr_recapitulations;
		
CREATE UNIQUE INDEX frozen_regional_bhpr_recapitulations_IDX_id
  ON frozen_regional_bhpr_recapitulations (id); 
CREATE INDEX frozen_regional_bhpr_recapitulations_IDX_apbn_key_parent_region_id
  ON frozen_regional_bhpr_recapitulations (apbn_key, parent_region_id);
