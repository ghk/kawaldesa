using App.Models;
using App.Models.Views;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class TransferRecapitulationController : ReadOnlyController<TransferRecapitulation, string>
    {
        public TransferRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<TransferRecapitulation> ApplyQuery(IQueryable<TransferRecapitulation> query)
        {
            var parentId = GetQueryString<string>("ParentId");
            var apbnKey = GetQueryString<string>("ApbnKey");
            return query.Where(t => t.ApbnKey == apbnKey && (t.ParentRegionId == parentId || t.RegionId == parentId));
        }
    }
}