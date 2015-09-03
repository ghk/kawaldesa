using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class SourceDocument : BaseEntity
    {
        public String FileName { get; set; }
        public String OriginalFileName { get; set; }
        public String GoogleDriveId { get; set; }
        public DocumentUploadType Type { get; set; }
        public SourceDocumentFunction Function { get; set; }
        public bool ThumbnailCreated { get; set; }

        public String ApbnKey { get; set; }

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

        [ForeignKey("Transfer")]
        public long? fkTransferId { get; set; }
        public virtual Transfer Transfer { get; set; }
    }
}