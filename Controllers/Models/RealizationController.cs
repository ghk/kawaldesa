using App.Models;
using Scaffold;
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

        protected override IQueryable<Realization> ApplyQuery(IQueryable<Realization> query)
        {
            var accountID = GetQueryString<long?>("AccountID");
            return query.Where(t => t.Transaction.fkAccountId == accountID.Value);
        }
    }
}