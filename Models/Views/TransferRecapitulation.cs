using Scaffold;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace App.Models.Views
{
    public class BaseTransferRecapitulation : IModel<long>
    {
        public long Id { get; set; }

        public string RegionId { get; set; }

        public long ApbnId { get; set; }

        public int ApbnYear { get; set; }

        public string ParentRegionId { get; set; }

        public string RegionName { get; set; }

        public decimal BudgetedApbn { get; set; }

        public decimal TransferredApbn { get; set; }

        public decimal AcknowledgedApbn { get; set; }

        public decimal BudgetedAdd { get; set; }

        public decimal TransferredAdd { get; set; }

        public decimal AcknowledgedAdd { get; set; }

    }
    public class TransferRecapitulation : BaseTransferRecapitulation
    {
    }
    public class FrozenTransferRecapitulation : BaseTransferRecapitulation
    {
    }

}