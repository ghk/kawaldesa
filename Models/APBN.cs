using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class APBN : BaseEntity
    {
        public decimal DanaPerDesa { get; set; }

        [Index(IsUnique=true)]
        public int Year { get; set; }

    }
}