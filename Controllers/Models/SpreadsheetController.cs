using App.Models;
using App.Utils;
using App.Utils.Spreadsheets;
using OfficeOpenXml;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace App.Controllers.Models
{
    public class SpreadsheetController: BaseController<Spreadsheet, long>
    {
        private IDictionary<DocumentUploadType, IDocumentUploadAdapter> adapters = new Dictionary<DocumentUploadType, IDocumentUploadAdapter>();
        public SpreadsheetController(DB dbContext)
            : base(dbContext)
        {
            Include(d => d.Organization);
            Include(d => d.CreatedBy);
            Include(d => d.Region);
            adapters[DocumentUploadType.NationalDd] = new NationalDocumentUploadAdapter<NationalDdAllocation>() 
            { 
                DbContext = dbContext,
                Init = (context, allocation) =>
                {
                    allocation.fkApbnId = context.Apbn.Id;
                },
            };
            adapters[DocumentUploadType.RegionalDd] = new NationalDocumentUploadAdapter<RegionalDdAllocation>() 
            { 
                DbContext = dbContext,
                Init = (context, allocation) =>
                {
                    allocation.fkApbdId = dbContext.Set<Apbd>().FirstOrDefault(a => a.fkApbnId == context.Apbn.Id && a.fkRegionId == context.Region.Id).Id;
                },
            };
            adapters[DocumentUploadType.NationalAdd] = new NationalDocumentUploadAdapter<NationalAddAllocation>() 
            { 
                DbContext = dbContext,
                Init = (context, allocation) =>
                {
                    allocation.fkApbdId = dbContext.Set<Apbd>().FirstOrDefault(a => a.fkApbnId == context.Apbn.Id && a.fkRegionId == allocation.fkRegionId).Id;
                },
            };
            adapters[DocumentUploadType.RegionalAdd] = new NationalDocumentUploadAdapter<RegionalAddAllocation>() 
            { 
                DbContext = dbContext,
                Init = (context, allocation) =>
                {
                    allocation.fkApbdId = dbContext.Set<Apbd>().FirstOrDefault(a => a.fkApbnId == context.Apbn.Id && a.fkRegionId == context.Region.Id).Id;
                },
            };
            adapters[DocumentUploadType.NationalBhpr] = new NationalDocumentUploadAdapter<NationalBhprAllocation>() 
            { 
                DbContext = dbContext,
                Init = (context, allocation) =>
                {
                    allocation.fkApbdId = dbContext.Set<Apbd>().FirstOrDefault(a => a.fkApbnId == context.Apbn.Id && a.fkRegionId == allocation.fkRegionId).Id;
                },
            };
            adapters[DocumentUploadType.RegionalBhpr] = new NationalDocumentUploadAdapter<RegionalBhprAllocation>() 
            { 
                DbContext = dbContext,
                Init = (context, allocation) =>
                {
                    allocation.fkApbdId = dbContext.Set<Apbd>().FirstOrDefault(a => a.fkApbnId == context.Apbn.Id && a.fkRegionId == context.Region.Id).Id;
                },
            };
        }
        protected override IQueryable<Spreadsheet> ApplyQuery(IQueryable<Spreadsheet> query)
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

        [HttpGet]
        public Spreadsheet GetActive(int type, string regionId, string apbnKey)
        {
            return dbSet
                .Include(e => e.CreatedBy)
                .Include(e => e.Organization)
                .FirstOrDefault(d => d.Type == (DocumentUploadType)type && d.fkRegionId == regionId && d.ApbnKey == apbnKey && d.IsActivated);
        }

        [HttpGet]
        public HttpResponseMessage GetTemplate(int type, string regionId, string apbnKey)
        {
            DocumentUploadType t = (DocumentUploadType)type;
            var context = new AdapterContext(dbContext, t, regionId, apbnKey);
            return adapters[t].GetTemplate(context);
        }

        //file name: e.g: DD 2015p 0 Nasional.xlsx
        [HttpGet]
        public String GetCurrentSheetUrl(DocumentUploadType type, string regionId, string apbnKey)
        {
            User user = KawalDesaController.GetCurrentUser();

            var context = new AdapterContext(dbContext, type, regionId, apbnKey);
            
            var region = dbContext.Set<Region>().Find(regionId);

            String userId = user != null ? user.Id : null;
            String userEmail = user != null ? user.Email : null;
            String userName = user != null ? user.Name : "Anonymous";

            var workItem = dbContext.Set<SpreadsheetWorkItem>()
                .FirstOrDefault(w => w.fkUserId == userId
                    && w.fkRegionId == region.Id
                    && w.Type == type
                    && w.ApbnKey == context.Apbn.Key);

            if (workItem == null)
            {
                using (var tx = dbContext.Database.BeginTransaction())
                {
                    var typeStr = type.ToString();
                    typeStr = typeStr.Replace("National", "");
                    typeStr = typeStr.Replace("Regional", "");
                    typeStr = typeStr.ToUpper();

                    var root = HttpContext.Current.Server.MapPath("~/Content/sheets");
                    Directory.CreateDirectory(root);
                    var safeFileName = typeStr + " " + apbnKey + " " + regionId + " " + region.Name + ".xlsx";
                    var fullPath = Path.Combine(root, safeFileName);
                    var bytes = adapters[type].GetBytes(context);
                    File.WriteAllBytes(fullPath, bytes);

                    var authEmail = ConfigurationManager.AppSettings["Drive.AuthEmail"];
                    var authKey = ConfigurationManager.AppSettings["Drive.AuthKey"];
                    var parentDir = ConfigurationManager.AppSettings["Drive.ParentDir"];
                    var driveUtils = new DriveUtils(authEmail, authKey, parentDir);

                    var workDir = dbContext.Set<SpreadsheetWorkDir>().FirstOrDefault(
                        d => d.fkUserId == userId);

                    if (workDir == null)
                    {
                        var dirName = string.Format("KawalDesa Sheets - ({0})", userName);
                        workDir = new SpreadsheetWorkDir()
                        {
                            GoogleSheetId = driveUtils.CreateParentDirectory(userEmail, dirName),
                            fkUserId = userId
                        };
                        dbContext.Set<SpreadsheetWorkDir>().Add(workDir);
                        dbContext.SaveChanges();
                    }

                    workItem = new SpreadsheetWorkItem()
                    {
                        GoogleSheetId = driveUtils.UploadFile(workDir.GoogleSheetId, fullPath, safeFileName),
                        fkUserId = userId,
                        fkRegionId = region.Id,
                        ApbnKey = apbnKey,
                        Type = type
                    };
                    dbContext.Set<SpreadsheetWorkItem>().Add(workItem);
                    dbContext.SaveChanges();

                    tx.Commit();
                }
            }

            //string fullyQualifiedUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority);
            //return fullyQualifiedUrl + "/Content/sheets/" + safeFileName;
            return "https://docs.google.com/spreadsheets/d/" + workItem.GoogleSheetId;
        }

        [HttpPost]
        [Authorize(Roles=Role.VOLUNTEER_ALLOCATION)]
        public void Upload(Multipart<Spreadsheet> multipart, int type, string regionId, string apbnKey)
        {
            KawalDesaController.CheckRegionAllowed(dbContext, regionId);
            DocumentUploadType t = (DocumentUploadType)type;
            var context = new AdapterContext(dbContext, t, regionId, apbnKey);
            if (context.Region.Type != RegionType.NASIONAL && context.Region.Type != RegionType.KABUPATEN)
                throw new ApplicationException("only allowed to upload on nasional or kabupaten");

            using (var tx = dbContext.Database.BeginTransaction())
            {
                adapters[t].Upload(multipart, context);
                tx.Commit();
            }
        }

        [HttpGet]
        public void Publish(string googleSheetId, string notes)
        {
            var workItem = dbContext.Set<SpreadsheetWorkItem>()
               .FirstOrDefault(w => w.GoogleSheetId == googleSheetId);

            var authEmail = ConfigurationManager.AppSettings["Drive.AuthEmail"];
            var authKey = ConfigurationManager.AppSettings["Drive.AuthKey"];
            var parentDir = ConfigurationManager.AppSettings["Drive.ParentDir"];

            DriveUtils utils = new DriveUtils(authEmail, authKey, parentDir);

            var fileStream = utils.GetFileStream(googleSheetId);

            if (fileStream == null)
                return;

            var documentUploadType = (DocumentUploadType)workItem.Type;
            var context = new AdapterContext(dbContext, (DocumentUploadType)workItem.Type, workItem.fkRegionId, workItem.ApbnKey);

            using (var tx = dbContext.Database.BeginTransaction())
            {
                adapters[documentUploadType].Publish(fileStream, context, notes);
                tx.Commit();
            }
        }

        [HttpGet]
        [Authorize(Roles=Role.ADMIN)]
        public void GenerateDanaDesaKabs(string apbnKey)
        {
            if (!HttpContext.Current.IsDebuggingEnabled)
                throw new ApplicationException("this is a debug only feature");

            GenDanaDesaKab(dbContext, apbnKey);
        }

        public static void GenDanaDesaKab(DbContext dbContext, String apbnKey)
        {
            var kabs = dbContext.Set<Region>().Where(r => r.Type == RegionType.KABUPATEN).ToList();
            var existing = dbContext.Set<Spreadsheet>().Where(r => r.Type == DocumentUploadType.RegionalDd && r.ApbnKey == apbnKey && r.IsActivated);
            var existingIds = new HashSet<string>(existing.Select(e => e.fkRegionId));
            kabs = kabs.Where(k => !existingIds.Contains(k.Id)).ToList();
            var apbn = dbContext.Set<Apbn>().First(a => a.Key == apbnKey);
            int i = 0;
            foreach(var kab in kabs)
            {
                String log = String.Format("kab {0} - {1} of {2}", kab.Name, i, kabs.Count);
                File.AppendAllLines("D:\\Work\\kawaldesa.log", new String[]{log});
                var apbd = dbContext.Set<Apbd>().First(a => a.fkApbnId == apbn.Id && a.fkRegionId == kab.Id);
                var nationalAlloc = dbContext.Set<NationalDdAllocation>().FirstOrDefault(r => r.IsActivated && r.fkRegionId == kab.Id && r.fkApbnId == apbn.Id);
                if(nationalAlloc != null)
                {
                    var nationalDoc = dbContext.Set<Spreadsheet>().First(d => d.Id == nationalAlloc.fkSpreadsheetId);
                    GenDanaDesaKab(dbContext, apbd, kab, nationalAlloc, nationalDoc);
                }
                i++;
            }
        }

        private static void GenDanaDesaKab(DbContext dbContext, Apbd apbd, Region region, NationalDdAllocation nationalAlloc, Spreadsheet nationalDoc)
        {
            var regions = dbContext.Set<Region>().Where(r => r.Type == RegionType.DESA && !r.IsKelurahan && r.Parent.fkParentId == region.Id).ToList();
            var parentRegions = dbContext.Set<Region>().Where(r => r.Type == RegionType.KECAMATAN && r.fkParentId == region.Id).ToList();

            if(regions.Count == 0)
                return;

            decimal total = nationalAlloc.Dd ?? 0;
            decimal amountPerDes = total * 9 / (regions.Count * 10);
            var regionAllocs = new List<RegionalDdAllocation>();
            foreach(var child in regions)
            {
                var regionAlloc = new RegionalDdAllocation();
                regionAlloc.fkApbdId = apbd.Id;
                regionAlloc.fkRegionId = child.Id;
                regionAlloc.No = child.Id;
                regionAlloc.RegionName = child.Name;
                regionAlloc.BaseAllocation = amountPerDes;
                regionAlloc.Dd = amountPerDes;
                regionAllocs.Add(regionAlloc);
            }
            var fileBytes = new AllocationSpreadsheetWriter<RegionalDdAllocation>().WriteToBytes(parentRegions, regions, regionAllocs);

            var blob = new Blob();
            blob.Name = "Alokasi.xlsx";
            dbContext.Set<Blob>().Add(blob);
            dbContext.SaveChanges();
            File.WriteAllBytes(blob.FilePath, fileBytes);

            Spreadsheet spreadsheet = new Spreadsheet();
            spreadsheet.fkCreatedById = nationalDoc.fkCreatedById;
            spreadsheet.fkOrganizationId = nationalDoc.fkOrganizationId;
            spreadsheet.DateCreated = DateTime.Now;
            spreadsheet.DateActivated = DateTime.Now;
            spreadsheet.Type = DocumentUploadType.RegionalDd;
            spreadsheet.ApbnKey = nationalDoc.ApbnKey;
            spreadsheet.fkRegionId = region.Id;
            spreadsheet.Notes = "Alokasi Dasar 90%";
            spreadsheet.DocumentName = "Alokasi Dasar 90% APBN-P 2015";
            spreadsheet.FileName = blob.RelativeFileName;
            spreadsheet.fkFileId = blob.Id;
            dbContext.Set<Spreadsheet>().Add(spreadsheet);
            dbContext.SaveChanges();


            foreach(var regionAlloc in regionAllocs)
            {
                regionAlloc.fkSpreadsheetId = spreadsheet.Id;
                dbContext.Set<RegionalDdAllocation>().Add(regionAlloc);
            }
            dbContext.SaveChanges();

            new SpreadsheetActivator<RegionalDdAllocation>().Activate(dbContext, spreadsheet);
        }

        public interface IDocumentUploadAdapter
        {
            HttpResponseMessage GetTemplate(AdapterContext context);
            byte[] GetBytes(AdapterContext context);

            void Publish(Stream fileStream, AdapterContext context, string notes);

            void Upload(Multipart<Spreadsheet> multipart, AdapterContext context);
        }

        public class AdapterContext
        {
            public Region Region { get; set; }
            public Apbn Apbn { get; set; }
            public DocumentUploadType Type { get; set; }

            public AdapterContext(DbContext dbContext, DocumentUploadType type, string regionId, string apbnKey)
            {
                this.Type = type;
                this.Region = dbContext.Set<Region>()
                    .Include(r => r.Parent)
                    .Include(r => r.Parent.Parent)
                    .Include(r => r.Parent.Parent.Parent)
                    .Include(r => r.Parent.Parent.Parent.Parent)
                    .First(r => r.Id == regionId);
                this.Apbn = dbContext.Set<Apbn>().First(a => a.Key == apbnKey);
            }
        }

        public class NationalDocumentUploadAdapter<TAllocation>: IDocumentUploadAdapter where TAllocation: class, IAllocation, new()
        {
            public DbContext DbContext { get; set; }
            public Action<AdapterContext, TAllocation> Init { get; set; }

            public HttpResponseMessage GetTemplate(AdapterContext context)
            {
                List<Region> regions = null;
                List<Region> parentRegions = null;
                if(context.Region.Type == RegionType.NASIONAL)
                {
                    regions = DbContext.Set<Region>().Where(r => r.Type == RegionType.KABUPATEN).ToList();
                    parentRegions = DbContext.Set<Region>().Where(r => r.Type == RegionType.PROPINSI).ToList();
                }
                else
                {
                    regions = DbContext.Set<Region>().Where(r => r.Type == RegionType.DESA && r.Parent.fkParentId == context.Region.Id).ToList();
                    parentRegions = DbContext.Set<Region>().Where(r => r.Type == RegionType.KECAMATAN && r.fkParentId == context.Region.Id).ToList();
                }
                var allocations = DbContext.Set<TAllocation>().Where(r => r.IsActivated).ToList();
                return new AllocationSpreadsheetWriter<TAllocation>().Write(parentRegions, regions, allocations);
            }
            
            public byte[] GetBytes(AdapterContext context)
            {
                List<Region> regions = null;
                List<Region> parentRegions = null;
                if(context.Region.Type == RegionType.NASIONAL || context.Region.Type == RegionType.PROPINSI)
                {
                    regions = DbContext.Set<Region>().Where(r => r.Type == RegionType.KABUPATEN).ToList();
                    parentRegions = DbContext.Set<Region>().Where(r => r.Type == RegionType.PROPINSI).ToList();
                }
                else
                {
                    regions = DbContext.Set<Region>().Where(r => r.Type == RegionType.DESA && r.Parent.fkParentId == context.Region.Id).ToList();
                    parentRegions = DbContext.Set<Region>().Where(r => r.Type == RegionType.KECAMATAN && r.fkParentId == context.Region.Id).ToList();
                }
                var allocations = DbContext.Set<TAllocation>().Where(r => r.IsActivated).ToList();
                return new AllocationSpreadsheetWriter<TAllocation>().WriteToBytes(parentRegions, regions, allocations);
            }

            public void Publish(Stream fileStream, AdapterContext context, string notes)
            {
                try
                {
                    List<Region> regions = null;
                    if (context.Region.Type == RegionType.NASIONAL)
                    {
                        regions = DbContext.Set<Region>().Where(r => r.Type == RegionType.KABUPATEN).ToList();
                    }
                    else
                    {
                        regions = DbContext.Set<Region>().Where(r => r.Type == RegionType.DESA && r.Parent.fkParentId == context.Region.Id).ToList();
                    }

                    Blob blob = new Blob();
                    blob.Name = "Alocation_xxx.xlsx";

                    DbContext.Set<Blob>().Add(blob);
                    DbContext.SaveChanges();

                    byte[] fileBytes = null;
                    using (MemoryStream ms = new MemoryStream())
                    {
                        fileStream.CopyTo(ms);
                        fileBytes = ms.ToArray();
                    }

                    string fileName = blob.Id + ".xlsx";
                    string root = HttpContext.Current.Server.MapPath("~/Content/Files");
                    var user = KawalDesaController.GetCurrentUser();

                    Directory.CreateDirectory(root);
                    String filePath = Path.Combine(root, fileName);
                    File.WriteAllBytes(filePath, fileBytes);

                    Spreadsheet spreadsheet = new Spreadsheet();
                    spreadsheet.File = blob;
                    spreadsheet.Notes = notes;
                    spreadsheet.fkCreatedById = user.Id;
                    spreadsheet.fkOrganizationId = user.fkOrganizationId.Value;
                    spreadsheet.DateCreated = DateTime.Now;
                    spreadsheet.DateActivated = DateTime.Now;
                    spreadsheet.Type = context.Type;
                    spreadsheet.ApbnKey = context.Apbn.Key;
                    spreadsheet.fkRegionId = context.Region.Id;
                    spreadsheet.fkFileId = blob.Id;
                    DbContext.Set<Spreadsheet>().Add(spreadsheet);
                    DbContext.SaveChanges();

                    var allocations = new AllocationSpreadsheetReader<TAllocation>().Read(regions, fileBytes);

                    foreach (var allocation in allocations)
                    {
                        allocation.fkSpreadsheetId = spreadsheet.Id;
                        Init(context, allocation);
                        DbContext.Set<TAllocation>().Add(allocation);
                    }
                    DbContext.SaveChanges();

                    new SpreadsheetActivator<TAllocation>().Activate(DbContext, spreadsheet);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            public void Upload(Multipart<Spreadsheet> multipart, AdapterContext context)
            {
                try
                {
                    List<Region> regions = null;
                    if(context.Region.Type == RegionType.NASIONAL)
                    {
                        regions = DbContext.Set<Region>().Where(r => r.Type == RegionType.KABUPATEN).ToList();
                    }
                    else
                    {
                        regions = DbContext.Set<Region>().Where(r => r.Type == RegionType.DESA && r.Parent.fkParentId == context.Region.Id).ToList();
                    }
                   
                    var allocations = new AllocationSpreadsheetReader<TAllocation>().Read(regions, new FileInfo(multipart.Files[0].FilePath));
                    var spreadsheet = multipart.Entity;
                    var user = KawalDesaController.GetCurrentUser();

                    var fileResult = multipart.Files[0];
                    var blob = new Blob(fileResult);
                    DbContext.Set<Blob>().Add(blob);
                    DbContext.SaveChanges();
                    fileResult.Move(blob.FilePath);

                    spreadsheet.FileName = blob.RelativeFileName;
                    spreadsheet.fkCreatedById = user.Id;
                    spreadsheet.fkOrganizationId = user.fkOrganizationId.Value;
                    spreadsheet.DateCreated = DateTime.Now;
                    spreadsheet.DateActivated = DateTime.Now;
                    spreadsheet.Type = context.Type;
                    spreadsheet.ApbnKey = context.Apbn.Key;
                    spreadsheet.fkRegionId = context.Region.Id;
                    spreadsheet.fkFileId = blob.Id;
                    DbContext.Set<Spreadsheet>().Add(spreadsheet);
                    DbContext.SaveChanges();

                    foreach(var allocation in allocations)
                    {
                        allocation.fkSpreadsheetId = spreadsheet.Id;
                        Init(context, allocation);
                        DbContext.Set<TAllocation>().Add(allocation);
                    }
                    DbContext.SaveChanges();

                    new SpreadsheetActivator<TAllocation>().Activate(DbContext, spreadsheet);
                }
                finally
                {
                    multipart.DeleteUnmoved();
                }
            }
        }
    }
}