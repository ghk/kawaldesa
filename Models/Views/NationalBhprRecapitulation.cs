using Scaffold.Validation;
using App.Utils.Spreadsheets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http.Validation;
using Scaffold;

namespace App.Models.Views
{

    public class BaseNationalBhprRecapitulation : IModel<string>
    {
        public string Id { get; set; }

        public string RegionId { get; set; }

        public string ApbnKey { get; set; }

        public string RegionName { get; set; }

        public string ParentRegionId { get; set; }

        public decimal? RegionalTax { get; set; }

        public decimal? RegionalRetribution { get; set; }

        public decimal? Bhpr { get; set; }

        public int TotalDesa { get; set; }

        public int CompletedDesa { get; set; }
    }

    public class NationalBhprRecapitulation : BaseNationalBhprRecapitulation
    {
    }

    public class FrozenNationalBhprRecapitulation : BaseNationalBhprRecapitulation
    {
    }
}