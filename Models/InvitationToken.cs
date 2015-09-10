using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microvac.Web.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http.Validation;

namespace App.Models
{
    public class InvitationToken : BaseEntity
    {
        [Index(IsUnique=true)]
        public string Token { get; set; }
        public bool IsUsed { get; set; }

        [ForeignKey("User")]
        public string fkUserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("Inviter")]
        public string fkInviterId { get; set; }
        public virtual User Inviter { get; set; }

        public static InvitationToken Create(DbContext db, String email, User inviter, 
            Organization organization, List<String> roles, List<Region> regions)
        {
            var UserStore = new CUserStore<User>(db);
            var UserManager = new UserManager<User>(UserStore);
            var RoleManager = new RoleManager<Role>(new CRoleStore<Role>(db));


            InvitationToken result = new InvitationToken();
            while(result.Token == null)
            {
                var token = GenerateToken();
                var exists = db.Set<InvitationToken>().Any(i => i.Token == token);
                if (!exists)
                    result.Token = token;
            }
            User user = new User();
            user.Email = email;
            user.UserName = email;
            user.fkOrganizationId = organization.Id;
            user.Id = Guid.NewGuid().ToString();
            user.Organization = organization;

            var userRes = UserManager.Create(user);
            if (!userRes.Succeeded)
                throw new ApplicationException(userRes.Errors.First());

            result.User = user;
            result.fkInviterId = inviter.Id;
            result.fkUserId = user.Id;
            db.Set<InvitationToken>().Add(result);
            db.SaveChanges();

            result.Inviter = inviter;
            result.User = user;

            foreach(var role in roles)
            {
                var res = UserManager.AddToRole(user.Id, role);
                Console.WriteLine(res);
            }
            foreach(var region in regions)
            {
                var scope = new UserScope
                {
                    fkUserId = user.Id,
                    fkRegionId = region.Id
                };
                db.Set<UserScope>().Add(scope);
            }
            db.SaveChanges();

            return result;
        }

        public static string GenerateToken()
        {
            int maxSize = 30;
            char[] chars = new char[62];
            chars =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();
            byte[] data = new byte[1];
            using (RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider())
            {
                //TODO: why is this stackoverflow's code generate bytes twice?
                crypto.GetNonZeroBytes(data);
                data = new byte[maxSize];
                crypto.GetNonZeroBytes(data);
            }
            StringBuilder result = new StringBuilder(maxSize);
            foreach (byte b in data)
            {
                result.Append(chars[b % (chars.Length)]);
            }
            return result.ToString();
        }
    }
}