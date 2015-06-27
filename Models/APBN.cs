using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Apbn : BaseEntity
    {
        [Index(IsUnique=true)]
        public string Key { get; set; }

        [Index]
        public int Year { get; set; }

        public bool IsPerubahan { get; set; }

    }
}