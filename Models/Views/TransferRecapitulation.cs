using Scaffold;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace App.Models.Views
{
    public class BaseTransferRecapitulation : IModel<string>
    {
        public string Id { get; set; }

        public string RegionId { get; set; }

        public long ApbnId { get; set; }

        public string ApbnKey { get; set; }

        public string ParentRegionId { get; set; }

        public string RegionName { get; set; }

        public decimal BudgetedDd { get; set; }

        public decimal TransferredDd { get; set; }

        public decimal BudgetedAdd { get; set; }

        public decimal TransferredAdd { get; set; }

        public decimal BudgetedBhpr { get; set; }

        public decimal TransferredBhpr { get; set; }

    }
    public class TransferRecapitulation : BaseTransferRecapitulation
    {
    }
    public class FrozenTransferRecapitulation : BaseTransferRecapitulation
    {
    }

}