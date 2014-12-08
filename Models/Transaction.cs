using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Transaction : BaseEntity
    {
        public override long ID { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

        [ForeignKey("Proof")]
        public long ProofID { get; set; }
        
        [ForeignKey("Source")]
        public long SourceID { get; set; }
        
        [ForeignKey("Destination")]
        public long DestinationID { get; set; }
        
        public virtual Blob Proof { get; set; }
        public virtual Region Source { get; set; }
        public virtual Region Destination { get; set; }
    }
}