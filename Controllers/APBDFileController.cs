using App.Models;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace App.Controllers
{
    public class APBDFileController: BaseController<APBDFile, long>
    {
        private Uploader uploader = new Uploader("APBDFile");

        public APBDFileController(DB dbContext)
            : base(dbContext)
        {
        }

        public async Task<UploadResult<Blob>> PostFile()
        {
            var res = await uploader.PostFile<Blob>(Request);
            
            Blob blob = res.Files.ToList()[0];
            dbContext.Set<Blob>().Add(blob);

            APBDFile apbdFile = new APBDFile()
            {
                FileName = blob.Name,
                fkFileID = blob.ID,
                IsActivated = true,
            };
            dbContext.Set<APBDFile>().Add(apbdFile);

            String filePath = Uploader.ToAbsolutePath(blob);

            //todo parse excel

            return res;
        }

    }
}