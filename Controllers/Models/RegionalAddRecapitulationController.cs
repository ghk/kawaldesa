using App.Models;
using App.Models.Views;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class RegionalAddRecapitulationController : ReadOnlyController<RegionalAddRecapitulation, string>
    {
        public RegionalAddRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<RegionalAddRecapitulation> ApplyQuery(IQueryable<RegionalAddRecapitulation> query)
        {
            var parentId = GetQueryString<string>("fkParentId");
            return query.Where(t => (t.ParentRegionId == parentId || t.RegionId == parentId) && t.ApbnKey == "2015p");
        }
    }
}