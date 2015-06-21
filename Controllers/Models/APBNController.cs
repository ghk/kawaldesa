using App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class ApbnController: BaseController<Apbn, long>
    {
        public ApbnController(DB dbContext)
            : base(dbContext)
        {
        }

    }
}