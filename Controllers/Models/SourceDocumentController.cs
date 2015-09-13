using App.Models;
using App.Utils;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace App.Controllers.Models
{
    public class SourceDocumentController: BaseController<SourceDocument, long>
    {
        private DumpMessager dumpMessager;
        public SourceDocumentController(DB dbContext, DumpMessager dumpMessager)
            : base(dbContext)
        {
            this.dumpMessager = dumpMessager;
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
        public void Upload(Multipart<Transfer> multipart, DocumentUploadType type, SourceDocumentFunction fn, string regionId, string apbnKey)
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

                //if (region.Type != RegionType.NASIONAL && region.Type != RegionType.KABUPATEN)
                //    throw new ApplicationException("only allowed to upload on nasional or kabupaten");

                using (var tx = dbContext.Database.BeginTransaction())
                {
                    Transfer transfer = multipart.Entity;
                    if(transfer != null)
                    {
                        ModelState.Clear();
                        Validate(transfer);
                        if (!ModelState.IsValid)
                            throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));
                        transfer.IsActivated = true;
                        transfer.fkRegionId = regionId;
                        transfer.Year = Convert.ToInt32(apbnKey.Substring(0, 4));
                        dbContext.Set<Transfer>().Add(transfer);
                        dbContext.SaveChanges();
                        dumpMessager.Message("p " + apbnKey + " " + regionId);
                    } 
                    if(fn == SourceDocumentFunction.Allocation) {
                        string stype = null;
                        switch (type)
                        {
                            case DocumentUploadType.NationalDd:
                            case DocumentUploadType.RegionalDd:
                                stype = "dd";
                                break;
                            case DocumentUploadType.NationalAdd:
                            case DocumentUploadType.RegionalAdd:
                                stype = "add";
                                break;
                            case DocumentUploadType.NationalBhpr:
                            case DocumentUploadType.RegionalBhpr:
                                stype = "bhpr";
                                break;

                        }
                        if (stype == null)
                            throw new ApplicationException("invalid doc type: " + type);
                        dumpMessager.Message(stype+" " + apbnKey + " " + regionId);
                    }


                    foreach (var fileResult in multipart.Files)
                    {
                        var blob = new Blob(fileResult);
                        dbContext.Set<Blob>().Add(blob);
                        dbContext.SaveChanges();
                        fileResult.Move(blob.FilePath);

                        var doc = new SourceDocument();
                        doc.ThumbnailCreated = false;
                        doc.FileName = blob.RelativeFileName;
                        doc.fkCreatedById = user.Id;
                        doc.fkOrganizationId = user.fkOrganizationId.Value;
                        doc.DateCreated = DateTime.Now;
                        doc.Type = type;
                        doc.Function = fn;
                        doc.ApbnKey = apbnKey;
                        doc.fkRegionId = regionId;
                        doc.fkFileId = blob.Id;

                        if(transfer != null)
                        {
                            doc.fkTransferId = transfer.Id;
                        }

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