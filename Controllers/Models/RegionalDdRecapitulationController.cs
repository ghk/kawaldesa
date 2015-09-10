using App.Models;
using App.Models.Views;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class BaseRegionalDdRecapitulationController<TRecapitulation> : ReadOnlyController<TRecapitulation, string>
        where TRecapitulation: BaseRegionalDdRecapitulation, new()
    {
        public BaseRegionalDdRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<TRecapitulation> ApplyQuery(IQueryable<TRecapitulation> query)
        {
            var parentId = GetQueryString<string>("fkParentId");
            return query.Where(t => (t.ParentRegionId == parentId || t.RegionId == parentId) && t.ApbnKey == "2015p");
        }
    }
    public class RegionalDdRecapitulationController : BaseRegionalDdRecapitulationController<RegionalDdRecapitulation>
    {
        public RegionalDdRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }
    }
    public class FrozenRegionalDdRecapitulationController : BaseRegionalDdRecapitulationController<FrozenRegionalDdRecapitulation>
    {
        public FrozenRegionalDdRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }
    }
}