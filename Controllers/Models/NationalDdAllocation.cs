using App.Models;
using App.Utils.Excel;
using OfficeOpenXml;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace App.Controllers.Models
{
    public class NationalDdAllocationController : ReadOnlyController<NationalDdAllocation, long>
    {
        public NationalDdAllocationController(DB dbContext)
            : base(dbContext)
        {
            dbContext.Configuration.ProxyCreationEnabled = false;
        }

        protected override IQueryable<NationalDdAllocation> ApplyQuery(IQueryable<NationalDdAllocation> query)
        {
            return query;
        }

        [HttpGet]
        public HttpResponseMessage GetTemplate()
        {
            var regions = dbContext.Set<Region>().Where(r => r.Type == RegionType.KABUPATEN).ToList();
            var parentRegions = dbContext.Set<Region>().Where(r => r.Type == RegionType.PROPINSI).ToList();
            var allocations = new List<NationalDdAllocation>();
            return new AllocationExcelWriter<NationalDdAllocation>().Write(parentRegions, regions, allocations);
        }

    }
}