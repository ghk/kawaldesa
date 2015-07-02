CREATE MATERIALIZED VIEW frozen_account_recapitulations AS
        SELECT * from account_recapitulations;
		
CREATE UNIQUE INDEX frozen_account_recapitulations_IDX_id
  ON frozen_account_recapitulations(id); 
CREATE INDEX frozen_account_recapitulations_IDX_parent_region_id
  ON frozen_account_recapitulations(parent_region_id);
CREATE INDEX frozen_account_recapitulations_IDX_apbn_key_parent_region_id
  ON frozen_account_recapitulations(apbn_key, parent_region_id);
CREATE INDEX frozen_account_recapitulations_IDX_region_id
  ON frozen_account_recapitulations (region_id);
