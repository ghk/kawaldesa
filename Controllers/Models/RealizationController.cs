using App.Models;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class RealizationController : ReadOnlyController<Realization, long>
    {
        public RealizationController(DB dbContext) : base(dbContext) {
        }

        /*
        protected override IQueryable<Realization> ApplyQuery(IQueryable<Realization> query)
        {
            var accountId = GetQueryString<long?>("AccountId");
            return query.Where(t => t.Transaction.fkAccountId == accountId.Value);
        }
        */
    }
}