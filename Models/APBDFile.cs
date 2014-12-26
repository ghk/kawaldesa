using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class APBDFile : BaseEntity
    {
        public String FileName { get; set; }
        public bool IsActivated { get; set; }
        public virtual List<APBD> APBDs { get; set; }

        [ForeignKey("File")]
        public long fkFileID { get; set; }
        public virtual Blob File { get; set; }
        
        [NotMapped]
        public int APBDCount 
        {
            get
            {
                return new DB().APBDs.Count(e => e.fkAPBDFileID == ID && e.DAU > 0 && e.DBH > 0);
            }
        }

        [NotMapped]
        public decimal TotalDAU
        {
            get
            {
                return new DB().APBDs.Where(e => e.fkAPBDFileID == ID).Sum(e => e.DAU);
            }
        }

        [NotMapped]
        public decimal TotalDBH
        {
            get
            {
                return new DB().APBDs.Where(e => e.fkAPBDFileID == ID).Sum(e => e.DBH);
            }
        }
    }
}