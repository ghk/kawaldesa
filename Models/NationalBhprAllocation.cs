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

    [ExcelFileName("Bagi Hasil Pajak Kab Se Indonesia")]
    public class NationalBhprAllocation : BaseEntity, IAllocation
    {
        [ExcelHeader("No")]
        public string No { get; set; }

        [ExcelHeader(35, "Provinsi/Kabupaten")]
        public string RegionName { get; set; }

        [ExcelHeader(25, "Pajak Daerah")]
        public decimal? RegionalTax { get; set; }

        [ExcelHeader(25, "Retribusi Daerah")]
        public decimal? RegionalRetribution { get; set; }

        [ExcelHeader(25, "Bagi Hasil Pajak & Retribusi")]
        public decimal? Bhpr { get; set; }

        [ForeignKey("Region")]
        public String fkRegionId { get; set; }
        public virtual Region Region { get; set; }

        public bool IsActivated { get; set; }

        [ForeignKey("Apbd")]
        public long fkApbdId { get; set; }
        public virtual Apbd Apbd { get; set; }

        [ForeignKey("Spreadsheet")]
        public long fkSpreadsheetId { get; set; }
        public virtual Spreadsheet Spreadsheet { get; set; }
    }
}