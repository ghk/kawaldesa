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
using Scaffold;

namespace App.Models
{

    public class BaseRegionalBhprAllocationRecapitulation : IModel<string>
    {
        public string Id { get; set; }

        public string RegionId { get; set; }

        public int ApbdYear { get; set; }

        public bool ApbdIsPerubahan { get; set; }

        public string RegionName { get; set; }

        public decimal? BaseAllocation { get; set; }

        public decimal? Pdrd { get; set; }

        public decimal? PdrdRatio { get; set; }

        public decimal? FormulaBasedAllocation { get; set; }

        public decimal? Bhpr { get; set; }
    }

    public class RegionalBhprAllocationRecapitulation : BaseRegionalBhprAllocationRecapitulation
    {
    }

    public class FrozenRegionalBhprAllocationRecapitulation : BaseRegionalBhprAllocationRecapitulation
    {
    }
}