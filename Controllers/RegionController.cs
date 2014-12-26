using App.Models;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace App.Controllers
{
    public class RegionController : ReadOnlyController<Region, long>
    {
        public RegionController(DB dbContext) : base(dbContext) {
            dbContext.Configuration.ProxyCreationEnabled = false;
            SingleInclude(r => r.Parent.Parent, r => r.Parent.Parent.Parent, r => r.Parent.Parent.Parent.Parent);
        }
        protected override IQueryable<Region> ApplyQuery(IQueryable<Region> query)
        {
            var parentID = GetQueryString<long>("ParentID");
            return query.Where(r => r.fkParentID == parentID);
        }

        public Region GetByURLKey(String urlKey)
        {
            IQueryable<Region> exp = dbSet;
            foreach (var include in SingleIncludes)
            {
                exp = exp.Include(include);
            }
            return exp.FirstOrDefault(r => r.UrlKey == urlKey);
        }
    }
}