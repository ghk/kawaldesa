using App.Models;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class BaseTransferRecapitulationController<TRecapitulation> : ReadOnlyController<TRecapitulation, long>
        where TRecapitulation: BaseTransferRecapitulation, new()
    {
        public BaseTransferRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }

        protected override IQueryable<TRecapitulation> ApplyQuery(IQueryable<TRecapitulation> query)
        {
            var parentID = GetQueryString<string>("ParentID");
            return query.Where(t => t.ParentRegionId == parentID || t.RegionId == parentID);
        }
    }
    public class TransferRecapitulationController : BaseTransferRecapitulationController<TransferRecapitulation>
    {
        public TransferRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }
    }
    public class FrozenTransferRecapitulationController : BaseTransferRecapitulationController<FrozenTransferRecapitulation>
    {
        public FrozenTransferRecapitulationController(DB dbContext)
            : base(dbContext)
        {
        }
    }
}