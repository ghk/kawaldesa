using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Apbn : BaseEntity
    {
        [Index]
        //[Index(IsUnique=true)]
        //TODO  uniqueindex Year Is Perubahan
        public int Year { get; set; }

        public bool IsPerubahan { get; set; }

    }
}