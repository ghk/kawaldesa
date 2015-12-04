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

        public string Name { get; set; }

        public int Year { get; set; }

        public bool IsRevision { get; set; }

        //[Index("IX_fkApbnID_fkRegionID", 2, IsUnique=true)]
        [Index]
        [ForeignKey("Region")]
        public string fkRegionId { get; set; }
        public virtual Region Region { get; set; }

        [ForeignKey("ModifiedBy")]
        public string fkModifiedById { get; set; }
        public virtual User ModifiedBy { get; set; }
        
        public virtual List<Account> Accounts { get; set; }
        
    }
}