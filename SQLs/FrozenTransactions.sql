CREATE MATERIALIZED VIEW dbo."FrozenTransactions" AS
        SELECT *
    FROM dbo."Transactions";

CREATE UNIQUE INDEX "FrozenTransactions_IDX_ID"
  ON dbo."FrozenTransactions" ("ID"); 
CREATE INDEX "FrozenTransactions_IDX_fkSourceID"
  ON dbo."FrozenTransactions" ("fkSourceID");
CREATE INDEX "FrozenTransactions_IDX_fkDestinationID"
  ON dbo."FrozenTransactions" ("fkDestinationID");
CREATE INDEX "FrozenTransactions_IDX_fkActorID"
  ON dbo."FrozenTransactions" ("fkActorID");
CREATE INDEX "FrozenTransactions_IDX_fkAccountID"
  ON dbo."FrozenTransactions" ("fkAccountID");