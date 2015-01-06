using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class APBDes : BaseEntity
    {
        [Index]
        public bool IsActivated { get; set; }

        [Index]
        public bool IsCompleted { get; set; }

        public DateTime? DateCompleted { get; set; }

        public string SourceURL { get; set; }

        [ForeignKey("SourceFile")]
        public long? fkSourceFileID { get; set; }
        public virtual Blob SourceFile { get; set; }
        
        [Index("IX_fkAPBNID_fkRegionID", 1, IsUnique=true)]
        [Index]
        [ForeignKey("APBN")]
        public long fkAPBNID { get; set; }
        public virtual APBN APBN { get; set; }

        [Index("IX_fkAPBNID_fkRegionID", 2, IsUnique=true)]
        [Index]
        [ForeignKey("Region")]
        public long fkRegionID { get; set; }
        public virtual Region Region { get; set; }

        [ForeignKey("CompletedBy")]
        public string fkCompletedByID { get; set; }
        public virtual User CompletedBy { get; set; }

        [ForeignKey("ModifiedBy")]
        public string fkModifiedByID { get; set; }
        public virtual User ModifiedBy { get; set; }
        
        public virtual List<Account> Accounts { get; set; }
        
    }
}