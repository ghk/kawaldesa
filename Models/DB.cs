using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq.Expressions;
using System.Web;

namespace App.Models
{
    public class DB : DbContext 
    {
        public DB(): base("DefaultConnection") {
            Database.Log = m => System.Diagnostics.Debug.WriteLine(m);
        }
        public virtual IDbSet<Blob> Blobs { get; set; }
        public virtual IDbSet<User> Users { get; set; }
        public virtual IDbSet<UserScope> UserScopes { get; set; }
        public virtual IDbSet<Region> Regions { get; set; }
        public virtual IDbSet<APBN> APBNs { get; set; }
        public virtual IDbSet<APBD> APBDs { get; set; }
        public virtual IDbSet<APBDFile> APBDFiles { get; set; }
        public virtual IDbSet<APBDes> APBDeses { get; set; }
        public virtual IDbSet<Account> Accounts { get; set; }
        public virtual IDbSet<Realization> Realizations { get; set; }
        public virtual IDbSet<Transaction> Transactions  { get; set; }
        public virtual IDbSet<FrozenTransaction> FrozenTransactions  { get; set; }
        public virtual IDbSet<TransactionFile> TransactionFiles { get; set; }
        public virtual IDbSet<TransferRecapitulation> TransferRecapitulations { get; set; }
        public virtual IDbSet<FrozenTransferRecapitulation> FrozenTransferRecapitulations { get; set; }
        public virtual IDbSet<AccountRecapitulation> AccountRecapitulations { get; set; }
        public virtual IDbSet<FrozenAccountRecapitulation> FrozenAccountRecapitulations { get; set; }
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

    public static class DbContextExtensions
    {
        public static void Update<T>(this DbContext dbContext, T entity, params Expression<Func<T, object>>[] getUpdatedFields)
            where T: class
        {
            if (getUpdatedFields.Length == 0)
                return;
            dbContext.Set<T>().Attach(entity);
            foreach (var getUpdatedField in getUpdatedFields)
                dbContext.Entry<T>(entity).Property(getUpdatedField).IsModified = true;
            dbContext.SaveChanges();
        }
    }
}