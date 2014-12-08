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
                name: "Kawal Desa Partials",
                url: "partials/{*fileName}",
                defaults: new { controller = "KawalDesa", action = "Partials", fileName = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Default",
                url: "{type}/{id}",
                defaults: new { controller = "KawalDesa", action = "Index", type = UrlParameter.Optional, id = UrlParameter.Optional }
            );
        }
    }
}