using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Models
{
    public interface IAllocation: ISpreadsheetEntry
    {
        string No { get; set; }

        string RegionName { get; set; }

        string fkRegionId { get; set; }
    }
}
