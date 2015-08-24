using App.Models;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace App.Controllers.Models
{
    public class RegionSearchResultController : ReadOnlyController<RegionSearchResult, string>
    {
        public RegionSearchResultController(DB dbContext)
            : base(dbContext)
        {
            dbContext.Configuration.ProxyCreationEnabled = false;
        }
        protected override IQueryable<RegionSearchResult> ApplyQuery(IQueryable<RegionSearchResult> query)
        {
            var keyword = GetQueryString<string>("keyword");
            if (keyword == null)
                keyword = string.Empty;
            keyword = keyword.ToLower();
            return query.Where(r => r.Name.ToLower().Contains(keyword)).Take(10);
        }

    }
}