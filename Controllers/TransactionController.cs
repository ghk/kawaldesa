using App.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq.Expressions;
using System.Linq;
using System.Web;

namespace App.Controllers
{
    public class TransactionController: BaseController<Transaction, long>
    {
        public TransactionController(DB dbContext) : base(dbContext) {
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
                TransferredDate = transferred.Date.ToShortDateString();
                TransferredAmount = transferred.Amount;
                if(transferred.Proof != null)
                    TransferredProofID = transferred.Proof.UploadID;
            }
            if(acknowledged != null)
            {

                AcknowledgedDate = acknowledged.Date.ToShortDateString();
                AcknowledgedAmount = acknowledged.Amount;
                if (acknowledged.Proof != null)
                    AcknowledgedProofID = acknowledged.Proof.UploadID;
            }
        }
    }


}