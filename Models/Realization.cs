using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Realization : BaseEntity
    {
        public String Description { get; set; }
        public String Vendor { get; set; }
        public Sector? Sector { get; set; }

        [ForeignKey("Transaction")]
        public long fkTransactionID { get; set; }
        public virtual Transaction Transaction { get; set; }
    }
}