using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class APBDes : BaseEntity
    {
        public bool IsActivated { get; set; }
        public bool IsCompleted { get; set; }

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

        public virtual List<Account> Accounts { get; set; }
        
    }
}