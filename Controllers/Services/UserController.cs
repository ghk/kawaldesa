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

namespace App.Controllers.Services
{
    [Service]
    public class UserController: ApiController
    {
        private DB dbContext;
        private IUserStore<User> UserStore;
        private UserManager<User> UserManager;
        private RoleManager<Role> RoleManager;

        public UserController()
        {
            dbContext = new DB();
            dbContext.Configuration.ProxyCreationEnabled = false;
            UserStore = new CUserStore<User>(dbContext);
            UserManager = new UserManager<User>(UserStore);
            RoleManager = new RoleManager<Role>(new CRoleStore<Role>(dbContext));
        }

        [HttpPost]
        [AllowAnonymous]
        public UserViewModel Login([FromBody] LoginViewModel model)
        {
            ModelState.Clear();
            Validate(model);

            if (!ModelState.IsValid)
                throw new HttpResponseException(
                    ControllerContext.Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));
            else
            {
                //HACK, TEMP
                //var user = UserManager.Find(model.UserName, model.Password);
                var user = UserManager.FindByName(model.UserName);
                if (user != null)
                {
                    var session = HttpContext.Current.Session;
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
                Id = user.Id,
                Name = user.Name,
                FacebookId = user.FacebookId,
                UserName = user.UserName, 
                Roles = roles.ToList(),
                Scopes = GetScopes(user.Id)
            };
            return userViewModel;
        }

        public UserViewModel Convert(User user)
        {
            var roles = UserManager.GetRoles(user.Id);
            UserViewModel userViewModel = new UserViewModel() 
            { 
                Id = user.Id,
                Name = user.Name,
                FacebookId = user.FacebookId,
                UserName = user.UserName, 
                Roles = roles.ToList(),
                Scopes = GetScopes(user.Id)
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
        public virtual UserViewModel Get(string id)
        {
            var user = UserManager.FindById(id);

            if(user == null)
                return null;            

            var view = AutoMapper.Mapper.Map<User, UserViewModel>(user);
            view.Roles = UserManager.GetRoles(user.Id).ToList();
            view.Scopes = GetScopes(user.Id);
            if (user.fkOrganizationId.HasValue)
                view.Organization = dbContext.Set<Organization>().Find(user.fkOrganizationId.Value);
            return view;
        }


        [HttpGet]
        public IEnumerable<UserViewModel> GetAllByOrg(long orgId)
        {
            IQueryable<User> exp = dbContext.Set<User>().Include("Roles").Where(u => u.fkOrganizationId.Value == orgId);           
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

        private List<Region> GetScopes(string id)
        {
            var user = UserManager.FindById(id);

            return dbContext.Set<UserScope>()
                .Include(r => r.Region)
                .Include(r => r.Region.Parent)
                .Include(r => r.Region.Parent.Parent)
                .Include(r => r.Region.Parent.Parent.Parent)
                .Include(r => r.Region.Parent.Parent.Parent.Parent)
                .Where(s => s.fkUserId == user.Id)
                .ToList()
                .OrderBy(s => s.Id)
                .Select(r => r.Region)
                .ToList();
        }

        [HttpPost]
        [Authorize(Roles=Role.ADMIN+","+Role.ORGANIZATION_ADMIN)]
        public void SetScopes(string id, [FromBody] List<Region> regions)
        {
            var user = UserManager.FindById(id);
            var currentScopes = dbContext.Set<UserScope>()
                .Where(s => s.fkUserId == user.Id)
                .ToList();
            foreach(var scope in currentScopes)
            {
                dbContext.Entry(scope).State = EntityState.Deleted;
            }
            foreach(var region in regions)
            {
                var scope = new UserScope
                {
                    fkUserId = user.Id,
                    fkRegionId = region.Id
                };
                dbContext.Set<UserScope>().Add(scope);
            }
            dbContext.SaveChanges();
        }


        [HttpPost]
        [Authorize(Roles=Role.ADMIN+","+Role.ORGANIZATION_ADMIN)]
        public virtual void UpdateVolunteerRoles(String id, [FromBody] List<String> roleNames)
        {
            var allowedRoles = new String[]{ Role.VOLUNTEER_TRANSFER, Role.VOLUNTEER_DESA, 
            Role.VOLUNTEER_ACCOUNT, Role.VOLUNTEER_REALIZATION};

            var user = UserManager.FindById(id);
            var roles = UserManager.GetRoles(id);

            foreach(string roleName in allowedRoles)
            {
                bool willBeAssigned = roleNames.Contains(roleName);
                bool isCurrentlyAssigned = UserManager.IsInRole(id, roleName);
                IdentityResult res = null;
                if(willBeAssigned != isCurrentlyAssigned)
                {
                    if (willBeAssigned)
                        res = UserManager.AddToRole(user.Id, roleName);
                    else
                        res = UserManager.RemoveFromRoles(user.Id, new string[]{roleName});
                }
            }
            dbContext.SaveChanges();
        }
    }

}