using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Models
{
    public interface ISpreadsheetEntry
    {
        bool IsActivated { get; set; }
        long fkSpreadsheetId { get; set; }
    }
}
