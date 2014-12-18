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
                name: "Smartadmin Partials",
                url: "scaffold/smartadmin/partials/{*fileName}",
                defaults: new { controller = "SmartAdmin", action = "Partials", fileName = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Smartadmin",
                url: "scaffold/smartadmin/{*fileName}",
                defaults: new { controller = "SmartAdmin", action = "Index", fileName = UrlParameter.Optional }
            );            

            routes.MapRoute(
               name: "Dashboard Partials",
               url: "partials/{*fileName}",
               defaults: new { controller = "Dashboard", action = "Partials", fileName = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Dashboard Default",
                url: "dashboard/{type}/{id}",
                defaults: new { controller = "Dashboard", action = "Index", type = UrlParameter.Optional, id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{type}/{id}",
                defaults: new { controller = "KawalDesa", action = "Index", type = UrlParameter.Optional, id = UrlParameter.Optional }
            );
}
    }
}