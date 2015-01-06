using App.Models;
using OfficeOpenXml;
using Scaffold;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace App.Controllers
{
    public class APBDFileController: BaseController<APBDFile, long>
    {
        public APBDFileController(DB dbContext)
            : base(dbContext)
        {
        }

        public void PostFile(Uploader uploader)
        {
            try
            {
                var fileResult = uploader.Files[0];
                var blob = new Blob(fileResult);
                dbContext.Set<Blob>().Add(blob);

                foreach(var existingAPBDFile in dbContext.Set<APBDFile>().Where(a => a.IsActivated))
                {
                    existingAPBDFile.IsActivated = false;
                    dbContext.Entry(existingAPBDFile).State = System.Data.Entity.EntityState.Modified;
                }

                
                foreach(var existingAPBD in dbContext.Set<APBD>().Where(a => a.IsActivated))
                {
                    existingAPBD.IsActivated = false;
                    dbContext.Entry(existingAPBD).State = System.Data.Entity.EntityState.Modified;
                }


                APBDFile apbdFile = new APBDFile()
                {
                    FileName = blob.Name,
                    fkFileID = blob.ID,
                    IsActivated = true,
                };
                dbContext.Set<APBDFile>().Add(apbdFile);

                var provinces = dbContext.Set<Region>().Where(r => r.Type == RegionType.PROPINSI).ToList();
                var kabupatens = dbContext.Set<Region>().Where(r => r.Type == RegionType.KABUPATEN).ToList();
                var apbds = ParseAPBDExcel(new FileInfo(fileResult.FilePath), apbdFile, provinces, kabupatens);

                foreach(var apbd in apbds)
                {
                    dbContext.Set<APBD>().Add(apbd);
                }

                fileResult.Move(blob.FilePath);
                dbContext.SaveChanges();
            }
            finally
            {
                uploader.DeleteUnmoved();
            }
        }

        private List<APBD> ParseAPBDExcel(FileInfo file, APBDFile apbdFile, List<Region> provinces, List<Region> kabupatens)
        {
            ExcelPackage package = new ExcelPackage(file);
            ExcelWorkbook workbook = package.Workbook;
            ExcelWorksheet worksheet = workbook.Worksheets.FirstOrDefault(ws => ws.Name == "Sheet1");
            if(worksheet == null)
                throw new ApplicationException("No Worksheet named 'Sheet1'");
            if(worksheet.Dimension == null)
                throw new ApplicationException("Empty 'Sheet1' Worksheet");
            var start = worksheet.Dimension.Start;
            var end = worksheet.Dimension.End;
            if (start.Row != 1)
                throw new ApplicationException("No Header on Worksheet named 'Sheet1'");
            if (start.Column != 1)
                throw new ApplicationException("Data is not found in column 1");
            if (end.Column < 4)
                throw new ApplicationException("Data is not found in column 4");

            Region province = null;
            List<APBD> results = new List<APBD>();

            for (int i = 2; i < end.Row; i++ )
            {
                int kabNum = 0;
                Object obj = worksheet.Cells[i, 1].Value;
                if (obj == null)
                    continue;
                if (obj is int)
                    kabNum = (int)obj;
                if (obj is double)
                    kabNum = (int)(double)obj;
                if(obj is string)
                {
                    bool parsed = int.TryParse(obj as string, out kabNum);
                    if(!parsed)
                    {
                        string cellText = worksheet.Cells[i, 2].Text;
                        var provinceName = cellText.ToUpperInvariant().Replace("PROVINSI ", "").Trim();
                        province = provinces.FirstOrDefault(p => p.Name.Trim() == provinceName);
                        if (province == null)
                            throw new ApplicationException("Cannot found provinsi with name: " + cellText);

                    }
                }
                if(kabNum != 0)
                {
                    if (province == null)
                        throw new ApplicationException("No current province when iterating in row: " + i);
                    string cellText = worksheet.Cells[i, 2].Text;
                    var kabName = cellText.ToUpperInvariant().Replace("KABUPATEN ", "").Trim();
                    var kab = kabupatens.FirstOrDefault(p => p.Name.Trim() == kabName && p.fkParentID.HasValue && p.fkParentID.Value == province.ID);
                    if (kab == null)
                        throw new ApplicationException("Cannot found kabupaten with name: " + cellText+" And province: "+province.Name);
                    APBD apbd = new APBD();
                    apbd.fkAPBDFileID = apbdFile.ID;
                    apbd.fkAPBNID = 1;
                    apbd.IsActivated = true;
                    apbd.fkRegionID = kab.ID;
                    apbd.DBH = decimal.Parse(worksheet.Cells[i, 3].Text);
                    apbd.DAU = decimal.Parse(worksheet.Cells[i, 4].Text);
                    results.Add(apbd);
                }
            }

            return results;

        }

    }
}