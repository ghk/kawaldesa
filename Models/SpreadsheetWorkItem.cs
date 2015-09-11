using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class SpreadsheetWorkItem: BaseEntity
    {
        public string GoogleSheetId { get; set; }

        [ForeignKey("User")]
        public string fkUserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Region")]
        public String fkRegionId { get; set; }
        public virtual Region Region { get; set; }

        public DocumentUploadType Type { get; set; }
        public String ApbnKey { get; set; }
    }
}