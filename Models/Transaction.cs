using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class BaseTransaction : BaseEntity
    {
        public override long ID { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public bool IsActivated { get; set; }
        public string SourceURL { get; set; }

        [ForeignKey("SourceFile")]
        public long? fkSourceFileID { get; set; }
        public virtual Blob SourceFile { get; set; }

        [ForeignKey("APBN")]
        public long fkAPBNID { get; set; }
        public virtual APBN APBN { get; set; }

        [ForeignKey("Source")]
        public long? fkSourceID { get; set; }
        public virtual Region Source { get; set; }
        
        [ForeignKey("Destination")]
        public long? fkDestinationID { get; set; }
        public virtual Region Destination { get; set; }
        
        [ForeignKey("Account")]
        public long? fkAccountID { get; set; }
        public virtual Account Account { get; set; }

        [ForeignKey("Actor")]
        public long fkActorID { get; set; }
        public virtual Region Actor { get; set; }

        [ForeignKey("CreatedBy")]
        public string fkCreatedByID { get; set; }
        public virtual User CreatedBy { get; set; }

        [ForeignKey("TransactionFile")]
        public long? fkTransactionFileID { get; set; }
        public virtual TransactionFile TransactionFile { get; set; }
    }

    public class Transaction : BaseTransaction
    {
    }

    public class FrozenTransaction : BaseTransaction
    {
    }
}