using App.Models;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace App.Controllers.Models
{
    public class FieldReportController : ReadOnlyController<FieldReport, long>
    {
        public FieldReportController(DB dbContext) : base(dbContext) {
        }

        protected override IQueryable<FieldReport> ApplyQuery(IQueryable<FieldReport> query)
        {
            var realizationId = GetQueryString<long?>("RealizationId");
            return query.Where(f => f.fkRealizationId == realizationId.Value);
        }

        [HttpPost]
        [Authorize(Roles = Role.VOLUNTEER_REALIZATION)]
        public void AddFieldReport(Multipart uploader)
        {
            try
            {
                var realizationId = long.Parse(uploader.Forms["RealizationId"]);
                /*
                var realization = dbContext.Set<Realization>()
                    .Include(r => r.Transaction)
                    .First(r => r.Id == realizationId);
                    */
                //KawalDesaController.CheckRegionAllowed(dbContext, realization.Transaction.fkActorId);
                FieldReport fr = new FieldReport
                {
                    fkRealizationId = realizationId,
                    IsActivated = true,
                    Notes = uploader.Forms["Notes"],
                    Date = DateTime.ParseExact(uploader.Forms["Date"], "dd-MM-yyyy", CultureInfo.InvariantCulture),
                    Pictures = new List<Blob>()
                };
                foreach (var file in uploader.Files)
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
                uploader.DeleteUnmoved();
            }
        }

        public IQueryable<List<Blob>> GetPicture(long realizationId)
        {
            return dbSet.Where(t => t.fkRealizationId == realizationId)
                .Select(t => t.Pictures);
        }
    }
}