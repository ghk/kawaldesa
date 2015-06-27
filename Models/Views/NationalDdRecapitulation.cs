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

namespace App.Models.Views
{

    public class BaseNationalDdRecapitulation : BaseEntity
    {
        public string Id { get; set; }

        public string RegionId { get; set; }
        
        public int ApbnYear { get; set; }

        public bool ApbnIsPerubahan { get; set; }

        public string RegionName { get; set; }

        public string ParentRegionId { get; set; }

        public decimal? RegionalTransfer { get; set; }

        public decimal? Dd { get; set; }

        public int TotalDesa { get; set; }

        public int CompletedDesa { get; set; }
    }

    public class NationalDdRecapitulation : BaseNationalDdRecapitulation
    {
    }

    public class FrozenNationalDdRecapitulation : BaseNationalDdRecapitulation
    {
    }
}