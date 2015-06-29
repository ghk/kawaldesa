using App.Models;
using App.Models.Views;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class BaseRegionalAddRecapitulationController<TRecapitulation> : ReadOnlyController<TRecapitulation, string>
        where TRecapitulation: BaseRegionalAddRecapitulation, new()
    {
        public BaseRegionalAddRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<TRecapitulation> ApplyQuery(IQueryable<TRecapitulation> query)
        {
            var parentId = GetQueryString<string>("fkParentId");
            return query.Where(t => (t.ParentRegionId == parentId || t.RegionId == parentId) && t.ApbnKey == "2015p");
        }
    }
    public class RegionalAddRecapitulationController : BaseRegionalAddRecapitulationController<RegionalAddRecapitulation>
    {
        public RegionalAddRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }
    }
    public class FrozenRegionalAddRecapitulationController : BaseRegionalAddRecapitulationController<FrozenRegionalAddRecapitulation>
    {
        public FrozenRegionalAddRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }
    }
}