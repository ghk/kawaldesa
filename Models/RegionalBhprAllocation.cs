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

    [ExcelFileName("Bagi Hasil Pajak Desa Se Kab.xlsx")]
    public class RegionalBhprAllocation : BaseEntity
    {
        [ExcelHeader("No")]
        public string No { get; set; }

        [ExcelHeader("Desa")]
        public string RegionName { get; set; }

        [ExcelHeader("Alokasi Dasar")]
        public decimal? BaseAllocation { get; set; }


        [ExcelHeader("PDRD Desa", "Alokasi Berdasarkan Formula")]
        public decimal? Pdrd { get; set; }

        [ExcelHeader("Rasio", "Alokasi Berdasarkan Formula")]
        public decimal? PdrdRatio { get; set; }

        [ExcelHeader("Alokasi Formula", "Alokasi Berdasarkan Formula")]
        public decimal? FormulaBasedAllocation { get; set; }

        [ExcelHeader("Bagi Hasil Pajak & Retribusi")]
        public decimal? Bhpr { get; set; }

        [ForeignKey("Region")]
        public String fkRegionId { get; set; }
        public virtual Region Region { get; set; }

        public bool IsActivated { get; set; }

        [ForeignKey("DocumentUpload")]
        public long fkDocumentUploadId { get; set; }
        public virtual DocumentUpload DocumentUpload { get; set; }
    }
}