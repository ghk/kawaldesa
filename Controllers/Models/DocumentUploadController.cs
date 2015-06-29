using App.Models;
using App.Utils.Excel;
using OfficeOpenXml;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace App.Controllers.Models
{
    public class DocumentUploadController: BaseController<DocumentUpload, long>
    {
        private IDictionary<DocumentUploadType, IDocumentUploadAdapter> adapters = new Dictionary<DocumentUploadType, IDocumentUploadAdapter>();
        public DocumentUploadController(DB dbContext)
            : base(dbContext)
        {
            adapters[DocumentUploadType.NationalDd] = new NationalDocumentUploadAdapter<NationalDdAllocation>() 
            { 
                DbContext = dbContext,
                Init = (allocation) =>
                {
                    allocation.fkApbnId = dbContext.Set<Apbn>().FirstOrDefault(a => a.Key == "2015p").Id;
                },
            };
        }
        protected override IQueryable<DocumentUpload> ApplyQuery(IQueryable<DocumentUpload> query)
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

            return query;
        }

        [HttpGet]
        public DocumentUpload GetActive(int type, string regionId, string apbnKey)
        {
            return dbSet.FirstOrDefault(d => d.Type == (DocumentUploadType)type && d.fkRegionId == regionId && d.ApbnKey == apbnKey && d.IsActivated);
        }

        [HttpGet]
        public HttpResponseMessage GetTemplate(int type, string regionId, string apbnKey)
        {
            DocumentUploadType t = (DocumentUploadType)type;
            return adapters[t].GetTemplate(regionId);
        }

        [HttpPost]
        [Authorize(Roles=Role.VOLUNTEER_ALLOCATION)]
        public void Upload(Multipart<DocumentUpload> multipart, int type, string regionId, string apbnKey)
        {
            KawalDesaController.CheckRegionAllowed(dbContext, regionId);
            DocumentUploadType t = (DocumentUploadType)type;
            adapters[t].Upload(multipart, t, regionId, apbnKey);
        }

        public interface IDocumentUploadAdapter
        {
            HttpResponseMessage GetTemplate(string regionId);
            void Upload(Multipart<DocumentUpload> multipart, DocumentUploadType docType, string regionId, string apbnKey);
        }

        public class NationalDocumentUploadAdapter<TAllocation>: IDocumentUploadAdapter where TAllocation: class, IAllocation, new()
        {
            public DbContext DbContext { get; set; }
            public Action<TAllocation> Init { get; set; }
            public HttpResponseMessage GetTemplate(string regionId)
            {
                var regions = DbContext.Set<Region>().Where(r => r.Type == RegionType.KABUPATEN).ToList();
                var parentRegions = DbContext.Set<Region>().Where(r => r.Type == RegionType.PROPINSI).ToList();
                var allocations = DbContext.Set<TAllocation>().Where(r => r.IsActivated).ToList();
                return new AllocationExcelWriter<TAllocation>().Write(parentRegions, regions, allocations);
            }

            public void Upload(Multipart<DocumentUpload> multipart, DocumentUploadType docType, string regionId, string apbnKey)
            {
            try
            {
                var regions = DbContext.Set<Region>().Where(r => r.Type == RegionType.KABUPATEN).ToList();
                var allocations = new AllocationExcelReader<TAllocation>().Read(regions, new FileInfo(multipart.Files[0].FilePath));
                var upload = multipart.Entity;
                var user = KawalDesaController.GetCurrentUser();

                var fileResult = multipart.Files[0];
                var blob = new Blob(fileResult);
                DbContext.Set<Blob>().Add(blob);
                DbContext.SaveChanges();
                fileResult.Move(blob.FilePath);

                upload.FileName = blob.RelativeFileName;
                upload.fkCreatedById = user.Id;
                upload.fkOrganizationId = user.fkOrganizationId.Value;
                upload.fkRegionId = regionId;
                upload.DateCreated = DateTime.Now;
                upload.DateActivated = DateTime.Now;
                upload.Type = docType;
                upload.ApbnKey = apbnKey;
                upload.fkRegionId = regionId;
                upload.fkFileId = blob.Id;
                DbContext.Set<DocumentUpload>().Add(upload);
                DbContext.SaveChanges();

                foreach(var allocation in allocations)
                {
                    allocation.fkDocumentUploadId = upload.Id;
                    Init(allocation);
                    DbContext.Set<TAllocation>().Add(allocation);
                }
                DbContext.SaveChanges();

                new DocumentUploadActivator<TAllocation>().Activate(DbContext, upload);
            }
            finally
            {
                multipart.DeleteUnmoved();
            }
            }
        }
    }
}