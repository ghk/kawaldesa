using App.Models;
using OfficeOpenXml;
using Scaffold;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace App.Controllers.Models
{
    public class ApbdFileController: BaseController<ApbdFile, long>
    {
        public ApbdFileController(DB dbContext)
            : base(dbContext)
        {
        }

        public void PostFile(Multipart multipart)
        {
            try
            {
                var fileResult = multipart.Files[0];
                var blob = new Blob(fileResult);
                dbContext.Set<Blob>().Add(blob);

                foreach(var existingApbdFile in dbContext.Set<ApbdFile>().Where(a => a.IsActivated))
                {
                    existingApbdFile.IsActivated = false;
                    dbContext.Entry(existingApbdFile).State = System.Data.Entity.EntityState.Modified;
                }

                
                foreach(var existingApbd in dbContext.Set<Apbd>().Where(a => a.IsActivated))
                {
                    existingApbd.IsActivated = false;
                    dbContext.Entry(existingApbd).State = System.Data.Entity.EntityState.Modified;
                }


                ApbdFile apbdFile = new ApbdFile()
                {
                    FileName = blob.Name,
                    fkFileId = blob.Id,
                    IsActivated = true,
                };
                dbContext.Set<ApbdFile>().Add(apbdFile);

                var provinces = dbContext.Set<Region>().Where(r => r.Type == RegionType.PROPINSI).ToList();
                var kabupatens = dbContext.Set<Region>().Where(r => r.Type == RegionType.KABUPATEN).ToList();
                var apbds = ParseApbdExcel(new FileInfo(fileResult.FilePath), apbdFile, provinces, kabupatens);

                foreach(var apbd in apbds)
                {
                    dbContext.Set<Apbd>().Add(apbd);
                }

                fileResult.Move(blob.FilePath);
                dbContext.SaveChanges();
            }
            finally
            {
                multipart.DeleteUnmoved();
            }
        }

        private List<Apbd> ParseApbdExcel(FileInfo file, ApbdFile apbdFile, List<Region> provinces, List<Region> kabupatens)
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
            List<Apbd> results = new List<Apbd>();

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
                        province = provinces.FirstOrDefault(p => p.Name.Trim().ToLowerInvariant() == provinceName.ToLowerInvariant());
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
                    var kab = kabupatens.FirstOrDefault(p => p.Name.Trim().ToLowerInvariant() == kabName.ToLowerInvariant() && p.fkParentId == province.Id);
                    if (kab == null)
                        throw new ApplicationException("Cannot found kabupaten with name: " + cellText+" And province: "+province.Name);
                    Apbd apbd = new Apbd();
                    apbd.fkApbdFileId = apbdFile.Id;
                    apbd.fkApbnId = 1;
                    apbd.IsActivated = true;
                    apbd.fkRegionId = kab.Id;
                    apbd.Dbh = decimal.Parse(worksheet.Cells[i, 3].Text);
                    apbd.Dau = decimal.Parse(worksheet.Cells[i, 4].Text);
                    results.Add(apbd);
                }
            }

            return results;

        }

    }
}