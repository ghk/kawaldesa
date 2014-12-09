using App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers
{
    public class RegionController : BaseController<Region, long>
    {
        public RegionController(DB dbContext) : base(dbContext) {
            Include(r => r.Parent);            
        }
    }
}