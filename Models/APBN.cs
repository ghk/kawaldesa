using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class APBN : BaseEntity
    {
        public override long ID { get; set; }
        public decimal DanaPerDesa { get; set; }
        public int Year { get; set; }

    }
}