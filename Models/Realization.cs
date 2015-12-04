using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Realization : BaseEntity
    {
        [ForeignKey("Account")]
        public long fkAccountId { get; set; }
        public virtual Account Account { get; set; }

        public decimal? Amount { get; set; }
        public DateTime Date { get; set; }


    }
}