namespace App.Migrations
{
    using Models;
    using Microsoft.AspNet.Identity;
    using System;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DB>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
            SetSqlGenerator("Npgsql", new Npgsql.NpgsqlMigrationSqlGenerator());
        }
        protected override void Seed(DB context)
        {
            var UserManager = new UserManager<User>(new CUserStore<User>(context));
            var RoleManager = new RoleManager<Role>(new CRoleStore<Role>(context));

            string name = "admin";
            string password = "123456";

            var roleNames = new string[]{
                Role.ADMIN,
                Role.VOLUNTEER, Role.VOLUNTEER_TRANSFER,  Role.VOLUNTEER_DESA, 
                Role.VOLUNTEER_ACCOUNT, Role.VOLUNTEER_REALIZATION, Role.ORGANIZATION_ADMIN,
                Role.VOLUNTEER_ALLOCATION
            };

            foreach(var roleName in roleNames)
            {
                if (!RoleManager.RoleExists(roleName))
                {
                    var roleresult = RoleManager.Create(new Role(roleName));
                }
            }

            //Create User=Admin with password=123456
            var user = new User();
            user.SecretKey = "XYzjd4k85UWPG9Sf4MQSxjvuT9TaWtLn+lZXSoKkPh2hjYGenKmW9nZJ8KXuZFVrXeM6bptMchJj2qHgEvpUoxCE1iK9LYlPJQ4Dw7PAGprMkfnhKjy6J94jmdYZSwEdLW7NZFY4fLVST3Wz9LzUpDM0wYiN7K45+dRH+owPZunaa13buYafoQZCIjKS3BPOih8lTfbfRhKrK40wM5xgLgBL3AWUuRJ7WTQAeMB+Wckusfud5f0PeTSE5qKb0LVnVvnyOoveQwuRdxzxwqakEk5eHF9c+6MG/91m+ESynkzdbv7+a6ux19rlYHTMam8D1ntoxeZyRbOA/ygEn3UFzzeZCnswpMgEeiHaqXl9SWcqizqLCPNz/u63dGjQRGr1rKgTjyWJ5NiprO79arWxFFZkPv4G5MRZdYvt9KFmIe4O7WhQ1Hl2WBv8rwTzsBDjDHj4VxmnPiJW0dJnQI9k90I6CXTa3YEGsUpEvTqvyBPp2C7ZjWQyJ4xoxZLLlk/Z/2S722VIdKuzYJoozZqzEAoFNhOQnNJwtgujtg14FVoELR1tzZaXmJHaZIlFbjqRwSBeGWO8wgJb1vsIo7OfW7UGAFPn3PzUgvD+fMasZi93K2Ur6lz7IbdPoAqFiZhBoEgEz6bK5gYOzVTWkybIpHli6u+fDaw3IA0Xvxk+WFg=";
            user.UserName = name;
            user.Name = name;
            user.Id = Guid.NewGuid().ToString();
            var adminresult = UserManager.Create(user, password);

            //Add User Admin to Role Admin
            if (adminresult.Succeeded)
            {
                var result = UserManager.AddToRole(user.Id, Role.ADMIN);
            }

            /*
            var volunteer = new User();
            volunteer.UserName = volunteer.Name = "volunteer";
            var viewerresult = UserManager.Create(volunteer, "123456");

            if (viewerresult.Succeeded)
            {
                var result2 = UserManager.AddToRole(volunteer.Id, Role.VOLUNTEER);
            }

            */
            if(context.Apbns.Count() < 2)
            {
                context.Apbns.Add(new Apbn
                {
                    Year = 2015,
                    Key = "2015",
                });
                context.Apbns.Add(new Apbn
                {
                    Year = 2015,
                    Key = "2015p",
                    IsPerubahan = true,
                });
            }

            //DocumentUploadController.GenDanaDesaKab(context, "2015p");

            base.Seed(context);

        }
    }
}
