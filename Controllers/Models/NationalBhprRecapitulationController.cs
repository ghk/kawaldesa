using App.Models;
using App.Models.Views;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class BaseNationalBhprRecapitulationController<TRecapitulation> : ReadOnlyController<TRecapitulation, string>
        where TRecapitulation: BaseNationalBhprRecapitulation, new()
    {
        public BaseNationalBhprRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<TRecapitulation> ApplyQuery(IQueryable<TRecapitulation> query)
        {
            var parentId = GetQueryString<string>("fkParentId");
            return query.Where(t => (t.ParentRegionId == parentId || t.RegionId == parentId) && t.ApbnKey == "2015p");
        }
    }
    public class NationalBhprRecapitulationController : BaseNationalBhprRecapitulationController<NationalBhprRecapitulation>
    {
        public NationalBhprRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }
    }
    public class FrozenNationalBhprRecapitulationController : BaseNationalBhprRecapitulationController<FrozenNationalBhprRecapitulation>
    {
        public FrozenNationalBhprRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }
    }
}