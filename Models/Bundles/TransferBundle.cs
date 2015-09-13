using App.Models.Views;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Models.Bundles
{
    [ViewModel]
    public class TransferBundle
    {
        public Region Region { get; set; }
        public List<TransferRecapitulation> TransferRecapitulations { get; set; }
        public List<Transfer> Transfers { get; set; }
        public List<TransferProgress> TransferProgress { get; set; }
    }
}