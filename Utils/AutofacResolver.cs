using App.Models;
using Autofac;
using Autofac.Core;
using Autofac.Integration.WebApi;
using NetMQ;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;

namespace App.Utils
{
    public class AutofacResolver : AutofacWebApiDependencyResolver
    {
        public AutofacResolver():
            base(BuildContainer())
        {
        }

        private static IContainer BuildContainer()
        {
            var builder = new ContainerBuilder();

            // Get your HttpConfiguration.

            // Register your Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // OPTIONAL: Register the Autofac filter provider.
            builder.RegisterWebApiFilterProvider(GlobalConfiguration.Configuration);
            builder.RegisterType<DB>().InstancePerRequest();
            builder.RegisterType<DumpMessager>();
            builder.RegisterInstance(NetMQContext.Create()).SingleInstance();

            // Set the dependency resolver to be Autofac.
            return builder.Build();
        }
    }
}