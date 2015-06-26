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

    [ExcelFileName("Add Desa Se Kab.xlsx")]
    public class RegionalAddAllocation : BaseEntity
    {
        [ExcelHeader("No")]
        public string No { get; set; }

        [ExcelHeader("Desa")]
        public string RegionName { get; set; }

        [ExcelHeader("Alokasi Dasar")]
        public decimal? BaseAllocation { get; set; }


        [ExcelHeader("Jumlah Penduduk", "Jumlah Penduduk", "Alokasi Berdasarkan Formula")]
        public int? Population { get; set; }

        [ExcelHeader("Rasio", "Jumlah Penduduk", "Alokasi Berdasarkan Formula")]
        public decimal? PopulationRatio { get; set; }

        [ExcelHeader("Bobot", "Jumlah Penduduk", "Alokasi Berdasarkan Formula")]
        public decimal? PopulationWeight { get; set; }


        [ExcelHeader("Jumlah Penduduk Miskin", "Jumlah Penduduk Miskin", "Alokasi Berdasarkan Formula")]
        public int? PoorPopulation { get; set; }

        [ExcelHeader("Rasio", "Jumlah Penduduk Miskin", "Alokasi Berdasarkan Formula")]
        public decimal? PoorPopulationRatio { get; set; }

        [ExcelHeader("Bobot", "Jumlah Penduduk Miskin", "Alokasi Berdasarkan Formula")]
        public decimal? PoorPopulationWeight { get; set; }


        [ExcelHeader("Luas Wilayah", "Luas Wilayah", "Alokasi Berdasarkan Formula")]
        public decimal? Area { get; set; }

        [ExcelHeader("Rasio", "Luas Wilayah", "Alokasi Berdasarkan Formula")]
        public decimal? AreaRatio { get; set; }

        [ExcelHeader("Bobot", "Luas Wilayah", "Alokasi Berdasarkan Formula")]
        public decimal? AreaWeight { get; set; }


        [ExcelHeader("IKG", "Index Ketahanan Geografis", "Alokasi Berdasarkan Formula")]
        public decimal? Ikg { get; set; }

        [ExcelHeader("Rasio", "Index Ketahanan Geografis", "Alokasi Berdasarkan Formula")]
        public decimal? IkgRatio { get; set; }

        [ExcelHeader("Bobot", "Index Ketahanan Geografis", "Alokasi Berdasarkan Formula")]
        public decimal? IkgWeight { get; set; }


        [ExcelHeader("Total Bobot", "Alokasi Berdasarkan Formula")]
        public decimal? TotalWeight { get; set; }

        [ExcelHeader("Alokasi Formula", "Alokasi Berdasarkan Formula")]
        public decimal? FormulaBasedAllocation { get; set; }

        [ExcelHeader("ADD")]
        public decimal? Dd { get; set; }

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