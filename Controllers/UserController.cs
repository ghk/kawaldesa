using App.Controllers.Validators;
using App.Models;
using App.Security;
using System.Collections.Generic;
using System.Data.Entity;
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
        public UserViewModel Login(LoginViewModel model)
        {
            ModelState.Clear();
            Validate(model);

            if (!ModelState.IsValid)
                throw new HttpResponseException(
                    ControllerContext.Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));
            else
            {
                var user = UserManager.Find(model.UserName, model.Password);
                if (user != null)
                {
                    var session = HttpContext.Current.Session;
                    if (session != null)
                        session["userid"] = user.Id;
                    
                    var roles = UserManager.GetRoles(user.Id);
                    UserViewModel userViewModel = new UserViewModel() 
                    { 
                        UserName = user.UserName, 
                        Roles = roles.ToList()
                    };
                    return userViewModel;
                }
                else
                {
                    throw new HttpResponseException(
                        Request.CreateErrorResponse(HttpStatusCode.NotFound, "Please enter the correct username/password"));
                }
            }
        }

        [HttpGet]
        [Authorize]
        public UserViewModel GetCurrentUser()
        {
            var user = KawalDesaController.GetCurrentUser();
            var roles = UserManager.GetRoles(user.Id);
            UserViewModel userViewModel = new UserViewModel() 
            { 
                UserName = user.UserName, 
                Roles = roles.ToList(),
                Scopes = GetScopes()
            };
            return userViewModel;
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
                List<string> roles = new List<string>(){ Role.ADMIN };

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
                List<string> roles = new List<string>() { Role.ADMIN };

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

        private List<Region> GetScopes()
        {
            KawalDesaIdentity identity = (KawalDesaIdentity)User.Identity;
            return dbContext.Set<UserScope>()
                .Include(r => r.Region)
                .Include(r => r.Region.Parent)
                .Include(r => r.Region.Parent.Parent)
                .Include(r => r.Region.Parent.Parent.Parent)
                .Include(r => r.Region.Parent.Parent.Parent.Parent)
                .Where(s => s.fkUserID == identity.User.Id)
                .ToList()
                .OrderBy(s => s.ID)
                .Select(r => r.Region)
                .ToList();
        }

        [HttpPost]
        [Authorize(Roles=Role.VOLUNTEER)]
        public void SetScopes(List<Region> regions)
        {
            KawalDesaIdentity identity = (KawalDesaIdentity)User.Identity;
            var currentScopes = dbContext.Set<UserScope>()
                .Where(s => s.fkUserID == identity.User.Id)
                .ToList();
            foreach(var scope in currentScopes)
            {
                dbContext.Entry(scope).State = EntityState.Deleted;
            }
            foreach(var region in regions)
            {
                var scope = new UserScope
                {
                    fkUserID = identity.User.Id,
                    fkRegionID = region.ID
                };
                dbContext.Set<UserScope>().Add(scope);
            }
            dbContext.SaveChanges();
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
   
        [HttpPost]
        [Authorize(Roles=Role.VOLUNTEER)]
        public virtual void UpdateVolunteerRoles(List<String> roleNames)
        {
            var allowedRoles = new String[]{Role.VOLUNTEER_ADD, Role.VOLUNTEER_APBN, Role.VOLUNTEER_DESA, 
            Role.VOLUNTEER_ACCOUNT, Role.VOLUNTEER_REALIZATION};

            var principal = HttpContext.Current.User;
            var user = KawalDesaController.GetCurrentUser();
            var roles = UserManager.GetRoles(user.Id);

            foreach(string roleName in allowedRoles)
            {
                bool willBeAssigned = roleNames.Contains(roleName);
                bool isCurrentlyAssigned = principal.IsInRole(roleName);
                bool isCurrentlyAssigned2 = UserManager.IsInRole(user.Id, roleName);
                IdentityResult res = null;
                if(willBeAssigned != isCurrentlyAssigned)
                {
                    if (willBeAssigned)
                        res = UserManager.AddToRole(user.Id, roleName);
                    else
                        res = UserManager.RemoveFromRoles(user.Id, new string[]{roleName});
                }
                Console.WriteLine(res);
            }
            dbContext.SaveChanges();
        }
    }

}