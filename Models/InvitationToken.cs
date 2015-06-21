﻿using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Scaffold.Validation;
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
            InvitationToken result = new InvitationToken();
            result.Token = GenerateToken();
            User user = new User();
            user.Email = email;
            user.UserName = email;
            result.User = user;
            db.Set<User>().Add(user);
            db.SaveChanges();

            result.fkUserId = user.Id;
            db.Set<InvitationToken>().Add(result);
            db.SaveChanges();

            var UserStore = new UserStore<User>(db);
            var UserManager = new UserManager<User>(UserStore);
            var RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(db));
            foreach(var role in roles)
            {
                UserManager.AddToRole(user.Id, role);
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

            return result;
        }

        public static string GenerateToken()
        {
            int maxSize = 20;
            char[] chars = new char[62];
            chars =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();
            byte[] data = new byte[1];
            using (RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider())
            {
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