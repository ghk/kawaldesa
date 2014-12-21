using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class APBDesAccount : BaseEntity
    {
        public override long ID { get; set; }
        public String AccountNo { get; set; }
        public String AccountName { get; set; }
        public decimal? Amount { get; set; }
        public decimal? RealizationAmount { get; set; }
        public bool IsActivated { get; set; }
        [ForeignKey("ParentAccount")]
        public long? fkParentAccountID { get; set; }

        public virtual APBDesAccount ParentAccount { get; set; }
        
        [ForeignKey("APBN")]
        public long fkAPBNID { get; set; }

        public virtual APBN APBN { get; set; }

        [ForeignKey("Region")]
        public long fkRegionID { get; set; }

        public virtual Region Region { get; set; }
    }
}