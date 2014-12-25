using App.Models;
using OfficeOpenXml;
using Scaffold;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace App.Controllers
{
    public class BlobController: ReadOnlyController<Blob, long>
    {
        private Uploader uploader = new Uploader();

        public BlobController(DB dbContext)
            : base(dbContext)
        {
        }

        [HttpGet]
        public HttpResponseMessage Download(long blobID)
        {
            Blob blob = dbSet.Find(blobID);
            if (Request.Headers.IfModifiedSince.HasValue)
                if (Request.Headers.IfModifiedSince.Value.UtcDateTime >= blob.DateModified.ToUniversalTime())
                    return new HttpResponseMessage(HttpStatusCode.NotModified);

            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            FileInfo file = new FileInfo(blob.FilePath);
            var stream = File.OpenRead(file.FullName);
            result.Content = new StreamContent(stream);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue(blob.Type);
            return result;
        }

    }
}