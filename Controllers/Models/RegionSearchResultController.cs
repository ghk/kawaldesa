using App.Models;
using Microvac.Web;
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
            var sourceFunction = GetQueryString<SourceDocumentFunction?>("function");
            query = query.Where(r => r.Name.ToLower().Contains(keyword));
            if(sourceFunction.HasValue)
            {
                if (sourceFunction.Value == SourceDocumentFunction.Allocation)
                {
                    query = query.Where(r => r.Type == RegionType.NASIONAL || r.Type == RegionType.KABUPATEN);
                } else {
                    query = query.Where(r => r.Type == RegionType.DESA);
                }
            }
            query = query.Take(10);
            return query;
        }

    }
}