using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class TransactionFile : BaseEntity
    {
        public override long ID { get; set; }
        public String FileName { get; set; }
        public bool IsCommited { get; set; }
        public virtual List<Transaction> Transactions { get; set; }
        public override DateTime DateCreated { get; set; }

        [NotMapped]
        public int TransactionCount
        {
            get
            {
                return new DB().Transactions.Where(e => e.fkTransactionFileID == ID).Count();
            }
        }

        [NotMapped]
        public decimal DesaCount
        {
            get
            {
                return new DB().Transactions.Where(e => e.fkTransactionFileID == ID).Select(e => e.fkDestinationID).Distinct().Count();
            }
        }

        [NotMapped]
        public decimal TotalAmount
        {
            get
            {
                return new DB().Transactions.Where(e => e.fkTransactionFileID == ID).Sum(e => e.Amount);
            }
        }
    }
}