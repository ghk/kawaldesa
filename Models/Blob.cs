using System.Collections.Generic;

namespace App.Models
{
    public class Blob: BaseEntity
    {        
        public override long ID { get; set; }
        public string Name { get; set;}
        public string Type { get; set; }
        public string Path { get; set; }
        public long Size { get; set; } 
    }
}