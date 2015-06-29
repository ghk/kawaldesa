using App.Models;
using App.Models.Views;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class BaseRegionalBhprRecapitulationController<TRecapitulation> : ReadOnlyController<TRecapitulation, string>
        where TRecapitulation: BaseRegionalBhprRecapitulation, new()
    {
        public BaseRegionalBhprRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<TRecapitulation> ApplyQuery(IQueryable<TRecapitulation> query)
        {
            var parentId = GetQueryString<string>("fkParentId");
            return query.Where(t => (t.ParentRegionId == parentId || t.RegionId == parentId) && t.ApbnKey == "2015p");
        }
    }
    public class RegionalBhprRecapitulationController : BaseRegionalBhprRecapitulationController<RegionalBhprRecapitulation>
    {
        public RegionalBhprRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }
    }
    public class FrozenRegionalBhprRecapitulationController : BaseRegionalBhprRecapitulationController<FrozenRegionalBhprRecapitulation>
    {
        public FrozenRegionalBhprRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }
    }
}