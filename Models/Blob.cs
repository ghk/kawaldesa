using Microvac.Web;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System;
using Newtonsoft.Json;

namespace App.Models
{
    public class Blob: BaseEntity
    {

        public Blob()
        {
        }

        public Blob(MultipartFile fResult)
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
                var fileName = Id.ToString();
                if (Name != null)
                    fileName = fileName + Path.GetExtension(Name);
                return fileName;
            }
        }

        [JsonIgnore]
        public string FilePath
        {
            get
            {
                String root = null;
                if (HttpContext.Current != null)
                    root = HttpContext.Current.Server.MapPath("~/Content/files");
                else
                    root = MapPath("~/Content/files");
                Directory.CreateDirectory(root);
                return Path.Combine(root, RelativeFileName);
            }
        }

        private string MapPath(string seedFile)
        {

            var absolutePath = new Uri(AppDomain.CurrentDomain.BaseDirectory).LocalPath;
            var directoryName = Path.GetDirectoryName(absolutePath);
            var path = Path.Combine(directoryName, ".." + seedFile.TrimStart('~').Replace('/', '\\'));

            return path;
        }
    }
}