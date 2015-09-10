using App.Mailers;
using App.Models;
using App.Security;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Net.Http;
using System.Net;
using App.Controllers.Services;

namespace App.Controllers.Models
{
    public class OrganizationController : BaseController<Organization, long>
    {
        private UserController userController;
        public OrganizationController(DB dbContext, UserController userController)
            : base(dbContext)
        {
            this.userController = userController;
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
        [Authorize(Roles = Role.ADMIN+","+Role.ORGANIZATION_ADMIN)]
        public UserViewModel AddOrgAdmin(long id, String email)
        {
            using (var tx = dbContext.Database.BeginTransaction())
            {
                var org = dbSet.Find(id);
                var roles = new List<string>{Role.VOLUNTEER_ALLOCATION,  Role.VOLUNTEER_TRANSFER, Role.VOLUNTEER_DESA, 
                Role.VOLUNTEER_ACCOUNT, Role.VOLUNTEER_REALIZATION, Role.ORGANIZATION_ADMIN, Role.VOLUNTEER};
                var national = dbContext.Set<Region>().Find("0");
                User inviter = dbContext.Set<User>().Find(KawalDesaController.GetCurrentUser().Id);
                var token = InvitationToken.Create(dbContext, email, inviter, org, roles, new List<Region>{national});
                new UserMailer().Invitation(token).Deliver();
                tx.Commit();

                return userController.Convert(token.User);
            }
        }

        [HttpPost]
        [Authorize(Roles = Role.ADMIN+","+Role.ORGANIZATION_ADMIN)]
        public UserViewModel AddOrgVolunteer(long id, String email)
        {
            using (var tx = dbContext.Database.BeginTransaction())
            {
                var org = dbSet.Find(id);
                var roles = new List<string> { Role.VOLUNTEER };
                User inviter = dbContext.Set<User>().Find(KawalDesaController.GetCurrentUser().Id);
                var token = InvitationToken.Create(dbContext, email, inviter, org, roles, new List<Region>());
                new UserMailer().Invitation(token).Deliver();
                tx.Commit();

                return userController.Convert(token.User);
            }
        }

        [HttpPost]
        [Authorize(Roles = Role.ADMIN)]
        public Organization Update(Multipart<Organization> multipart)
        {
            try
            {
                var org = multipart.Entity;
                Validate(multipart.Entity);

                if (!ModelState.IsValid)
                    throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));

                Update(org)
                    .Set(o => o.Name)
                    .Set(o => o.Description)
                    .Set(o => o.Website)
                    .Set(o => o.Facebook)
                    .Set(o => o.Twitter)
                    .Set(o => o.UrlKey)
                    .Save();

                if (multipart.Files.Count > 0)
                {
                    var fileResult = multipart.Files[0];
                    var blob = new Blob(fileResult);
                    dbContext.Set<Blob>().Add(blob);
                    dbContext.SaveChanges();
                    fileResult.Move(blob.FilePath);

                    org.fkPictureId = blob.Id;
                    Update(org)
                        .Set(o => o.fkPictureId, blob.Id)
                        .Set(o => o.PictureFileName, blob.RelativeFileName)
                        .Save();
                }
                return org;
            }
            finally
            {
                multipart.DeleteUnmoved();
            }
        }
    }
}