using Microvac.Web.Validation;
using App.Utils.Spreadsheets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http.Validation;
using Microvac.Web;

namespace App.Models.Views
{

    public class BaseRegionalBhprRecapitulation : IModel<string>
    {
        public string Id { get; set; }

        public string RegionId { get; set; }

        public string ParentRegionId { get; set; }

        public string ApbnKey { get; set; }

        public string RegionName { get; set; }

        public decimal? BaseAllocation { get; set; }

        public decimal? Pdrd { get; set; }

        public decimal? PdrdRatio { get; set; }

        public decimal? FormulaBasedAllocation { get; set; }

        public decimal? Bhpr { get; set; }
    }

    public class RegionalBhprRecapitulation : BaseRegionalBhprRecapitulation
    {
    }

    public class FrozenRegionalBhprRecapitulation : BaseRegionalBhprRecapitulation
    {
    }
}