using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using FluentValidation.WebApi;
using System.Web;
using System.Web.SessionState;
using System.Linq;
using App.Security;
using System.Web.Http.Filters;
using System;
using log4net;
using System.IO;
using System.Configuration;
using App.Utils;

namespace App
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        private static ILog logger = LogManager.GetLogger(typeof(MvcApplication));

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            Configurator.Configure();

            GlobalConfiguration.Configuration.DependencyResolver = new NinjectResolver();
            FluentValidationModelValidatorProvider.Configure(GlobalConfiguration.Configuration);
            GlobalConfiguration.Configuration.Filters.Add(new ExceptionHandlingAttribute());            
            log4net.Config.XmlConfigurator.Configure(new FileInfo(System.Configuration.ConfigurationManager.AppSettings["log4net.Config"]));
        }

        public class ExceptionHandlingAttribute : ExceptionFilterAttribute
        {
            public override void OnException(HttpActionExecutedContext context)
            {
                var message = String.Format("Error on {0} {1} {2}.{3}",
                    context.Request.Method, context.Request.RequestUri.PathAndQuery,
                    context.ActionContext.ControllerContext.ControllerDescriptor.ControllerName, context.ActionContext.ActionDescriptor.ActionName);

                logger.Error(message, context.Exception);
                base.OnException(context);
            }
        }

        protected void Application_PostAuthorizeRequest()
        {
            HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
        }



    }
}