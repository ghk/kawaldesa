using Scaffold;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System;

namespace App.Models
{
    public class Blob: BaseEntity
    {

        public Blob()
        {
        }

        public Blob(FileResult fResult)
        {
            Type = fResult.Type;
            Size = fResult.Size;
            Name = fResult.Name;
        }

        public string Name { get; set;}
        public string Type { get; set; }
        public long Size { get; set; }

        public String RelativeFileName
        {
            get
            {
                var fileName = ID.ToString();
                if (Name != null)
                    fileName = fileName + Path.GetExtension(Name);
                return fileName;
            }
        }

        public string FilePath
        {
            get
            {
                var root = HttpContext.Current.Server.MapPath("~/Content/files");
                Directory.CreateDirectory(root);
                return Path.Combine(root, RelativeFileName);
            }
        }
    }
}