using Scaffold;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class BaseAccountRecapitulation : IModel<long>
    {
        public long ID { get; set; }

        public string RegionID { get; set; }

        public long APBNID { get; set; }

        public int APBNYear { get; set; }

        public string ParentRegionID { get; set; }

        public string RegionName { get; set; }

        public decimal BudgetedIncome { get; set; }

        public decimal RealizedIncome { get; set; }

        public decimal BudgetedExpense { get; set; }

        public decimal RealizedExpense { get; set; }

        public decimal EmployeeExpense { get; set; }

        public decimal GoodsAndServicesExpense { get; set; }

        public decimal CapitalExpense { get; set; }

        public decimal OthersExpense { get; set; }

        public decimal TotalVillage { get; set; }

        public decimal AccountCompletedVillage { get; set; }

    }
    public class AccountRecapitulation : BaseAccountRecapitulation
    {
    }
    public class FrozenAccountRecapitulation : BaseAccountRecapitulation
    {
    }

}