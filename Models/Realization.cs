using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Realization : BaseEntity
    {
        public override long ID { get; set; }
        public String Description { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public String Vendor { get; set; }
        public Sector? Sector { get; set; }
        public bool IsActivated { get; set; }

        [ForeignKey("Account")]
        public long? fkAccountID { get; set; }
        public virtual Account Account { get; set; }
    }
}