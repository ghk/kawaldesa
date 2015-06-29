using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Models
{
    public interface IDocumentUploadEntry
    {
        bool IsActivated { get; set; }
        long fkDocumentUploadId { get; set; }
    }
}
