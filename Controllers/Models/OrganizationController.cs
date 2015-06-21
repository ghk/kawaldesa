using App.Models;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace App.Controllers.Models
{
    public class OrganizationController : ReadOnlyController<Organization, long>
    {
        public OrganizationController(DB dbContext)
            : base(dbContext)
        {
            dbContext.Configuration.ProxyCreationEnabled = false;
        }
        protected override IQueryable<Organization> ApplyQuery(IQueryable<Organization> query)
        {
            return query;
        }

        public Organization GetByURLKey(String urlKey)
        {
            IQueryable<Organization> exp = dbSet;
            foreach (var include in SingleIncludes)
            {
                exp = exp.Include(include);
            }
            return exp.FirstOrDefault(r => r.UrlKey == urlKey);
        }

        [HttpPost]
        [Authorize(Roles = Role.ADMIN)]
        public User AddOrgAdmin(long id, String email)
        {
            var org = dbSet.Find(id);
            var roles = new List<string>{Role.VOLUNTEER_ADD, Role.VOLUNTEER_APBN, Role.VOLUNTEER_DESA, 
            Role.VOLUNTEER_ACCOUNT, Role.VOLUNTEER_REALIZATION, Role.ORGANIZATION_ADMIN, Role.VOLUNTEER};
            var national = dbContext.Set<Region>().Find("0");
            User inviter = KawalDesaController.GetCurrentUser();
            var token = InvitationToken.Create(dbContext, email, inviter, org, roles, new List<Region>{national});
            return token.User;
        }

        [HttpPost]
        [Authorize(Roles = Role.ORGANIZATION_ADMIN)]
        public User AddOrgVolunteer(long id, String email)
        {
            var org = dbSet.Find(id);
            var roles = new List<string>{ Role.VOLUNTEER};
            User inviter = KawalDesaController.GetCurrentUser();
            var token = InvitationToken.Create(dbContext, email, inviter, org, roles, new List<Region>());
            return token.User;
        }

        [HttpPost]
        [Authorize(Roles = Role.VOLUNTEER_ACCOUNT)]
        public void UpdateWebsite(long id, String regionWebsite)
        {
            Update(id)
                .Set(e => e.Description, regionWebsite)
                .Save();
        }
    }
}