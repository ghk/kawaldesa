using App.Models;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers
{
    public class RecapitulationController : ReadOnlyController<Recapitulation, long>
    {
        public RecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<Recapitulation> ApplyQuery(IQueryable<Recapitulation> query)
        {
            var parentID = GetQueryString<long?>("ParentID");
            if (parentID.HasValue)
                query = query.Where(t => t.ParentRegionID == parentID.Value || t.RegionID == parentID.Value);
            return query;
        }
    }
}