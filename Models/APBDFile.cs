using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class APBDFile : BaseEntity
    {
        public override long ID { get; set; }
        public String FileName { get; set; }
        public bool IsCommited { get; set; }
        public virtual List<APBD> APBDs { get; set; }
    }
}