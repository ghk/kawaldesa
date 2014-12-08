using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Region : BaseEntity
    {
        public override long ID { get; set; }
        [MaxLength(500)]
        public string Name { get; set; }
        public RegionType Type { get; set; }
        
        [ForeignKey("Parent")]
        public long? ParentID { get; set; }
        public virtual Region Parent { get; set; }
        public virtual IEnumerable<Region> Children { get; set; }
    }

    public enum RegionType{
        NASIONAL = 1,
        PROPINSI,
        KABUPATEN,
        DESA
    }
}