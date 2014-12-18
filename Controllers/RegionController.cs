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
            var type = GetQueryString<int?>("Type");
            var parentID = GetQueryString<long?>("ParentID");

            if (!string.IsNullOrWhiteSpace(keywords))
                query = query.Where(r => r.Name.ToLower().Contains(keywords.ToLower()));
            if (type != null)
                query = query.Where(r => r.Type == (RegionType)type);
            if (parentID != null)
                query = query.Where(r => r.Parent.ID == parentID);
            return query;
        }

    }
}