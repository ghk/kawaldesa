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

namespace App.Controllers
{
    public class TransactionController: BaseController<Transaction, long>
    {
        private Uploader uploader = new Uploader("Proof");
        public TransactionController(DB dbContext) : base(dbContext) {
        }

        [KawalDesaAuthorize(Roles=Role.VOLUNTEER)]
        public async void AddTransaction()
        {
            var res = await uploader.PostFile<Blob>(Request);
            Blob blob = res.Files.ToList()[0];

            var principal = HttpContext.Current.User;
            var user = KawalDesaController.GetCurrentUser();

            dbContext.Set<Blob>().Add(blob);
            dbContext.SaveChanges();

            var sourceID = long.Parse(res.Forms["fkSourceID"]);
            var destID = long.Parse(res.Forms["fkDestinationID"]);
            var actorID = long.Parse(res.Forms["fkActorID"]);
            var amount = decimal.Parse(res.Forms["Amount"]);
            var date = DateTime.ParseExact(res.Forms["Date"], "dd-MM-yyyy", CultureInfo.InvariantCulture);

            if(actorID != sourceID && actorID != destID)
                throw new ApplicationException("actor id must matched source id or dest id");

            var actor = dbContext.Set<Region>().FirstOrDefault(r => r.ID == actorID);
            var source = dbContext.Set<Region>().FirstOrDefault(r => r.ID == sourceID);
            var destination = dbContext.Set<Region>().FirstOrDefault(r => r.ID == destID);

            if (amount <= 0)
                throw new ApplicationException("Amount must > 0");

            string roleRequired = null;
            if(actor.Type == RegionType.DESA)
            {
                if (source.Type == RegionType.NASIONAL && destination.Type == RegionType.DESA)
                    roleRequired = Role.VOLUNTEER_APBN;
                if (source.Type == RegionType.KABUPATEN && destination.Type == RegionType.DESA)
                    roleRequired = Role.VOLUNTEER_ADD;
            }
            else if(actor.Type == RegionType.NASIONAL || actor.Type == RegionType.NASIONAL)
            {
                if ((source.Type == RegionType.KABUPATEN || source.Type == RegionType.NASIONAL) && destination.Type == RegionType.DESA)
                    roleRequired = Role.VOLUNTEER_ADD;
            }
            if (roleRequired == null)
                throw new ApplicationException(String.Format("No role matched for transaction: {0}, {1}, {2}", 
                    actor.Type, source.Type, destination.Type));

            if (!principal.IsInRole(roleRequired))
                throw new ApplicationException("Principal is not in role");

            var transaction = new Transaction
            {
                fkAPBNID = 1,
                fkProofID = blob.ID,
                fkSourceID = sourceID,
                fkDestinationID = destID,
                fkActorID = actorID,
                fkCreatedByID = user.Id,
                Amount = amount,
                Date = date,
                IsActivated = true
            };

            dbSet.Add(transaction);
            dbContext.SaveChanges();
        }

        public List<RegionTransactionRow> GetTransactionDetails(long regionID)
        {
            var transactions = dbSet.Include(t => t.Proof)
                .Where(t => t.fkDestinationID == regionID && t.IsActivated).ToList();

            Func<IEnumerable<Transaction>, List<TransactionDetail>> GetDetails = (tr) =>
            {
                var transferreds = tr.Where(t => t.fkActorID != regionID).ToList();
                var acknowledgeds = tr.Where(t => t.fkActorID == regionID).ToList();
                Pad(transferreds, acknowledgeds.Count - transferreds.Count);
                Pad(acknowledgeds, transferreds.Count - acknowledgeds.Count);

                var details = new List<TransactionDetail>();
                for (var i = 0; i < transferreds.Count; i++)
                {
                    details.Add(new TransactionDetail(transferreds[i], acknowledgeds[i]));
                }

                return details;
            };
            var apbn = GetDetails(transactions.Where(t => t.fkSourceID == 0));
            var add = GetDetails(transactions.Where(t => t.fkSourceID != 0));
            Pad(apbn, add.Count - apbn.Count);
            Pad(add, apbn.Count - add.Count);

            var results = new List<RegionTransactionRow>();
            for (var i = 0; i < apbn.Count; i++)
            {
                results.Add(new RegionTransactionRow
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

    }

    public class RegionTransactionRow
    {
        public TransactionDetail APBN { get; set; }

        public TransactionDetail ADD { get; set; }

    }

    public class TransactionDetail
    {
        public String TransferredDate { get; set;  }
        public decimal TransferredAmount {get; set; }
        public String TransferredProofID { get; set; }

        public String AcknowledgedDate { get; set; }
        public decimal AcknowledgedAmount { get; set; }
        public String AcknowledgedProofID { get; set; }

        public TransactionDetail (Transaction transferred, Transaction acknowledged)
        {
            if(transferred != null)
            {
                TransferredDate = transferred.Date.ToString("dd-MM-yyyy");
                TransferredAmount = transferred.Amount;
                if(transferred.Proof != null)
                    TransferredProofID = transferred.Proof.UploadID;
            }
            if(acknowledged != null)
            {

                AcknowledgedDate = acknowledged.Date.ToString("dd-MM-yyyy");
                AcknowledgedAmount = acknowledged.Amount;
                if (acknowledged.Proof != null)
                    AcknowledgedProofID = acknowledged.Proof.UploadID;
            }
        }
    }


}