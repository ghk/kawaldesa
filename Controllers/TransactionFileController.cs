using App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers
{
    public class TransactionFileController: BaseController<TransactionFile, long>
    {
        public TransactionFileController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<TransactionFile> ApplyQuery(IQueryable<TransactionFile> query)
        {
            var regionID = GetQueryString<long?>("RegionID");
            //TODO add RegionID to transaction file and user
            return query;
        }

    }
}