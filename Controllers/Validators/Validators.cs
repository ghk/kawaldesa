using App.Models;
using FluentValidation;
using FluentValidation.Mvc;
using FluentValidation.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace App.Controllers.Validators
{
    public class LoginViewModelValidator : AbstractValidator<LoginViewModel>
    {
        public LoginViewModelValidator()
        {
            RuleFor(l => l.UserName).NotEmpty();
            RuleFor(l => l.Password).NotEmpty();
        }
    }

    public class RegisterViewModelValidator : AbstractValidator<RegisterViewModel>
    {
        public RegisterViewModelValidator()
        {            
            RuleFor(r => r.UserName).NotEmpty();
            RuleFor(r => r.UserName).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .Must(BeAValidUserName)
                .WithMessage("There is an existing user with username: {0}", r => r.UserName)
                .When(r => String.IsNullOrEmpty(r.Id));
            RuleFor(r => r.Password)
                .NotEmpty()
                .Length(6, 15)
                .When(r => String.IsNullOrEmpty(r.Id));
            RuleFor(r => r.ConfirmPassword)
                .NotEmpty()
                .When(r => String.IsNullOrEmpty(r.Id)); ;
            RuleFor(r => r.Password)
                .Equal(r => r.ConfirmPassword)
                .WithMessage("Password and confirmation password is not equal.")
                .When(r => String.IsNullOrEmpty(r.Id));
            RuleFor(r => r.Roles).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .Must(BeValidRoles)
                .WithMessage("Some roles are not valid"); 
        }

        public bool BeAValidUserName(string userName)        
        {
            DB dbContext = new DB();
            User existing = dbContext.Set<User>()
                .Where(u => u.UserName == userName).FirstOrDefault();
            dbContext.Dispose();
            if (existing == null)
                return true;
            return false;
        }

        public bool BeValidRoles(List<string> roles)
        {
            List<string> validRoles = new List<string>() { Role.ADMIN };
            foreach (string role in roles)
            {
                if (!validRoles.Contains(role))
                    return false;
            }
            return true;
        }
    }

    public class DateTimeValidator<T> : PropertyValidator
    {
        public DateTimeValidator() : base("The value provided is not a valid date") { }

        protected override bool IsValid(PropertyValidatorContext context)
        {
            if (context.PropertyValue == null) return true;
            if (context.PropertyValue as DateTime? != null)
                return ((context.PropertyValue as DateTime?).Value != DateTime.MinValue);
            
            DateTime dt;
            return DateTime.TryParse(context.PropertyValue as string, out dt);
        }
    }

    public static class StaticDateTimeValidator
    {
        public static IRuleBuilderOptions<T, TProperty> IsValidDateTime<T, TProperty>(this IRuleBuilder<T, TProperty> ruleBuilder)
        {
            return ruleBuilder.SetValidator(new DateTimeValidator<TProperty>());
        }
    }

}