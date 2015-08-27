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

    [ExcelFileName("Dana Desa APBN Kab Se Indonesia")]
    public class NationalDdAllocation : BaseEntity, IAllocation
    {
        [ExcelHeader("No")]
        public string No { get; set; }

        [ExcelHeader(35, "Provinsi/Kabupaten")]
        public string RegionName { get; set; }

        [ExcelHeader(25, "Transfer Daerah")]
        public decimal? RegionalTransfer { get; set; }

        [ExcelHeader(25, "Dana Desa")]
        public decimal? Dd { get; set; }

        [ForeignKey("Region")]
        public String fkRegionId { get; set; }
        public virtual Region Region { get; set; }

        public bool IsActivated { get; set; }

        [ForeignKey("Apbn")]
        public long fkApbnId { get; set; }
        public virtual Apbn Apbn { get; set; }

        [ForeignKey("Spreadsheet")]
        public long fkSpreadsheetId { get; set; }
        public virtual Spreadsheet Spreadsheet { get; set; }
    }
}