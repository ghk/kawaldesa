CREATE MATERIALIZED VIEW dbo."FrozenTransferRecapitulations" AS
        SELECT * from dbo."TransferRecapitulations";
		
CREATE UNIQUE INDEX "FrozenTransferRecapitulations_IDX_ID"
  ON dbo."FrozenTransferRecapitulations" ("ID"); 
CREATE INDEX "FrozenTransferRecapitulations_IDX_ParentRegionID"
  ON dbo."FrozenTransferRecapitulations" ("ParentRegionID");