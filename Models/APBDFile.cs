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
        


    }
}