using App.Models;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers
{
    public class LiveRecapitulationController : ReadOnlyController<LiveRecapitulation, long>
    {
        public LiveRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<LiveRecapitulation> ApplyQuery(IQueryable<LiveRecapitulation> query)
        {
            if (!HttpContext.Current.User.IsInRole(Role.VOLUNTEER))
                throw new ApplicationException("not authorized");

            var parentID = GetQueryString<long?>("ParentID");
            if (!parentID.HasValue)
                throw new ApplicationException("Query must have parent ID");
            query = query.Where(t => t.ParentRegionID == parentID.Value || t.RegionID == parentID.Value);

            return query;
        }
    }
}