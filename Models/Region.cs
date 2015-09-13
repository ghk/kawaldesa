using Microvac.Web;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Region : IModel<string>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }

        public string Name { get; set; }
        
        public RegionType Type { get; set; }
        
        public bool IsKelurahan { get; set; }

        public bool IsInScope { get; set; }
        
        public string Website { get; set; }

        [Index(IsUnique=true)]
        public String UrlKey { get; set; }
        
        [ForeignKey("Parent")]
        public string fkParentId { get; set; }
        public virtual Region Parent { get; set; }

        public DateTime DateCreated { get; set; }
 
        public DateTime DateModified { get; set; }
    }

}