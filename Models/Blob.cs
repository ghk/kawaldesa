using Scaffold;
using System.Collections.Generic;

namespace App.Models
{
    public class Blob: BaseEntity, IBlob
    {        
        public override long ID { get; set; }
        public string Name { get; set;}
        public string Type { get; set; }
        public long Size { get; set; }
        public string UploadID { get; set; }
        public string UploadFolder { get; set; }
    }
}