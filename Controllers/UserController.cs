using App.Controllers.Validators;
using App.Models;
using App.Security;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Scaffold;
using System.Web.Http.Validation;
using System.Web.Http.Metadata;
using System.Web.Http.Controllers;
using System;
using System.Web;
using System.Net.Http.Headers;

namespace App.Controllers
{
    [ToTS(TSFlag.Ignore)]
    public class UserController: ApiController
    {
        private DB dbContext;
        private UserStore<User> UserStore;
        private UserManager<User> UserManager;
        private RoleManager<IdentityRole> RoleManager;

        public UserController()
        {
            dbContext = new DB();
            dbContext.Configuration.ProxyCreationEnabled = false;
            UserStore = new UserStore<User>(dbContext);
            UserManager = new UserManager<User>(UserStore);
            RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(dbContext));
        }

        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage Login(LoginViewModel model)
        {
            ModelState.Clear();
            Validate(model);

            if (!ModelState.IsValid)
                return ControllerContext.Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            else
            {
                var user = UserManager.Find(model.UserName, model.Password);
                if (user != null)
                {
                    var session = HttpContext.Current.Session;
                    if (session != null)
                        session["userid"] = user.Id;
                    
                    var roles = UserManager.GetRoles(user.Id);
                    UserViewModel userViewModel = new UserViewModel() { UserName = user.UserName, Roles = roles.ToList()};
                    return Request.CreateResponse(HttpStatusCode.OK, userViewModel);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Please enter the correct username/password");
                }
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public void Logout()
        {
            var session = HttpContext.Current.Session;
            if(session != null)
                session.Clear();
        }

        [HttpPost]
        [Authorize(Roles=Role.ADMIN)]
        public HttpResponseMessage Register([FromBody]RegisterViewModel model)
        {
            ModelState.Clear();
            Validate(model);
            
            if (!ModelState.IsValid)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            else
            {
                List<string> roles = new List<string>(){ Role.ADMIN, Role.VIEWER };

                var user = new User();
                user.UserName = model.UserName;
                var result = UserManager.Create(user, model.Password);
                if (result.Succeeded)
                {
                    foreach (var role in model.Roles)
                    {
                        if(roles.Contains(role))
                            UserManager.AddToRole(user.Id, role);
                    }
                }
                else
                {                    
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid Request");
                }
                return Request.CreateResponse(HttpStatusCode.OK, user.Id);
            }
        }

        [HttpPut]
        [Authorize(Roles=Role.ADMIN)]
        public HttpResponseMessage Update(RegisterViewModel model)
        {
            ModelState.Clear();
            Validate(model);

            if (!ModelState.IsValid)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            else
            {
                List<string> roles = new List<string>() { Role.ADMIN, Role.VIEWER };

                var user = UserManager.FindById(model.Id);
                if (user == null)
                    return ControllerContext.Request.CreateErrorResponse(HttpStatusCode.NotFound, "User not found");

                if (!String.IsNullOrEmpty(model.Password))
                {
                    UserManager.RemovePassword(user.Id);
                    UserManager.AddPassword(user.Id, model.Password);
                }

                UserManager.RemoveFromRoles(user.Id, UserManager.GetRoles(user.Id).ToArray());

                foreach (var role in model.Roles)
                {
                    if (roles.Contains(role))
                        UserManager.AddToRole(user.Id, role);
                }
                user.UserName = model.UserName;
                UserManager.Update(user);
                return Request.CreateResponse(HttpStatusCode.OK, user.Id);
            }
        }

        [HttpGet]
        [Authorize(Roles = Role.ADMIN)]
        public long GetCount()
        {
            IQueryable<User> exp = dbContext.Set<User>();
            return exp.LongCount();
        }

        [HttpGet]
        [Authorize(Roles = Role.ADMIN)]
        public IEnumerable<UserViewModel> GetAll()
        {
            IQueryable<User> exp = dbContext.Set<User>().Include("Roles");           
            List<User> users = exp.ToList();
            List<UserViewModel> views = new List<UserViewModel>();
            foreach (var user in users)
            {
                UserViewModel view = AutoMapper.Mapper.Map<User, UserViewModel>(user);
                view.Roles = UserManager.GetRoles(user.Id).ToList();
                views.Add(view);
            }            
            return views;
        }

        [HttpGet]        
        [Authorize(Roles=Role.ADMIN)]
        public virtual UserViewModel Get(string id)
        {
            var user = UserManager.FindById(id);

            if(user == null)
                return null;            

            var view = AutoMapper.Mapper.Map<User, UserViewModel>(user);
            view.Roles = UserManager.GetRoles(user.Id).ToList();
            return view;
        }

        [HttpGet]
        [Authorize]
        public virtual UserViewModel Get()
        {
            KawalDesaIdentity identity = (KawalDesaIdentity)User.Identity;
            var view = AutoMapper.Mapper.Map<User, UserViewModel>(identity.User);
            view.Roles = UserManager.GetRoles(identity.User.Id).ToList();
            return view;
        }

        [HttpGet]
        [Authorize(Roles=Role.ADMIN)]
        public virtual HttpResponseMessage GetSecretKey(string id)
        {
            var user = UserManager.FindById(id);
            if (user == null)
                return null;

            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            String secret = user.UserName + Environment.NewLine + user.SecretKey;
            result.Content = new StringContent(secret);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("text/plain");
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment") { FileName = "emisslombok.key" };
            return result;
        }
   
    }

}