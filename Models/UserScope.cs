using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class UserScope : BaseEntity
    {
        [ForeignKey("User")]
        public string fkUserID { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("Region")]
        public string fkRegionID { get; set; }
        public virtual Region Region { get; set; }

    }
}