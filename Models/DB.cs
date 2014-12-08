using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;

namespace App.Models
{
    public class DB : DbContext 
    {
        public DB(): base("DefaultConnection") { }
        public virtual IDbSet<Blob> Blobs { get; set; }
        public virtual IDbSet<User> Users { get; set; }
        public virtual IDbSet<Transaction> Transactions  { get; set; }
        public virtual IDbSet<Region> Regions { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityUserLogin>().HasKey(i => i.UserId);
            modelBuilder.Entity<IdentityRole>().HasKey(i => i.Id);
            modelBuilder.Entity<IdentityUserRole>().HasKey(i => new { i.RoleId, i.UserId });
        }

        protected override DbEntityValidationResult ValidateEntity(DbEntityEntry entityEntry, IDictionary<object, object> items) 
        {
            return base.ValidateEntity(entityEntry, items);
        }

        public override int SaveChanges()
        {
            foreach (var entity in ChangeTracker.Entries<BaseEntity>())
            {
                if (entity.State == EntityState.Added)
                    entity.Entity.DateCreated = DateTime.Now;
                else
                    entity.Property(p => p.DateCreated).IsModified = false;                    
                entity.Entity.DateModified = DateTime.Now;                    
            }            
            return base.SaveChanges();
        }
    }
}