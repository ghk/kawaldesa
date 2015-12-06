using App.Models;
using App.Models.Bundles;
using App.Models.Views;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace App.Controllers.Services
{
    [Service]
    public class BundleController : ApiController
    {
        private DB db;
        public BundleController(DB db)
        {
            db.Configuration.ProxyCreationEnabled = false;
            this.db = db;
        }

        private Region GetRegion(String regionId)
        {
            return db.Regions
                .Include(r => r.Parent.Parent)
                .Include(r => r.Parent.Parent.Parent)
                .Include(r => r.Parent.Parent.Parent.Parent)
                .FirstOrDefault(r => r.Id == regionId);
        }

        public TransferBundle GetInScopeTransferBundle(string apbnKey)
        {
            var region = GetRegion("0");

            var result = new TransferBundle
            {
                Region = region,
            };

            var scopedRegionIds = db.Regions.Where(r => r.IsInScope).Select(r => r.Id).ToList();

            result.TransferRecapitulations = db.TransferRecapitulations
                .Where(r => r.ApbnKey == apbnKey && (scopedRegionIds.Contains(r.RegionId)))
                .ToList();
            var total = new TransferRecapitulation
            {
                ApbnKey = apbnKey,
                RegionId = "0",
                RegionName = region.Name
            };
            foreach(var recap in result.TransferRecapitulations)
            {
                total.BudgetedDd += recap.BudgetedDd;
                total.BudgetedAdd += recap.BudgetedAdd;
                total.BudgetedBhpr += recap.BudgetedBhpr;
            }
            result.TransferRecapitulations.Add(total);

            result.TransferProgress = db.TransferProgresses
                .Where(r => r.ApbnKey == apbnKey && (scopedRegionIds.Contains(r.RegionId)))
                .ToList();
            result.TransferRecapitulations.Add(total);

            return result;
        }

        public TransferBundle GetTransferBundle(String apbnKey, String regionId)
        {
            //if (KawalDesaController.GetCurrentUser() == null &&regionId == "0")
            //    return GetInScopeTransferBundle(apbnKey);
            var region = GetRegion(regionId);

            var result = new TransferBundle
            {
                Region = region
            };

            if(region.Type < RegionType.DESA)
            {
                result.TransferRecapitulations = db.TransferRecapitulations
                    .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                    .ToList();
            } else
            {
                string syear = apbnKey;
                if (apbnKey.Length > 4)
                    syear = apbnKey.Substring(0, 4);
                int year = Convert.ToInt32(syear);
                result.Transfers = db.Transfers
                    .Include(e => e.SourceDocuments)
                    .Where(e => e.Year == year && e.IsActivated && e.fkRegionId == regionId)
                    .ToList();
            }

            result.TransferProgress = db.TransferProgresses
                .Where(r => r.RegionId == regionId && r.ApbnKey == apbnKey)
                .ToList();


            return result;
        }

        public AllocationBundle GetAllocationBundle(String subtype, string apbnKey, String regionId)
        {
            var region = GetRegion(regionId);

            var type = DocumentUploadType.NationalDd;
            switch (subtype)
            {
                case "dd":
                    type = region.Type < RegionType.KABUPATEN
                        ? DocumentUploadType.NationalDd
                        : DocumentUploadType.RegionalDd;
                    break;
                case "add":
                    type = region.Type < RegionType.KABUPATEN
                        ? DocumentUploadType.NationalAdd
                        : DocumentUploadType.RegionalAdd;
                    break;
                case "bhpr":
                    type = region.Type < RegionType.KABUPATEN
                        ? DocumentUploadType.NationalBhpr
                        : DocumentUploadType.RegionalBhpr;
                    break;
                default:
                    throw new ApplicationException("unsupported type: " + type);
            }
            
            var spreadsheet = db.Spreadsheets
                .Include(e => e.CreatedBy)
                .Include(e => e.Organization)
                .FirstOrDefault(d => d.Type == type && d.fkRegionId == regionId && d.ApbnKey == apbnKey && d.IsActivated);
            var sourceDocuments = db.SourceDocument
                .Include(e => e.File)
                .Where(d => d.Type == type && d.fkRegionId == regionId && d.ApbnKey == apbnKey)
                .ToList();

            var result = new AllocationBundle
            {
                Region = region,
                CurrentSpreadsheet = spreadsheet,
                SourceDocuments = sourceDocuments
            };

            switch (type)
            {
                case DocumentUploadType.NationalDd:
                    result.NationalDdRecapitulations = db.NationalDdRecapitulations
                        .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                        .ToList();
                    break;
                case DocumentUploadType.RegionalDd:
                    result.RegionalDdRecapitulations = db.RegionalDdRecapitulations
                        .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                        .ToList();
                    break;
                case DocumentUploadType.NationalAdd:
                    result.NationalAddRecapitulations = db.NationalAddRecapitulations
                        .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                        .ToList();
                    break;
                case DocumentUploadType.RegionalAdd:
                    result.RegionalAddRecapitulations = db.RegionalAddRecapitulations
                        .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                        .ToList();
                    break;
                case DocumentUploadType.NationalBhpr:
                    result.NationalBhprRecapitulations = db.NationalBhprRecapitulations
                        .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                        .ToList();
                    break;
                case DocumentUploadType.RegionalBhpr:
                    result.RegionalBhprRecapitulations = db.RegionalBhprRecapitulations
                        .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                        .ToList();
                    break;
            }

            return result;
        }

    }
}