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
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public override long ID { get; set; }
        public string Name { get; set; }
        public RegionType Type { get; set; }
        public bool IsKelurahan { get; set; }

        [Index(IsUnique=true)]
        public String UrlKey { get; set; }
        
        [ForeignKey("Parent")]
        public long? fkParentID { get; set; }
        public virtual Region Parent { get; set; }

    }

}