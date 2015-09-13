using App.Models.Views;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Models.Bundles
{
    [ViewModel]
    public class AllocationBundle
    {
        public Region Region { get; set; }
        public Spreadsheet CurrentSpreadsheet { get; set; }
        public List<SourceDocument> SourceDocuments { get; set; }

        public List<NationalDdRecapitulation> NationalDdRecapitulations { get; set; }
        public List<RegionalDdRecapitulation> RegionalDdRecapitulations { get; set; }

        public List<NationalAddRecapitulation> NationalAddRecapitulations { get; set; }
        public List<RegionalAddRecapitulation> RegionalAddRecapitulations { get; set; }

        public List<NationalBhprRecapitulation> NationalBhprRecapitulations { get; set; }
        public List<RegionalBhprRecapitulation> RegionalBhprRecapitulations { get; set; }
    }
}