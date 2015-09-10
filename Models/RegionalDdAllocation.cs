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

namespace App.Models
{

    [SpreadsheetFileName("Dana Desa APBN Desa Se Kab")]
    public class RegionalDdAllocation : BaseEntity, IAllocation
    {
        [SpreadsheetHeader(15,"No")]
        public string No { get; set; }

        [SpreadsheetHeader(35, "Desa")]
        public string RegionName { get; set; }

        [SpreadsheetHeader(25, "Alokasi Dasar")]
        public decimal? BaseAllocation { get; set; }


        [SpreadsheetHeader("Jumlah", "Jumlah Penduduk", "Alokasi Berdasarkan Formula")]
        public int? Population { get; set; }

        [SpreadsheetHeader("Rasio", "Jumlah Penduduk", "Alokasi Berdasarkan Formula")]
        public decimal? PopulationRatio { get; set; }

        [SpreadsheetHeader("Bobot", "Jumlah Penduduk", "Alokasi Berdasarkan Formula")]
        public decimal? PopulationWeight { get; set; }


        [SpreadsheetHeader("Jumlah", "Jumlah Penduduk Miskin", "Alokasi Berdasarkan Formula")]
        public int? PoorPopulation { get; set; }

        [SpreadsheetHeader("Rasio", "Jumlah Penduduk Miskin", "Alokasi Berdasarkan Formula")]
        public decimal? PoorPopulationRatio { get; set; }

        [SpreadsheetHeader("Bobot", "Jumlah Penduduk Miskin", "Alokasi Berdasarkan Formula")]
        public decimal? PoorPopulationWeight { get; set; }


        [SpreadsheetHeader("Luas", "Luas Wilayah", "Alokasi Berdasarkan Formula")]
        public decimal? Area { get; set; }

        [SpreadsheetHeader("Rasio", "Luas Wilayah", "Alokasi Berdasarkan Formula")]
        public decimal? AreaRatio { get; set; }

        [SpreadsheetHeader("Bobot", "Luas Wilayah", "Alokasi Berdasarkan Formula")]
        public decimal? AreaWeight { get; set; }


        [SpreadsheetHeader("IKG", "Index Ketahanan Geografis", "Alokasi Berdasarkan Formula")]
        public decimal? Ikg { get; set; }

        [SpreadsheetHeader("Rasio", "Index Ketahanan Geografis", "Alokasi Berdasarkan Formula")]
        public decimal? IkgRatio { get; set; }

        [SpreadsheetHeader("Bobot", "Index Ketahanan Geografis", "Alokasi Berdasarkan Formula")]
        public decimal? IkgWeight { get; set; }


        [SpreadsheetHeader(15, "Total Bobot", "Alokasi Berdasarkan Formula")]
        public decimal? TotalWeight { get; set; }

        [SpreadsheetHeader(25, "Alokasi Formula", "Alokasi Berdasarkan Formula")]
        public decimal? FormulaBasedAllocation { get; set; }

        [SpreadsheetHeader(25, "Dana Desa")]
        public decimal? Dd { get; set; }

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