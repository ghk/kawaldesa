using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using App.Models;
using System.Data.Entity;

namespace App.Controllers.Scaffold
{
    public class SmartAdminController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Scaffold/Views/Smartadmin/Index.cshtml");
        }

        public ActionResult Partials(String fileName)
        {
            return PartialView(String.Format("~/Scaffold/Views/Smartadmin/Partials/{0}.cshtml", fileName));
        }
    }
}
