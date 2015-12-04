using App.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq.Expressions;
using System.Linq;
using System.Web;
using App.Security;
using Microvac.Web;
using System.Globalization;
using System.Threading.Tasks;
using System.Net.Http;
using System.Web.Http;
using System.Net;

namespace App.Controllers.Models
{
    public class TransactionController : ReadOnlyController<Transaction, long>
    {
        public TransactionController(DB dbContext)
            : base(dbContext)
        {
            dbContext.Configuration.ProxyCreationEnabled = false;
            AllowGetAll = false;
        }

        [HttpPost]
        [Authorize(Roles = Role.VOLUNTEER)]
        public void AddTransferTransaction(Multipart<Transaction> multipart)
        {
            Validate(multipart.Entity);
            if (!ModelState.IsValid)
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));

            var context = HttpContext.Current;
            var principal = HttpContext.Current.User;

            try
            {
                var user = (principal.Identity as KawalDesaIdentity).User;

                var transaction = multipart.Entity;

                KawalDesaController.CheckRegionAllowed(principal, dbContext, transaction.fkDestinationId);

                var actor = dbContext.Set<Region>().First(r => r.Id == transaction.fkActorId);
                var source = dbContext.Set<Region>().First(r => r.Id == transaction.fkSourceId);
                var destination = dbContext.Set<Region>().First(r => r.Id == transaction.fkDestinationId);

                long? accountId = null;
                if (transaction.fkActorId == transaction.fkDestinationId)
                {
                    var targetSource = transaction.fkSourceId == "0" ? "apbn" : "add";
                    //accountId = dbContext.Set<Account>().First(a => a.TargetSource == targetSource && a.Apbdes.fkRegionId == transaction.fkDestinationId).Id;
                }

                string roleRequired = null;
                if (actor.Type == RegionType.NASIONAL || actor.Type == RegionType.KABUPATEN)
                {
                    roleRequired = Role.VOLUNTEER_TRANSFER;
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

                long? blobId = null;
                if (multipart.Files.Count > 0)
                {
                    var fileResult = multipart.Files[0];
                    var blob = new Blob(fileResult);
                    dbContext.Set<Blob>().Add(blob);
                    dbContext.SaveChanges();
                    fileResult.Move(blob.FilePath);
                    blobId = blob.Id;
                }

                transaction.fkSourceFileId = blobId;
                transaction.IsActivated = true;
                transaction.fkCreatedById = user.Id;
                transaction.fkAccountId = accountId;


                dbSet.Add(transaction);
                dbContext.SaveChanges();
            }
            finally
            {
                multipart.DeleteUnmoved();
            }
        }

        public List<TransferTransactionRow> GetTransferTransactions(string regionId)
        {
            var transactions = dbSet.Include(t => t.SourceFile)
                .Where(t => t.fkDestinationId == regionId && t.IsActivated).ToList();

            Func<IEnumerable<Transaction>, List<TransferTransaction>> GetDetails = (tr) =>
            {
                var transferreds = tr.Where(t => t.fkActorId != regionId).ToList();
                var acknowledgeds = tr.Where(t => t.fkActorId == regionId).ToList();
                Pad(transferreds, acknowledgeds.Count - transferreds.Count);
                Pad(acknowledgeds, transferreds.Count - acknowledgeds.Count);

                var details = new List<TransferTransaction>();
                for (var i = 0; i < transferreds.Count; i++)
                {
                    details.Add(new TransferTransaction(transferreds[i], acknowledgeds[i]));
                }

                return details;
            };
            var apbn = GetDetails(transactions.Where(t => t.fkSourceId == "0"));
            var add = GetDetails(transactions.Where(t => t.fkSourceId != "0"));
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
            where T : class
        {
            for (var i = 0; i < padCount; i++)
            {
                list.Insert(0, null);
            }
        }

        [HttpPost]
        [Authorize(Roles = Role.VOLUNTEER_DESA)]
        public void AddAccountTransaction(Multipart multipart)
        {
            try
            {                
                if(multipart.GetForm("Amount") != null && long.Parse(multipart.GetForm("Amount")) < 0)
                    throw new ApplicationException("Amount must be greater than 0");
                if(multipart.GetForm("Description") == null)
                    throw new ApplicationException("Description cannot be empty");
                
                Transaction transaction = new Transaction
                {
                    Amount = long.Parse(multipart.GetForm("Amount")),
                    fkAccountId = long.Parse(multipart.GetForm("fkAccountId")),
                    Date = DateTime.ParseExact(multipart.GetForm("Date"), "dd-MM-yyyy", CultureInfo.InvariantCulture)
                };

                /*
                Realization realization = new Realization
                {
                    Description = multipart.GetForm("Description")
                };
                */               
             
                var account = dbContext.Set<Account>()
                    .Include(a => a.Apbdes)
                    .First(a => a.Id == transaction.fkAccountId);

                KawalDesaController.CheckRegionAllowed(dbContext, account.Apbdes.fkRegionId);

                transaction.fkActorId = account.Apbdes.fkRegionId;
                dbContext.Set<Transaction>().Add(transaction);

                //realization.fkTransactionId = transaction.Id;
                //dbContext.Set<Realization>().Add(realization);

                if (multipart.Files.Count > 0)
                {
                    var fileResult = multipart.Files[0];
                    var blob = new Blob(fileResult);
                    dbContext.Set<Blob>().Add(blob);
                    /*
                     * TODO
                    TransactionFile transactionFile = new TransactionFile()
                    {
                        FileName = blob.Name,
                        fkFileId = blob.Id,
                        IsActivated = true
                    };
                    dbContext.Set<TransactionFile>().Add(transactionFile);
                    */
                    fileResult.Move(blob.FilePath);
                }                
                
                dbContext.SaveChanges();
            }
            finally
            {
                multipart.DeleteUnmoved();
            }
        }
        /*
        public IEnumerable<RealizationTransactionRow> GetRealizationTransactions(long accountId)
        {
            var realizationSet = dbContext.Set<Realization>();
            return dbSet.Where(t => t.fkAccountId == accountId)
                .Select(t => new RealizationTransactionRow
                {
                    Realization = realizationSet.FirstOrDefault(a => a.fkTransactionId == t.Id),
                    Transaction = t
                });
        }
        */
    }

    public class TransferTransactionRow
    {
        public TransferTransaction APBN { get; set; }

        public TransferTransaction ADD { get; set; }

    }

    public class TransferTransaction
    {
        public String TransferredDate { get; set; }
        public decimal TransferredAmount { get; set; }
        public String TransferredProofId { get; set; }

        public String AcknowledgedDate { get; set; }
        public decimal AcknowledgedAmount { get; set; }
        public String AcknowledgedProofId { get; set; }

        public TransferTransaction(Transaction transferred, Transaction acknowledged)
        {
            if (transferred != null)
            {
                TransferredDate = transferred.Date.ToString("dd-MM-yyyy");
                TransferredAmount = transferred.Amount;
                if (transferred.SourceFile != null)
                    TransferredProofId = transferred.SourceFile.RelativeFileName;
            }
            if (acknowledged != null)
            {

                AcknowledgedDate = acknowledged.Date.ToString("dd-MM-yyyy");
                AcknowledgedAmount = acknowledged.Amount;
                if (acknowledged.SourceFile != null)
                    AcknowledgedProofId = acknowledged.SourceFile.RelativeFileName;
            }
        }
    }

    public class RealizationTransactionRow
    {
        public Transaction Transaction { get; set; }
        public Realization Realization { get; set; }
    }


}