using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Apbdes : BaseEntity
    {
        [Index]
        public bool IsActivated { get; set; }

        [Index]
        public bool IsCompleted { get; set; }

        public DateTime? DateCompleted { get; set; }

        public string SourceUrl { get; set; }

        [ForeignKey("SourceFile")]
        public long? fkSourceFileId { get; set; }
        public virtual Blob SourceFile { get; set; }
        
        [Index("IX_fkApbnId_fkRegionId", 1, IsUnique=true)]
        [Index]
        [ForeignKey("Apbn")]
        public long fkApbnId { get; set; }
        public virtual Apbn Apbn { get; set; }

        [Index("IX_fkApbnID_fkRegionID", 2, IsUnique=true)]
        [Index]
        [ForeignKey("Region")]
        public string fkRegionId { get; set; }
        public virtual Region Region { get; set; }

        [ForeignKey("CompletedBy")]
        public string fkCompletedById { get; set; }
        public virtual User CompletedBy { get; set; }

        [ForeignKey("ModifiedBy")]
        public string fkModifiedById { get; set; }
        public virtual User ModifiedBy { get; set; }
        
        public virtual List<Account> Accounts { get; set; }
        
    }
}