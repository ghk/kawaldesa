using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class APBD : BaseEntity
    {
        public decimal DAU { get; set; }
        public decimal DBH { get; set; }
        public bool IsActivated { get; set; }
        
        [ForeignKey("APBN")]
        public long fkAPBNID { get; set; }
        public virtual APBN APBN { get; set; }

        [Index("IX_fkRegionID_fkAPBDFileID", 1, IsUnique=true)]
        [Index]
        [ForeignKey("Region")]
        public long fkRegionID { get; set; }
        public virtual Region Region { get; set; }
        
        [Index("IX_fkRegionID_fkAPBDFileID", 2, IsUnique=true)]
        [Index]
        [ForeignKey("APBDFile")]
        public long fkAPBDFileID { get; set; }
        public virtual APBDFile APBDFile { get; set; }

    }
}