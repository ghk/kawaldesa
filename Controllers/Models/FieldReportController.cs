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

namespace App.Controllers.Models
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
        public void AddFieldReport(Multipart uploader)
        {
            try
            {
                var realizationID = long.Parse(uploader.Forms["RealizationID"]);
                var realization = dbContext.Set<Realization>()
                    .Include(r => r.Transaction)
                    .First(r => r.ID == realizationID);
                KawalDesaController.CheckRegionAllowed(dbContext, realization.Transaction.fkActorID);
                FieldReport fr = new FieldReport
                {
                    fkRealizationID = realizationID,
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

        public IQueryable<List<Blob>> GetPicture(long realizationID)
        {
            return dbSet.Where(t => t.fkRealizationID == realizationID)
                .Select(t => t.Pictures);
        }
    }
}