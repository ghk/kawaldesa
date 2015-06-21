using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class TransactionFile : BaseEntity
    {
        public String FileName { get; set; }

        public bool IsActivated { get; set; }
        
        [ForeignKey("File")]
        public long fkFileId { get; set; } 
        public virtual Blob File { get; set; }

        public virtual List<Transaction> Transactions { get; set; }

        [NotMapped]
        public int TransactionCount
        {
            get
            {
                return new DB().Transactions.Where(e => e.fkTransactionFileId == Id).Count();
            }
        }

        [NotMapped]
        public decimal DesaCount
        {
            get
            {
                return new DB().Transactions.Where(e => e.fkTransactionFileId == Id).Select(e => e.fkDestinationId).Distinct().Count();
            }
        }

        [NotMapped]
        public decimal TotalAmount
        {
            get
            {
                return new DB().Transactions.Where(e => e.fkTransactionFileId == Id).Sum(e => e.Amount);
            }
        }
    }
}