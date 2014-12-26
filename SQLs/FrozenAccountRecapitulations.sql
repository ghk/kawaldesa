CREATE MATERIALIZED VIEW dbo."FrozenAccountRecapitulations" AS
        SELECT * from dbo."AccountRecapitulations";
		
CREATE UNIQUE INDEX "FrozenAccountRecapitulations_IDX_ID"
  ON dbo."FrozenAccountRecapitulations" ("ID"); 
CREATE INDEX "FrozenAccountRecapitulations_IDX_ParentRegionID"
  ON dbo."FrozenAccountRecapitulations" ("ParentRegionID");