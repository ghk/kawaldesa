using System;
using System.Web.Mvc;

namespace App.Controllers
{
    public class DashboardController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Partials(String fileName)
        {
            return PartialView(String.Format("~/Views/Dashboard/Partials/{0}.cshtml", fileName));
        }

    }
}