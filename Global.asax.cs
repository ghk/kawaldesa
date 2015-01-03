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

        protected void Application_Start()
        {

            Configurator.Configure();
        }


        protected void Application_PostAuthorizeRequest()
        {
            HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
        }



    }
}