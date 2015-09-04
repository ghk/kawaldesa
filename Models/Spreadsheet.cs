using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Spreadsheet : BaseEntity
    {
        public String FileName { get; set; }
        public String DocumentName { get; set; }
        public DocumentUploadType Type { get; set; }
        public String Notes { get; set; }
        public String ApbnKey { get; set; }

        public bool IsActivated { get; set; }
        public bool IsApproved { get; set; }

        public DateTime DateApproved { get; set; }
        public DateTime DateActivated { get; set; }
        public DateTime DateDeactivated { get; set; }

        [ForeignKey("Region")]
        public String fkRegionId { get; set; }
        public virtual Region Region { get; set; }

        [ForeignKey("File")]
        public long fkFileId { get; set; }
        public virtual Blob File { get; set; }

        [ForeignKey("CreatedBy")]
        public string fkCreatedById { get; set; }
        public virtual User CreatedBy { get; set; }

        [ForeignKey("Organization")]
        public long fkOrganizationId { get; set; }
        public virtual Organization Organization { get; set; }

        [ForeignKey("ApprovedBy")]
        public string fkApprovedById { get; set; }
        public virtual User ApprovedBy { get; set; }
    }
}