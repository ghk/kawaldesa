using Microvac.Web;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace App.Models.Views
{
    public class BaseAccountRecapitulation : IModel<string>
    {
        public string Id { get; set; }

        public string RegionId { get; set; }

        public long ApbnId { get; set; }

        public string ApbnKey { get; set; }

        public string ParentRegionId { get; set; }

        public string RegionName { get; set; }

        public decimal BudgetedIncome { get; set; }

        public decimal RealizedIncome { get; set; }

        public decimal BudgetedExpense { get; set; }

        public decimal RealizedExpense { get; set; }

        public decimal Recap1Expense { get; set; }

        public decimal Recap2Expense { get; set; }

        public decimal Recap3Expense { get; set; }

        public decimal Recap4Expense { get; set; }


        public decimal TotalDesa { get; set; }

        public decimal CompletedDesa { get; set; }

    }
    public class AccountRecapitulation : BaseAccountRecapitulation
    {
    }
    public class FrozenAccountRecapitulation : BaseAccountRecapitulation
    {
    }

}