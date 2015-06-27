using Scaffold.Validation;
using App.Utils.Excel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http.Validation;

namespace App.Models
{

    public class NationalAddAllocationRecapitulation : BaseEntity
    {
        public string RegionId { get; set; }

        public string RegionName { get; set; }

        public string ParentRegionId { get; set; }

        public decimal? DanaPerimbangan { get; set; }

        public decimal? Dak { get; set; }

        public decimal? Add { get; set; }

        public int TotalDesa { get; set; }

        public String fkRegionId { get; set; }
        public virtual Region Region { get; set; }

        public bool IsActivated { get; set; }

        public long fkApbnId { get; set; }
        public virtual Apbn Apbn { get; set; }

        public long fkDocumentUploadId { get; set; }
        public virtual DocumentUpload DocumentUpload { get; set; }
    }
}