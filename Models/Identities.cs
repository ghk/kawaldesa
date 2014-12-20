using App.Controllers.Validators;
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
    }

    public class UserViewModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public List<string> Roles { get; set; }
    }

    [Validator(typeof(LoginViewModelValidator))]
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
        public const string VIEWER = "viewer";
        public const string VOLUNTEER = "volunteer";
        public const string VOLUNTEER_APBN = "volunteer_apbn";
        public const string VOLUNTEER_ADD = "volunteer_add";
        public const string VOLUNTEER_DESA = "volunteer_desa";
    }

}