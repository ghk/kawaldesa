using Scaffold;
using System.Collections.Generic;
using System.IO;
using System.Web;

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

        public override long ID { get; set; }
        public string Name { get; set;}
        public string Type { get; set; }
        public long Size { get; set; }

        public string FilePath
        {
            get
            {
                var root = HttpContext.Current.Server.MapPath("~/App_Data/files");
                Directory.CreateDirectory(root);
                return Path.Combine(root, ID.ToString());
            }
        }
    }
}