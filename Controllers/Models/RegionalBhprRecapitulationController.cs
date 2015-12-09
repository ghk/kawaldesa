using App.Models;
using App.Models.Views;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class RegionalBhprRecapitulationController: ReadOnlyController<RegionalBhprRecapitulation, string>
    {
        public RegionalBhprRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<RegionalBhprRecapitulation> ApplyQuery(IQueryable<RegionalBhprRecapitulation> query)
        {
            var parentId = GetQueryString<string>("fkParentId");
            return query.Where(t => (t.ParentRegionId == parentId || t.RegionId == parentId) && t.ApbnKey == "2015p");
        }
    }
}