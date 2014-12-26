using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using App.Models;
using System.Web.Mvc;
using System.Web.Routing;
using App.Security;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.SessionState;
using System.Web.Optimization;

namespace App
{
    public static class Configurator
    {
        public static void Configure()
        {
            ConfigureWebAPI(GlobalConfiguration.Configuration);            
            ConfigureGlobalFilters(GlobalFilters.Filters);
            ConfigureRoutes(RouteTable.Routes);
            ConfigureBundles(BundleTable.Bundles);
            ConfigureMappings();            
        }
        private static void ConfigureBundles(BundleCollection bundles)
        {
            // CSS Bundles
            bundles.Add(new StyleBundle("~/css/libs/bootstrap", 
                "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css")
                .Include("~/Scaffold/Content/bootstrap/bootstrap.css"));

            bundles.Add(new StyleBundle("~/css/libs/bootstrap-theme", 
                "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css")
                .Include("~/Scaffold/Content/bootstrap-theme.min.css"));

            bundles.Add(new StyleBundle("~/css/kawaldesa")
                .Include("~/Content/loading-bar.min.css")
                .Include("~/Content/style.css"));

            // Script Bundles

            bundles.Add(new ScriptBundle("~/js/libs/jquery", "http://code.jquery.com/jquery-2.1.1.min.js")
                .Include("~/Scaffold/Scripts/jquery-2.1.1.js"));

            bundles.Add(new ScriptBundle("~/js/libs/bootstrap", "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js")
                .Include("~/Scaffold/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/js/kawaldesa")
                .Include("~/Scaffold/Scripts/angular.js")
                .Include("~/Scripts/angular-file-upload.min.js")
                .Include("~/Scripts/Models.js")
                .Include("~/Scripts/KawalDesa/Models/*.js")
                .Include("~/Scripts/KawalDesa/KawalDesa.js")
                .Include("~/Scripts/KawalDesa/Controllers/*.js")
                );

        }
        private static void ConfigureRoutes(RouteCollection routes)
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

        private static void ConfigureWebAPI(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );            
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

            config.MessageHandlers.Add(new AuthorizationHandler());
        }

        private static void ConfigureGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        private static void ConfigureMappings()
        {
            AutoMapper.Mapper.CreateMap<User, LoginViewModel>()
                .ForMember(login => login.UserName, opt => opt.MapFrom(user => user.UserName))
                .ReverseMap();

            AutoMapper.Mapper.CreateMap<User, UserViewModel>()
                .ForMember(view => view.Id, opt => opt.MapFrom(user => user.Id))
                .ForMember(view => view.UserName, opt => opt.MapFrom(user => user.UserName))
                .ForMember(view => view.Roles, opt => opt.Ignore());
        }
    }
}