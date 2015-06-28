using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Models
{
    public interface IAllocation
    {
        string fkRegionId { get; }
        string No { get; }
        string RegionName { get; }
    }
}
