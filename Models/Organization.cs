using Scaffold.Validation;
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
    public class Organization : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string UrlKey { get; set; }

        [ForeignKey("Picture")]
        public long fkPictureID { get; set; }
        public virtual Blob Picture { get; set; }
    }
}