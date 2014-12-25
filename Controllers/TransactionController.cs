using App.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq.Expressions;
using System.Linq;
using System.Web;
using App.Security;
using Scaffold;
using System.Globalization;
using System.Threading.Tasks;
using System.Web.Http;

namespace App.Controllers
{
    public class TransactionController: ReadOnlyController<Transaction, long>
    {
        private Uploader uploader = new Uploader();
        public TransactionController(DB dbContext) : base(dbContext) {
            AllowGetAll = false;
        }

        [HttpPost]
        [Authorize(Roles=Role.VOLUNTEER)]
        public async Task AddTransferTransaction()
        {
            var res = await uploader.PostFile<Blob>(Request);

            try
            {
                var fileResult = res.Files[0];
                var blob = new Blob(fileResult);
                dbContext.Set<Blob>().Add(blob);
                var principal = HttpContext.Current.User;
                var user = (principal.Identity as KawalDesaIdentity).User;

                var sourceID = long.Parse(res.Forms["fkSourceID"]);
                var destID = long.Parse(res.Forms["fkDestinationID"]);
                var actorID = long.Parse(res.Forms["fkActorID"]);
                var amount = decimal.Parse(res.Forms["Amount"]);
                var date = DateTime.ParseExact(res.Forms["Date"], "dd-MM-yyyy", CultureInfo.InvariantCulture);

                KawalDesaController.CheckRegionAllowed(dbContext, destID);

                if (actorID != sourceID && actorID != destID)
                    throw new ApplicationException("actor id must matched source id or dest id");

                var actor = dbContext.Set<Region>().FirstOrDefault(r => r.ID == actorID);
                var source = dbContext.Set<Region>().FirstOrDefault(r => r.ID == sourceID);
                var destination = dbContext.Set<Region>().FirstOrDefault(r => r.ID == destID);

                if (amount <= 0)
                    throw new ApplicationException("Amount must > 0");

                string roleRequired = null;
                if (actor.Type == RegionType.NASIONAL || actor.Type == RegionType.KABUPATEN)
                {
                    if (source.Type == RegionType.NASIONAL && destination.Type == RegionType.DESA)
                        roleRequired = Role.VOLUNTEER_APBN;
                    if (source.Type == RegionType.KABUPATEN && destination.Type == RegionType.DESA)
                        roleRequired = Role.VOLUNTEER_ADD;
                }
                else if (actor.Type == RegionType.DESA)
                {
                    if ((source.Type == RegionType.KABUPATEN || source.Type == RegionType.NASIONAL) && destination.Type == RegionType.DESA)
                        roleRequired = Role.VOLUNTEER_DESA;
                }
                if (roleRequired == null)
                    throw new ApplicationException(String.Format("No role matched for transaction: {0}, {1}, {2}",
                        actor.Type, source.Type, destination.Type));

                if (!principal.IsInRole(roleRequired))
                    throw new ApplicationException("Principal is not in role");

                dbContext.Set<Blob>().Add(blob);

                var transaction = new Transaction
                {
                    fkAPBNID = 1,
                    fkSourceFileID = blob.ID,
                    fkSourceID = sourceID,
                    fkDestinationID = destID,
                    fkActorID = actorID,
                    fkCreatedByID = user.Id,
                    Amount = amount,
                    Date = date,
                    IsActivated = true
                };

                dbSet.Add(transaction);
                fileResult.Move(blob.FilePath);
                dbContext.SaveChanges();
            }
            finally
            { 
                res.DeleteUnmoved();
            }
        }

        public List<TransferTransactionRow> GetTransferTransactions(long regionID)
        {
            var transactions = dbSet.Include(t => t.SourceFile)
                .Where(t => t.fkDestinationID == regionID && t.IsActivated).ToList();

            Func<IEnumerable<Transaction>, List<TransferTransaction>> GetDetails = (tr) =>
            {
                var transferreds = tr.Where(t => t.fkActorID != regionID).ToList();
                var acknowledgeds = tr.Where(t => t.fkActorID == regionID).ToList();
                Pad(transferreds, acknowledgeds.Count - transferreds.Count);
                Pad(acknowledgeds, transferreds.Count - acknowledgeds.Count);

                var details = new List<TransferTransaction>();
                for (var i = 0; i < transferreds.Count; i++)
                {
                    details.Add(new TransferTransaction(transferreds[i], acknowledgeds[i]));
                }

                return details;
            };
            var apbn = GetDetails(transactions.Where(t => t.fkSourceID == 0));
            var add = GetDetails(transactions.Where(t => t.fkSourceID != 0));
            Pad(apbn, add.Count - apbn.Count);
            Pad(add, apbn.Count - add.Count);

            var results = new List<TransferTransactionRow>();
            for (var i = 0; i < apbn.Count; i++)
            {
                results.Add(new TransferTransactionRow
                {
                    APBN = apbn[i], 
                    ADD = add[i]
                });
            }
            return results;
        }

        private void Pad<T>(List<T> list, int padCount) 
            where T: class
        {
            for (var i = 0; i < padCount; i++)
            {
                list.Insert(0, null);
            }
        }

        [HttpPost]
        [Authorize(Roles=Role.VOLUNTEER_DESA)]
        public void AddAccountTransaction(Transaction transaction, Realization realization)
        {
            if (transaction.Amount == 0)
                throw new ApplicationException(" amount must > 0");
            var account = dbContext.Set<Account>()
                .Include(a => a.APBDes)
                .First(a => a.ID == transaction.fkAccountID);

            KawalDesaController.CheckRegionAllowed(dbContext, account.APBDes.fkRegionID);

            transaction.fkActorID = account.APBDes.fkRegionID;
            transaction.fkAPBNID = account.APBDes.fkAPBNID;
            dbSet.Add(transaction);

            realization.fkTransactionID = transaction.ID;
            dbContext.Set<Realization>().Add(realization);
        }

        public IEnumerable<RealizationTransactionRow> GetRealizationTransactions(long accountID)
        {
            var realizationSet = dbContext.Set<Realization>();
            return dbSet.Where(t => t.fkAccountID == accountID)
                .Select(t => new RealizationTransactionRow
                {
                    Realization = realizationSet.First(a => a.fkTransactionID == t.ID),
                    Transaction = t
                });
        }

    }

    public class TransferTransactionRow
    {
        public TransferTransaction APBN { get; set; }

        public TransferTransaction ADD { get; set; }

    }

    public class TransferTransaction
    {
        public String TransferredDate { get; set;  }
        public decimal TransferredAmount {get; set; }
        public long? TransferredProofID { get; set; }

        public String AcknowledgedDate { get; set; }
        public decimal AcknowledgedAmount { get; set; }
        public long? AcknowledgedProofID { get; set; }

        public TransferTransaction (Transaction transferred, Transaction acknowledged)
        {
            if(transferred != null)
            {
                TransferredDate = transferred.Date.ToString("dd-MM-yyyy");
                TransferredAmount = transferred.Amount;
                if(transferred.SourceFile != null)
                    TransferredProofID = transferred.SourceFile.ID;
            }
            if(acknowledged != null)
            {

                AcknowledgedDate = acknowledged.Date.ToString("dd-MM-yyyy");
                AcknowledgedAmount = acknowledged.Amount;
                if (acknowledged.SourceFile != null)
                    AcknowledgedProofID = acknowledged.SourceFile.ID;
            }
        }
    }

    public class RealizationTransactionRow
    {
        public Transaction Transaction { get; set; }
        public Realization Realization { get; set; }
    }


}