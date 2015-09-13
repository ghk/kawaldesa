using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class TransferProgress: IModel<string>
    {
        public string Id { get; set; }
        public  string fkRegionId { get; set; }
        public string ApbnKey { get; set; }
        public int Type { get; set; }
        public int Month { get; set; }
        public double Percent { get; set; }
    }
}