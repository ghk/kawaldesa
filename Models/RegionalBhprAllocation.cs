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

    [ExcelFileName("Bagi Hasil Pajak Desa Se Kab")]
    public class RegionalBhprAllocation : BaseEntity, IAllocation
    {
        [ExcelHeader(15, "No")]
        public string No { get; set; }

        [ExcelHeader(35, "Desa")]
        public string RegionName { get; set; }

        [ExcelHeader(35, "Alokasi Dasar")]
        public decimal? BaseAllocation { get; set; }


        [ExcelHeader(15, "PDRD Desa", "Alokasi Berdasarkan Formula")]
        public decimal? Pdrd { get; set; }

        [ExcelHeader(15, "Rasio", "Alokasi Berdasarkan Formula")]
        public decimal? PdrdRatio { get; set; }

        [ExcelHeader(25, "Alokasi Formula", "Alokasi Berdasarkan Formula")]
        public decimal? FormulaBasedAllocation { get; set; }

        [ExcelHeader(25, "Bagi Hasil Pajak & Retribusi")]
        public decimal? Bhpr { get; set; }

        [ForeignKey("Region")]
        public String fkRegionId { get; set; }
        public virtual Region Region { get; set; }

        public bool IsActivated { get; set; }

        [ForeignKey("Apbd")]
        public long fkApbdId { get; set; }
        public virtual Apbd Apbd { get; set; }

        [ForeignKey("DocumentUpload")]
        public long fkDocumentUploadId { get; set; }
        public virtual DocumentUpload DocumentUpload { get; set; }
    }
}