using App.Controllers;
using App.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using App.Security;
using System.Security.Principal;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Net.Http;
using System.Web.Http.Routing;
using System.Web.Http.Controllers;
using System.Web.Http.Hosting;
using System.Web.Http.Validation;
using System.Web.Http.Metadata;
using System.Web.Http.Metadata.Providers;
using Moq;
using Microvac.Web.Validation;
using System.Web.Http.ModelBinding;
using Microvac.Web;

namespace App.Tests
{
    [TestClass]
    public class TestModelBinder
    {
        [TestMethod]
        public void ModelBinderTest()
        {
            var uploadForms = new SimpleHttpValueProvider();
            uploadForms["Amount"] = "123";
            uploadForms["fkSourceID"] = "1";
            uploadForms["fkDestinationID"] = "3";
            uploadForms["fkActorID"] = "3";
            uploadForms["Date"] = "2015-01-06T07:33:29.139Z";
            uploadForms["SourceURL"] = "xvideos.com";

            Mock<IModelBinder> mockIntBinder = new Mock<IModelBinder>();
            HttpActionContext actionContext = ContextUtils.CreateActionContext();
            ModelBindingContext bindingContext = new ModelBindingContext
            {
                ModelMetadata = new EmptyModelMetadataProvider().GetMetadataForType(null, typeof(Transaction)),
                ValueProvider = uploadForms
            };

            bool retVal = actionContext.Bind(bindingContext);
            Console.WriteLine(retVal);
        }
    }
}
