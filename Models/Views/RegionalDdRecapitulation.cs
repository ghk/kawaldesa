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

    public class RegionalDdRecapitulation : IModel<string>
    {
        public string Id { get; set; }

        public string RegionId { get; set; }

        public string ParentRegionId { get; set; }

        public string ApbnKey { get; set; }

        public string RegionName { get; set; }

        public decimal? BaseAllocation { get; set; }

        public int? Population { get; set; }

        public decimal? PopulationRatio { get; set; }

        public decimal? PopulationWeight { get; set; }

        public int? PoorPopulation { get; set; }

        public decimal? PoorPopulationRatio { get; set; }

        public decimal? PoorPopulationWeight { get; set; }

        public decimal? Area { get; set; }

        public decimal? AreaRatio { get; set; }

        public decimal? AreaWeight { get; set; }

        public decimal? Ikg { get; set; }

        public decimal? IkgRatio { get; set; }

        public decimal? IkgWeight { get; set; }

        public decimal? TotalWeight { get; set; }

        public decimal? FormulaBasedAllocation { get; set; }

        public decimal? Dd { get; set; }
    }
}