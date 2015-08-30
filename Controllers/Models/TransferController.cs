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
    public class TransferController : ReadOnlyController<Transfer, long>
    {
        public TransferController(DB dbContext) : base(dbContext)
        {
        }

        protected override IQueryable<Transfer> ApplyQuery(IQueryable<Transfer> query)
        {
            var fkRegionId = GetQueryString<string>("fkRegionId");
            return query.Where(r => r.fkRegionId == fkRegionId && r.IsActivated);
        }

    }
}