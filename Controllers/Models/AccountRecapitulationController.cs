using App.Models;
using App.Models.Views;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class AccountRecapitulationController<TRecapitulation> : ReadOnlyController<AccountRecapitulation, string>
    {
        public AccountRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<AccountRecapitulation> ApplyQuery(IQueryable<AccountRecapitulation> query)
        {
            var parentId = GetQueryString<string>("ParentId");
            return query.Where(t => t.ParentRegionId == parentId || t.RegionId == parentId);
        }
    }
}