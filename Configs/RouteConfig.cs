using System.Web.Mvc;
using System.Web.Routing;

namespace App.Configs
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default r",
                url: "p/{id}",
                defaults: new { controller = "KawalDesa", action = "Index", type = UrlParameter.Optional, id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Default",
                url: "{action}/{id}",
                defaults: new { controller = "KawalDesa", action = "Index", type = UrlParameter.Optional, id = UrlParameter.Optional }
            );
}
    }
}