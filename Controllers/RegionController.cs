using App.Models;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers
{
    public class RegionController : ReadOnlyController<Region, long>
    {
        public RegionController(DB dbContext) : base(dbContext) {
            SingleInclude(r => r.Parent.Parent, r => r.Parent.Parent.Parent, r => r.Parent.Parent.Parent.Parent);
            AllowGetAll = false;
        }
    }
}