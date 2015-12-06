using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class TransferProgress : IModel<string>
    {
        public string Id { get; set; }
        public int Month { get; set; }
        public string RegionId { get; set; }
        public string ApbnKey { get; set; }

        public decimal TransferredDd { get; set; }
        public decimal TransferredAdd { get; set; }
        public decimal TransferredBhpr { get; set; }

        public decimal AllocatedDd { get; set; }
        public decimal AllocatedAdd { get; set; }
        public decimal AllocatedBhpr { get; set; }
    }
}