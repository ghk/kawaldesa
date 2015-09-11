using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class SpreadsheetWorkDir: BaseEntity
    {
        public string GoogleSheetId { get; set; }

        [ForeignKey("User")]
        public string fkUserId { get; set; }
        public User User { get; set; }
    }
}