﻿using App.Controllers.Validators;
using App.Security;
using FluentValidation.Attributes;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Scaffold;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{  
    public class User : IdentityUser
    {
        public User()
        {
            this.SecretKey = CryptographyHelper.GenerateSecretKey();
        }
        public string SecretKey { get; set; }
        public string Name { get; set; }
        public string FacebookID { get; set; }
        public bool FacebookIsVerified { get; set; }
        public bool IsADuplicate { get; set; }
        public bool IsActive { get; set; }
        public string Email { get; set; }

        [ForeignKey("Organization")]
        public long? fkOrganizationID { get; set; }
        public virtual Organization Organization { get; set; }
    }

    public class UserViewModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public List<string> Roles { get; set; }
        public List<Region> Scopes { get; set; }
    }

    public class LoginViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    [Validator(typeof(RegisterViewModelValidator))]
    public class RegisterViewModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public List<string> Roles { get; set; }
    }

    public static class Role {
        public const string ADMIN = "admin";
        public const string ORGANIZATION_ADMIN = "org_admin";
        public const string VOLUNTEER = "volunteer";
        public const string VOLUNTEER_APBN = "volunteer_apbn";
        public const string VOLUNTEER_ADD = "volunteer_add";
        public const string VOLUNTEER_DESA = "volunteer_desa";
        public const string VOLUNTEER_ACCOUNT = "volunteer_account";
        public const string VOLUNTEER_REALIZATION = "volunteer_realization";
    }

}