using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class ApbdFile : BaseEntity
    {
        public String FileName { get; set; }

        public bool IsActivated { get; set; }
        
        public virtual List<Apbd> Apbds { get; set; }

        [ForeignKey("File")]
        public long fkFileId { get; set; }
        public virtual Blob File { get; set; }
        
        [NotMapped]
        public int ApbdCount 
        {
            get
            {
                return new DB().Apbds.Count(e => e.fkApbdFileId == Id && e.Dau > 0 && e.Dbh > 0);
            }
        }

        [NotMapped]
        public decimal TotalDau
        {
            get
            {
                return new DB().Apbds.Where(e => e.fkApbdFileId == Id).Sum(e => e.Dau);
            }
        }

        [NotMapped]
        public decimal TotalDbh
        {
            get
            {
                return new DB().Apbds.Where(e => e.fkApbdFileId == Id).Sum(e => e.Dbh);
            }
        }
    }
}