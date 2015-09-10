using App.Models;
using App.Models.Views;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class BaseNationalDdRecapitulationController<TRecapitulation> : ReadOnlyController<TRecapitulation, string>
        where TRecapitulation: BaseNationalDdRecapitulation, new()
    {
        public BaseNationalDdRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<TRecapitulation> ApplyQuery(IQueryable<TRecapitulation> query)
        {
            var parentId = GetQueryString<string>("fkParentId");
            return query.Where(t => (t.ParentRegionId == parentId || t.RegionId == parentId) && t.ApbnKey == "2015p");
        }
    }
    public class NationalDdRecapitulationController : BaseNationalDdRecapitulationController<NationalDdRecapitulation>
    {
        public NationalDdRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }
    }
    public class FrozenNationalDdRecapitulationController : BaseNationalDdRecapitulationController<FrozenNationalDdRecapitulation>
    {
        public FrozenNationalDdRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }
    }
}