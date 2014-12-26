using System.Web.Mvc;
using System.Web.Routing;
using System.Collections.Generic;

namespace App.Configs
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default p",
                url: "p/{id}",
                defaults: new { controller = "KawalDesa", action = "Index", type = UrlParameter.Optional, id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Default r",
                url: "r/{id}",
                defaults: new { controller = "KawalDesa", action = "Index", type = UrlParameter.Optional, id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "KawalDesa",
                url: "",
                defaults: new { controller = "KawalDesa", action = "Index", type = UrlParameter.Optional }
            );
            var appRoutes = new string[] { "Dashboard", "Login", "FacebookRedirect"};
            foreach (var appRoute in appRoutes)
            {
                routes.MapRoute(
                    name: "KawalDesa."+appRoute,
                    url: appRoute,
                    defaults: new { controller = "KawalDesa", action = appRoute }
                );

            }
            routes.MapRoute(
                "Default Desa",
                "{regionKey}",
                new { controller = "KawalDesa", action = "Index" }
            );
}
    }
}