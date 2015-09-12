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
using System.Web.Http.WebHost;
using App.Utils;
using FluentValidation.WebApi;
using log4net.Config;
using System.IO;
using System.Configuration;
using System.Web.Http.Filters;
using log4net;
using Microvac.Web.Validation;

namespace App
{
    public static class Configurator
    {
        public static void Configure()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalFilters.Filters.Add(new HandleErrorAttribute());
            XmlConfigurator.Configure(new FileInfo(ConfigurationManager.AppSettings["log4net.Config"]));

            GlobalConfiguration.Configuration.Services.Add(typeof(System.Web.Http.Validation.ModelValidatorProvider), new MethodModelValidatorProvider());
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacResolver();
            GlobalConfiguration.Configuration.Filters.Add(new ExceptionHandlingAttribute());            
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.Converters.Add(new JsonAnonymouser());
            GlobalConfiguration.Configuration.MessageHandlers.Add(new AuthorizationHandler());

            ConfigureRoutes(RouteTable.Routes);
            ConfigureBundles(BundleTable.Bundles);
            ConfigureMappings();            
        }
        private static void ConfigureBundles(BundleCollection bundles)
        {
            // CSS Bundles
            bundles.Add(new StyleBundle("~/css/libs/bootstrap", 
                "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css")
                .Include("~/Content/bootstrap.min.css"));

            bundles.Add(new StyleBundle("~/css/libs/bootstrap-theme", 
                "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css")
                .Include("~/Content/bootstrap-theme.min.css"));

            bundles.Add(new StyleBundle("~/css/kawaldesa")
                .Include("~/Content/font-awesome.css")
                .Include("~/Content/loading-bar.min.css")
                .Include("~/Content/style.css"));

            bundles.Add(new StyleBundle("~/css/kawaldesa-all")
                .Include("~/Content/bootstrap.min.css")
                .Include("~/Content/font-awesome.css")
                .Include("~/Content/loading-bar.min.css")
                .Include("~/Content/style.css"));

            // Script Bundles

            bundles.Add(new ScriptBundle("~/js/libs/jquery", "http://code.jquery.com/jquery-2.1.1.min.js")
                .Include("~/Scripts/jquery-2.1.4.js"));

            bundles.Add(new ScriptBundle("~/js/libs/bootstrap", "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js")
                .Include("~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/js/kawaldesa")
                .Include("~/Scripts/angular.js")
                .Include("~/Scripts/i18n/angular-locale_id-id.js")
                .Include("~/Scripts/angular-file-upload.min.js")
                .Include("~/Scripts/gen/Microvac.Web.js")
                .Include("~/Scripts/gen/Enums.js")
                .Include("~/Scripts/gen/Models.js")
                .Include("~/Scripts/gen/Controllers.js")
                .Include("~/Scripts/KawalDesa/KawalDesa.js")
                .Include("~/Scripts/KawalDesa/Controllers/*.js")
                );

            bundles.Add(new ScriptBundle("~/js/kawaldesa-all")
                .Include("~/Scripts/jquery-2.1.4.js")
                .Include("~/Scripts/angular.js")
                .Include("~/Scripts/i18n/angular-locale_id-id.js")
                .Include("~/Scripts/angular-file-upload.min.js")
                .Include("~/Scripts/ui.bootstrap.position.js")
                .Include("~/Scripts/ui.bootstrap.typeahead.js")
                .Include("~/Scripts/ui.bootstrap.modal.js")
                .Include("~/Scripts/ui.bootstrap.dateparser.js")
                .Include("~/Scripts/ui.bootstrap.datepicker.js")
                .Include("~/Scripts/angular-sticky-table-header.js")
                .Include("~/Scripts/gen/Microvac.Web.js")
                .Include("~/Scripts/gen/Enums.js")
                .Include("~/Scripts/gen/Models.js")
                .Include("~/Scripts/gen/Controllers.js")
                .Include("~/Scripts/KawalDesa/KawalDesa.js")
                .Include("~/Scripts/KawalDesa/Controllers/*.js")
                );

            bundles.Add(new ScriptBundle("~/js/kawaldesa-lib")
                .Include("~/Scripts/angular.js")
                .Include("~/Scripts/i18n/angular-locale_id-id.js")
                .Include("~/Scripts/jquery-2.1.4.js")
                .Include("~/Scripts/angular-file-upload.min.js")
                );

            bundles.Add(new ScriptBundle("~/js/kawaldesa-own")
                .Include("~/Scripts/ui.bootstrap.position.js")
                .Include("~/Scripts/ui.bootstrap.typeahead.js")
                .Include("~/Scripts/ui.bootstrap.modal.js")
                .Include("~/Scripts/ui.bootstrap.dateparser.js")
                .Include("~/Scripts/ui.bootstrap.datepicker.js")
                .Include("~/Scripts/gen/Microvac.Web.js")
                .Include("~/Scripts/gen/Enums.js")
                .Include("~/Scripts/gen/Models.js")
                .Include("~/Scripts/gen/Controllers.js")
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
                name: "Default dd",
                url: "dd/{id}",
                defaults: new { controller = "KawalDesa", action = "Index", type = UrlParameter.Optional, id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Default add",
                url: "add/{id}",
                defaults: new { controller = "KawalDesa", action = "Index", type = UrlParameter.Optional, id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Default bhpr",
                url: "bhpr/{id}",
                defaults: new { controller = "KawalDesa", action = "Index", type = UrlParameter.Optional, id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "KawalDesa",
                url: "",
                defaults: new { controller = "KawalDesa", action = "Index", type = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Oganization",
                url: "orgs/{id}",
                defaults: new { controller = "KawalDesa", action = "Organization", id=UrlParameter.Optional}
            );
            routes.MapRoute(
                name: "Users",
                url: "u/{id}",
                defaults: new { controller = "KawalDesa", action = "User"}
            );
            var appRoutes = new string[] { 
                "Dashboard", 
                "Login", 
                "Logout", 
                "FacebookRedirect", 
                "AuthTokenGenerate", 
                "AuthTokenGet", 
                "AuthTokenValidate", 
                "TestDrive"
            };
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

            routes.MapHttpRoute(
                name: "sheets",
                routeTemplate: "sheets/{fileName}",
                defaults: new { controller = "DocumentUpload", action = "GetCurrentSheet" }
            );
            var route = routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            route.RouteHandler = new RequiresSessionHttpControllerRouteHandler();
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

    public class RequiresSessionHttpControllerHandler : HttpControllerHandler, IRequiresSessionState
    {
        public RequiresSessionHttpControllerHandler(RouteData routeData)
            : base(routeData)
        { }
    }

    public class RequiresSessionHttpControllerRouteHandler : HttpControllerRouteHandler
    {
        protected override IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new RequiresSessionHttpControllerHandler(requestContext.RouteData);
        }
    }

    public class ExceptionHandlingAttribute : ExceptionFilterAttribute
    {
        private static ILog logger = LogManager.GetLogger(typeof(ExceptionHandlingAttribute));

        public override void OnException(HttpActionExecutedContext context)
        {
            var message = String.Format("Error on {0} {1} {2}.{3}",
                context.Request.Method, context.Request.RequestUri.PathAndQuery,
                context.ActionContext.ControllerContext.ControllerDescriptor.ControllerName, context.ActionContext.ActionDescriptor.ActionName);

            logger.Error(message, context.Exception);
            base.OnException(context);
        }
    }
}