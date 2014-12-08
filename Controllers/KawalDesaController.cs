using System;
using System.Web.Mvc;

namespace App.Controllers
{
    public class KawalDesaController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Partials(String fileName)
        {
            return PartialView(String.Format("~/Views/KawalDesa/Partials/{0}.cshtml", fileName));
        }

    }
}