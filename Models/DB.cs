using Microsoft.AspNet.Identity.EntityFramework;
using Microvac.Web;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq.Expressions;
using System.Web;
using System.Text.RegularExpressions;
using System.Data.Entity.Infrastructure.Pluralization;
using System.Data.Entity.ModelConfiguration.Conventions;
using App.Models.Views;

namespace App.Models
{
    public class DB : DbContext 
    {
        public DB(): base("DefaultConnection") {
            Database.Log = m => System.Diagnostics.Debug.WriteLine(m);
        }
        public virtual IDbSet<Blob> Blobs { get; set; }
        public virtual IDbSet<FieldReport> FieldReport { get; set; }
        public virtual IDbSet<User> Users { get; set; }
        public virtual IDbSet<Role> Roles { get; set; }
        public virtual IDbSet<UserRole> UserRoles { get; set; }
        public virtual IDbSet<UserScope> UserScopes { get; set; }
        public virtual IDbSet<Organization> Organizations { get; set; }
        public virtual IDbSet<Region> Regions { get; set; }
        public virtual IDbSet<RegionSearchResult> RegionSearchResults { get; set; }
        public virtual IDbSet<Apbn> Apbns { get; set; }
        public virtual IDbSet<Apbd> Apbds { get; set; }
        public virtual IDbSet<SourceDocument> SourceDocument { get; set; }
        public virtual IDbSet<Spreadsheet> Spreadsheets { get; set; }
        public virtual IDbSet<SpreadsheetWorkItem> SpreadsheetWorkItems { get; set; }
        public virtual IDbSet<SpreadsheetWorkDir> SpreadsheetWorkDirs { get; set; }
        public virtual IDbSet<NationalDdAllocation> NationalDdAllocations { get; set; }
        public virtual IDbSet<NationalAddAllocation> NationalAddAllocations { get; set; }
        public virtual IDbSet<NationalBhprAllocation> NationalBhprAllocations { get; set; }
        public virtual IDbSet<RegionalDdAllocation> RegionalDdAllocations { get; set; }
        public virtual IDbSet<RegionalAddAllocation> RegionalAddAllocations { get; set; }
        public virtual IDbSet<RegionalBhprAllocation> RegionalBhprAllocations { get; set; }
        public virtual IDbSet<Transfer> Transfers  { get; set; }
        public virtual IDbSet<Apbdes> Apbdeses { get; set; }
        public virtual IDbSet<Account> Accounts { get; set; }
        public virtual IDbSet<Realization> Realizations { get; set; }
        public virtual IDbSet<Transaction> Transactions  { get; set; }
        public virtual IDbSet<TransferRecapitulation> TransferRecapitulations { get; set; }
        public virtual IDbSet<TransferProgress> TransferProgresses { get; set; }
        public virtual IDbSet<AccountRecapitulation> AccountRecapitulations { get; set; }
        public virtual IDbSet<NationalAddRecapitulation> NationalAddRecapitulations { get; set; }
        public virtual IDbSet<NationalBhprRecapitulation> NationalBhprRecapitulations { get; set; }
        public virtual IDbSet<NationalDdRecapitulation> NationalDdRecapitulations { get; set; }
        public virtual IDbSet<RegionalAddRecapitulation> RegionalAddRecapitulations { get; set; }
        public virtual IDbSet<RegionalBhprRecapitulation> RegionalBhprRecapitulations { get; set; }
        public virtual IDbSet<RegionalDdRecapitulation> RegionalDdRecapitulations { get; set; }
        public virtual IDbSet<InvitationToken> InvitationTokens { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Types()
            .Configure(c => c.ToTable(GetTableName(c.ClrType.Name), "public"));
            modelBuilder.Conventions.Add<CustomKeyConvention>();
            modelBuilder.Entity<IdentityUserLogin>().HasKey(i => i.UserId);
            modelBuilder.Entity<Role>().HasKey(i => i.Id);
            modelBuilder.Entity<UserRole>().HasKey(i => new { i.RoleId, i.UserId });
        }
        public static string GetTableName(String typeName) 
        {
            var pluralizationService = (IPluralizationService) 
                DbConfiguration.DependencyResolver.GetService(typeof(IPluralizationService), "plural");

            var result = pluralizationService.Pluralize(typeName);

            result = Regex.Replace(result, ".[A-Z]", m => m.Value[0] + "_" + m.Value[1]);

            return result.ToLower(); 
        }
        public static string GetColumnName(String typeName) 
        {
            var result = typeName;

            result = Regex.Replace(result, ".[A-Z]", m => m.Value[0] + "_" + m.Value[1]);

            return result.ToLower(); 
        }

        public class CustomKeyConvention : Convention
        {
            public CustomKeyConvention()
            {
                Properties()
                    .Configure(config => config.HasColumnName(DB.GetColumnName(config.ClrPropertyInfo.Name)));
            }
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
    public static class DbSetExtensions
    {
        public static TSelect SelectOne<TEntity, TSelect>(this DbSet<TEntity> dbSet, 
            long id, Func<TEntity, TSelect> select)
            where TEntity: class, IModel<long>
        {
            return dbSet
                .AsNoTracking()
                .Where(e => e.Id == id)
                .Select(select)
                .FirstOrDefault();
        }
    }
}