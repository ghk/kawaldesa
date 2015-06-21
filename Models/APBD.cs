using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Apbd : BaseEntity
    {
        public decimal Dau { get; set; }

        public decimal Dbh { get; set; }

        public bool IsActivated { get; set; }
        
        [ForeignKey("Apbn")]
        public long fkApbnId { get; set; }
        public virtual Apbn Apbn { get; set; }

        [Index("IX_fkRegionId_fkApbdFileId", 1, IsUnique=true)]
        [Index]
        [ForeignKey("Region")]
        public string fkRegionId { get; set; }
        public virtual Region Region { get; set; }
        
        [Index("IX_fkRegionId_fkApbdFileId", 2, IsUnique=true)]
        [Index]
        [ForeignKey("ApbdFile")]
        public long fkApbdFileId { get; set; }
        public virtual ApbdFile ApbdFile { get; set; }

    }
}