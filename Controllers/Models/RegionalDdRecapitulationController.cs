using App.Models;
using App.Models.Views;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class RegionalDdRecapitulationController : ReadOnlyController<RegionalDdRecapitulation, string>
    {
        public RegionalDdRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<RegionalDdRecapitulation> ApplyQuery(IQueryable<RegionalDdRecapitulation> query)
        {
            var parentId = GetQueryString<string>("fkParentId");
            return query.Where(t => (t.ParentRegionId == parentId || t.RegionId == parentId) && t.ApbnKey == "2015p");
        }
    }
}