using App.Controllers;
using App.Models;
using App.App_Start;
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

namespace App.Tests
{
    [TestClass]
    public class TestWorkforce
    {
        private DB dbContext;
        private UserManager<User> userManager;
        private RoleManager<IdentityRole> roleManager;
        private static readonly string TEST_CLINIC = "TESTCLINIC";
        private static readonly string TEST_CLINICADMIN = "TESTCLINICADMIN";

        //public void Setup()
        //{
        //    dbContext = new DB();
        //    userManager = new UserManager<User>(new UserStore<User>(dbContext));
        //    roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(dbContext));

        //    // SETUP CLINIC AND CREDIT

        //    var testClinic = GetTestClinic();
        //    if(testClinic == null) 
        //    {
        //        testClinic = new Clinic();
        //        testClinic.Name = TEST_CLINIC;
        //        dbContext.Set<Clinic>().Add(testClinic);
        //        dbContext.SaveChanges();
        //    }

        //    var testCredit = GetTestCredit(testClinic);
        //    if (testCredit == null)
        //    {
        //        testCredit = new Credit();
        //        testCredit.Type = CreditType.Lombok;
        //        testCredit.ClinicID = testClinic.ID;
        //        dbContext.Set<Credit>().Add(testCredit);
        //        dbContext.SaveChanges();
        //    }

        //    // SETUP TEST USER AND ROLE

        //    if (!roleManager.RoleExists(Role.CLINIC_ADMIN))
        //    {
        //        var result = roleManager.Create(new IdentityRole(Role.CLINIC_ADMIN));
        //    }
                
        //    var testClinicAdmin = userManager.FindByName(TEST_CLINICADMIN);
        //    if (testClinicAdmin == null)
        //    {
        //        testClinicAdmin = new User();
        //        testClinicAdmin.UserName = TEST_CLINICADMIN;
        //        testClinicAdmin.ClinicID = testClinic.ID;
        //        var userResult = userManager.Create(testClinicAdmin, "123456");
        //        if (userResult.Succeeded)
        //        {
        //            var roleResult = userManager.AddToRole(testClinicAdmin.Id, Role.CLINIC_ADMIN);
        //        }
        //    }
                
        //    // SETUP AutoMapper
        //    App.App_Start.AutoMapperConfig.RegisterMappings();
        //}

        //[TestMethod]
        //public void PostAsClinicAdmin_ShouldReturnWorkforceIDAndReduceCredit()
        //{
        //    Setup();                   
        //    var creditController = new CreditController(dbContext);            
        //    var controller = new WorkforceController(dbContext, creditController);
            
        //    SetupControllerForTests(creditController);
        //    SetupControllerForTests(controller);

        //    var principal = GetTestPrincipal();
        //    creditController.ControllerContext.RequestContext.Principal = principal;
        //    controller.ControllerContext.RequestContext.Principal = principal;
            
        //    var workforceViewModel = GenerateWorkforceViewModel();
        //    var testClinic = GetTestClinic();
        //    var testCredit = GetTestCredit(testClinic);
        //    var oldCredit = testCredit.Value;

        //    var model = AutoMapper.Mapper.Map<WorkforceViewModel, Workforce>(workforceViewModel);
        //    var result = controller.Post(model);

        //    testCredit = GetTestCredit(testClinic);
        //    var newCredit = testCredit.Value;
            
        //    Assert.IsNotNull(result);
        //    Assert.AreEqual(oldCredit, newCredit + 1);
        //}

        //private WorkforceViewModel GenerateWorkforceViewModel()
        //{
        //    var workforceViewModel = new WorkforceViewModel();
        //    workforceViewModel.Name = new Guid().ToString();
        //    workforceViewModel.RegistrationID = new Guid().ToString();
        //    workforceViewModel.BirthDate = DateTime.Now;
        //    workforceViewModel.ExaminationDate = DateTime.Now;
        //    workforceViewModel.Portrait = new Guid().ToString();
        //    workforceViewModel.PortraitFormat = "image/jpeg";
        //    workforceViewModel.ClinicID = GetTestClinic().ID;
        //    return workforceViewModel;
        //}

        //private Credit GetTestCredit(Clinic clinic)
        //{
        //    if (clinic == null)
        //        clinic = GetTestClinic();
        //    return dbContext.Set<Credit>().Where(c => c.ClinicID == clinic.ID && c.Type == CreditType.Lombok).FirstOrDefault();
        //}

        //private Clinic GetTestClinic()
        //{
        //    return dbContext.Set<Clinic>().Where(c => c.Name == TEST_CLINIC).FirstOrDefault();            
        //}

        //private GenericPrincipal GetTestPrincipal()
        //{
        //    User user = userManager.FindByName(TEST_CLINICADMIN);
        //    LombokIdentity identity = new LombokIdentity(user, "emiss");
        //    GenericPrincipal principal = new GenericPrincipal(identity, userManager.GetRoles(user.Id).ToArray());
        //    return principal;
        //}

        //private static void SetupControllerForTests(ApiController controller)
        //{
        //    controller.Configuration = new HttpConfiguration();
        //    controller.Request = new HttpRequestMessage();
        //}
        
    }
}
