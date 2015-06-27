using Scaffold;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace App.Models.Views
{
    public class BaseAccountRecapitulation : IModel<long>
    {
        public long Id { get; set; }

        public string RegionId { get; set; }

        public long ApbnId { get; set; }

        public int ApbnYear { get; set; }

        public string ParentRegionId { get; set; }

        public string RegionName { get; set; }

        public decimal BudgetedIncome { get; set; }

        public decimal RealizedIncome { get; set; }

        public decimal BudgetedExpense { get; set; }

        public decimal RealizedExpense { get; set; }

        public decimal EmployeeExpense { get; set; }

        public decimal GoodsAndServicesExpense { get; set; }

        public decimal CapitalExpense { get; set; }

        public decimal OthersExpense { get; set; }

        public decimal TotalDesa { get; set; }

        public decimal AccountCompletedDesa { get; set; }

    }
    public class AccountRecapitulation : BaseAccountRecapitulation
    {
    }
    public class FrozenAccountRecapitulation : BaseAccountRecapitulation
    {
    }

}