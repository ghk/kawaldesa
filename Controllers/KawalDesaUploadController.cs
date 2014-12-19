using App.Models;
using Scaffold;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Data.Entity;
using System.Net.Http;
using System.Web;
using System.Net;
using System.IO;
using System.Net.Http.Headers;
using System.Web.Http;
using OfficeOpenXml;

namespace App.Controllers
{
    public class KawalDesaUploadController: UploadController
    {
        private DbContext dbContext;
        private List<APBDFile> APBDFileDataCollection;

        public KawalDesaUploadController() : this(new DB()) { }
        public KawalDesaUploadController(DbContext dbContext): base("KawalDesa")
        { 
            this.dbContext = dbContext;
            dbContext.Configuration.ProxyCreationEnabled = false;
        }

        public Blob PostPicture(string content, string type)
        {
            byte[] picture = Convert.FromBase64String(content);
            string root = HttpContext.Current.Server.MapPath("~/Content/uploads/" + UploadFolder);
            string fileName = Guid.NewGuid().ToString("N");
            string path = System.IO.Path.Combine(root, fileName);

            System.IO.Directory.CreateDirectory(root);
            System.IO.File.WriteAllBytes(path, picture);

            Blob result = new Blob();
            result.Name = fileName;
            result.Path = path;
            result.Size = picture.Length;
            result.Type = type;

            dbContext.Set<Blob>().Add(result);
            dbContext.SaveChanges();

            return result;
        }

        public HttpResponseMessage GetPicture(long id)
        {            
            Blob blob = dbContext.Set<Blob>().Where(b => b.ID == id).FirstOrDefault();
            if(blob == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            if (Request.Headers.IfModifiedSince.HasValue)
                if (Request.Headers.IfModifiedSince.Value.UtcDateTime >= blob.DateModified.ToUniversalTime())
                    return new HttpResponseMessage(HttpStatusCode.NotModified);

            using (MemoryStream ms = new MemoryStream())
            {
                using (FileStream fs = File.OpenRead(blob.Path))
                {
                    fs.CopyTo(ms);
                    HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
                    result.Content = new ByteArrayContent(ms.ToArray());
                    result.Content.Headers.LastModified = new DateTimeOffset(blob.DateModified.ToUniversalTime());
                    result.Content.Headers.ContentType = new MediaTypeHeaderValue(blob.Type);
                    return result;
                }
            }
        }

        [HttpGet]
        public List<APBDFile> ParseAPBNFileFile([FromUri] string fileLocation)
        {
            if (string.IsNullOrWhiteSpace(fileLocation)) return new List<APBDFile>();
            byte[] fileBytes = File.ReadAllBytes(fileLocation);
            MemoryStream ms = new MemoryStream(fileBytes);
            this.APBDFileDataCollection = new List<APBDFile>();
            int startDataRow = 6;
            int startDataColumn = 9;
            string indicatorNumberAddress = "C";

            using (ExcelPackage package = new ExcelPackage(ms))
            {
                ExcelWorkbook workBook = package.Workbook;
                if (workBook == null) return new List<APBDFile>();
                foreach (ExcelWorksheet worksheet in workBook.Worksheets)
                {
                    if (worksheet.Name == "REKAP") continue;
                    ParseWorksheet(worksheet, indicatorNumberAddress, startDataRow, startDataColumn);
                }
            }

            return this.APBDFileDataCollection;
        }

        private void ParseWorksheet(ExcelWorksheet currentWorksheet, string indicatorNumberAddress, int startDataRow, int startDataColumn)
        {
            var start = currentWorksheet.Dimension.Start;
            var end = currentWorksheet.Dimension.End;

            for (int i = startDataRow; i < end.Row; i++)
            {
                string indicatorNumber = currentWorksheet.Cells[indicatorNumberAddress + i.ToString()].Text;
                if (string.IsNullOrEmpty(indicatorNumber)) continue;
                //GetQuestionnaireAnswerData(currentWorksheet, indicatorNumber, i, startDataColumn, end.Column);
            }
        }
    }
}