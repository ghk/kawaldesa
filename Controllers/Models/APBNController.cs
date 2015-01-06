using App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class APBNController: BaseController<APBN, long>
    {
        public APBNController(DB dbContext)
            : base(dbContext)
        {
        }

    }
}