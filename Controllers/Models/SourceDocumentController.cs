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
    public class SourceDocumentController: BaseController<SourceDocument, long>
    {
        public SourceDocumentController(DB dbContext)
            : base(dbContext)
        {
            Include(e => e.File);
        }

        protected override IQueryable<SourceDocument> ApplyQuery(IQueryable<SourceDocument> query)
        {
            var orgId = GetQueryString<long?>("fkOrganizationId");
            if(orgId.HasValue) 
                query = query.Where(r => r.fkOrganizationId == orgId.Value);

            var type = GetQueryString<int?>("Type");
            if(type.HasValue) 
                query = query.Where(r => r.Type == (DocumentUploadType) type);

            var apbnKey = GetQueryString<string>("ApbnKey");
            if (!string.IsNullOrEmpty(apbnKey))
                query = query.Where(r => r.ApbnKey == apbnKey);

            var regionId = GetQueryString<string>("fkRegionId");
            if (!string.IsNullOrEmpty(regionId))
                query = query.Where(r => r.fkRegionId == regionId);

            var createdById = GetQueryString<string>("fkCreatedById");
            if (!string.IsNullOrEmpty(createdById))
                query = query.Where(r => r.fkCreatedById == createdById);

            query = query.OrderByDescending(o => o.DateCreated).Take(20);

            return query;
        }

        [HttpPost]
        [Authorize(Roles=Role.VOLUNTEER)]
        public void Upload(Multipart multipart, DocumentUploadType type, SourceDocumentFunction fn, string regionId, string apbnKey)
        {
            try
            {
                KawalDesaController.CheckRegionAllowed(dbContext, regionId);
                DocumentUploadType t = (DocumentUploadType)type;

                var region = dbContext.Set<Region>()
                    .Include(r => r.Parent)
                    .Include(r => r.Parent.Parent)
                    .Include(r => r.Parent.Parent.Parent)
                    .Include(r => r.Parent.Parent.Parent.Parent)
                    .First(r => r.Id == regionId);
                var apbn = dbContext.Set<Apbn>().First(a => a.Key == apbnKey);
                var user = KawalDesaController.GetCurrentUser();

                if (region.Type != RegionType.NASIONAL && region.Type != RegionType.KABUPATEN)
                    throw new ApplicationException("only allowed to upload on nasional or kabupaten");

                using (var tx = dbContext.Database.BeginTransaction())
                {
                    foreach (var fileResult in multipart.Files)
                    {
                        var blob = new Blob(fileResult);
                        dbContext.Set<Blob>().Add(blob);
                        dbContext.SaveChanges();
                        fileResult.Move(blob.FilePath);

                        var doc = new SourceDocument();
                        doc.FileName = blob.RelativeFileName;
                        doc.fkCreatedById = user.Id;
                        doc.fkOrganizationId = user.fkOrganizationId.Value;
                        doc.DateCreated = DateTime.Now;
                        doc.Type = type;
                        doc.Function = fn;
                        doc.ApbnKey = apbnKey;
                        doc.fkRegionId = regionId;
                        doc.fkFileId = blob.Id;
                        dbContext.Set<SourceDocument>().Add(doc);
                        dbContext.SaveChanges();
                    }

                    tx.Commit();
                }
            }
            finally
            {
                multipart.DeleteUnmoved();
            }
        }

    }
}