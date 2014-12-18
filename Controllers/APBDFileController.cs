using App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers
{
    public class APBDFileController: BaseController<APBDFile, long>
    {
        public APBDFileController(DB dbContext)
            : base(dbContext)
        {
        }

    }
}