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
using Scaffold.Validation;
using System.Web.Http.ModelBinding;
using Scaffold;

namespace App.Tests
{
    [TestClass]
    public class TestValidator
    {
       public class TestModel
        {
            [Validator]
            public IEnumerable<ModelValidationResult> Validate()
            {
                yield return new ModelValidationResult { MemberName = "fkActorID", Message = "fkActorID must matched either fkDestinationID or fkSourceID" };
            }
        }

       [TestMethod]
        public void TestValidate()
        {
            var model = new TestModel();

            Account modelAccount = new Account();
            modelAccount.Target = 1;
            ModelMetadataProvider metadataProvider = new DataAnnotationsModelMetadataProvider();
            HttpActionContext actionContext = ContextUtils.CreateActionContext();
            var transactions = new List<TestModel>() { model };
            List<Account> accounts = new List<Account>() { modelAccount };

            actionContext.ControllerContext.Configuration.Services.Add(typeof(ModelValidatorProvider), new MethodModelValidatorProvider());
            var result = new DefaultBodyModelValidator().Validate(transactions, typeof(TestModel), metadataProvider, actionContext, string.Empty);
            //var result = new DefaultBodyModelValidator().Validate(modelAccount, typeof(List<Account>), metadataProvider, actionContext, string.Empty);
            Assert.IsFalse(result);
        }



    }
}
