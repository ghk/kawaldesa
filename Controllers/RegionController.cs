using App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers
{
    public class RegionController : BaseController<Region, long>
    {
        public RegionController(DB dbContext) : base(dbContext) {
            Include(r => r.Parent); 
        }

        protected override void PrePersist(Region model)
        {
            model.Parent = null;
            base.PrePersist(model);
        }

        protected override IQueryable<Region> ApplyQuery(IQueryable<Region> query)
        {
            var keywords = GetQueryString<string>("Keywords");
            if (!string.IsNullOrWhiteSpace(keywords))
                query = query.Where(r => r.Name.ToLower().Contains(keywords.ToLower()));
            return query;
        }

    }
}