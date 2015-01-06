using App.Models;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace App.Controllers
{
    public class FieldReportController : ReadOnlyController<FieldReport, long>
    {
        public FieldReportController(DB dbContext) : base(dbContext) {
        }

        protected override IQueryable<FieldReport> ApplyQuery(IQueryable<FieldReport> query)
        {
            var realizationID = GetQueryString<long?>("RealizationID");
            return query.Where(f => f.fkRealizationID == realizationID.Value);
        }

        [HttpPost]
        [Authorize(Roles = Role.VOLUNTEER_REALIZATION)]
        public async Task AddFieldReport(Uploader uploader)
        {
            var res = uploader;
            try
            {
                var realizationID = long.Parse(res.Forms["RealizationID"]);
                var realization = dbContext.Set<Realization>()
                    .Include(r => r.Transaction)
                    .First(r => r.ID == realizationID);
                KawalDesaController.CheckRegionAllowed(dbContext, realization.Transaction.fkActorID);
                FieldReport fr = new FieldReport
                {
                    fkRealizationID = realizationID,
                    IsActivated = true,
                    Notes = res.Forms["Notes"],
                    Date = DateTime.ParseExact(res.Forms["Date"], "dd-MM-yyyy", CultureInfo.InvariantCulture),
                    Pictures = new List<Blob>(),
                };
                foreach(var file in res.Files)
                {
                    var blob = new Blob(file);
                    fr.Pictures.Add(blob);
                    file.Move(blob.FilePath);
                }
                dbSet.Add(fr);
                dbContext.SaveChanges();
            }
            finally
            {
                res.DeleteUnmoved();
            }
        }
    }
}