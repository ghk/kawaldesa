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

    [ExcelFileName("Bagi Hasil Pajak Kab Se Indonesia.xlsx")]
    public class NationalBhprAllocation : BaseEntity
    {
        [ExcelHeader("No")]
        public string No { get; set; }

        [ExcelHeader("Provinsi/Kabupaten")]
        public string RegionName { get; set; }

        [ExcelHeader("Pajak Daerah")]
        public decimal? RegionalTax { get; set; }

        [ExcelHeader("Retribusi Daerah")]
        public decimal? RegionalRetribution { get; set; }

        [ExcelHeader("Bagi Hasil Pajak & Retribusi")]
        public decimal? Bhpr { get; set; }

        [ForeignKey("Region")]
        public String fkRegionId { get; set; }
        public virtual Region Region { get; set; }

        public bool IsActivated { get; set; }

        [ForeignKey("Apbn")]
        public long fkApbnId { get; set; }
        public virtual Apbn Apbn { get; set; }

        [ForeignKey("DocumentUpload")]
        public long fkDocumentUploadId { get; set; }
        public virtual DocumentUpload DocumentUpload { get; set; }
    }
}