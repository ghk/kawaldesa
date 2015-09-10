using Microvac.Web;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class RegionSearchResult : IModel<string>
    {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public RegionType Type { get; set; }

        public String TypeName { get; set; }

        public string ParentId { get; set; }

        public string Parent { get; set; }
        
    }

}