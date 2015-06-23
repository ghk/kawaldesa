using App.Controllers.Validators;
using App.Security;
using FluentValidation.Attributes;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Scaffold;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace App.Models
{  
    public class CUserStore<TUser> : UserStore<TUser, Role, string, IdentityUserLogin, UserRole, IdentityUserClaim>, IUserStore<TUser>, IUserStore<TUser, string>, IDisposable where TUser : User
    {
        // Summary:
        //     Default constuctor which uses a new instance of a default EntityyDbContext
        public CUserStore(DbContext context)
            : base(context)
        {
        }
    }
    // Summary:
    //     EntityFramework based implementation
    //
    // Type parameters:
    //   TRole:
    public class CRoleStore<TRole> : RoleStore<TRole, string, UserRole>, IQueryableRoleStore<TRole>, IQueryableRoleStore<TRole, string>, IRoleStore<TRole, string>, IDisposable where TRole : Role, new()
    {
        public CRoleStore(DbContext context)
            : base(context)
        {

        }
    }
    public class User : IdentityUser<string, IdentityUserLogin, UserRole, IdentityUserClaim>
    {
        public User()
        {
            this.SecretKey = CryptographyHelper.GenerateSecretKey();
        }
        public string SecretKey { get; set; }
        public string Name { get; set; }
        public string FacebookId { get; set; }
        public bool FacebookIsVerified { get; set; }
        public bool IsADuplicate { get; set; }
        public bool IsActive { get; set; }
        public string Email { get; set; }

        [ForeignKey("Organization")]
        public long? fkOrganizationId { get; set; }
        public virtual Organization Organization { get; set; }
    }
    public class Role : IdentityRole<string, UserRole>
    {
        public const string ADMIN = "admin";
        public const string ORGANIZATION_ADMIN = "org_admin";
        public const string VOLUNTEER = "volunteer";
        public const string VOLUNTEER_APBN = "volunteer_apbn";
        public const string VOLUNTEER_ADD = "volunteer_add";
        public const string VOLUNTEER_DESA = "volunteer_desa";
        public const string VOLUNTEER_ACCOUNT = "volunteer_account";
        public const string VOLUNTEER_REALIZATION = "volunteer_realization";
        public Role()
        {
        }
        public Role(String name)
        {
            Id = name;
            Name = name;
        }
    }

    public class UserRole : IdentityUserRole<string>
    {
        public UserRole()
        {
        }

        [ForeignKey("Role")]
        public override string RoleId { get; set; }
        public virtual Role Role { get; set; }

        [ForeignKey("User")]
        public override string UserId { get; set; }
        public virtual User User { get; set; }

    }

    [ViewModel]
    public class UserViewModel
    {
        public string Id { get; set; }
        public string FacebookId { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
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

}