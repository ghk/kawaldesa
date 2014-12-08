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

namespace App.Controllers
{
    public class KawalDesaUploadController: UploadController
    {
        private DbContext dbContext;

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

    }
}