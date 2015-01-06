using App.Models;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using System.Net.Http;
using System.Net;
using Scaffold.Validation;
using Scaffold.ControllerExtensions;

namespace App.Controllers.Models
{
    public class APBDesController : ReadOnlyController<APBDes, long>
    {
        public APBDesController(DB dbContext)
            : base(dbContext)
        {
            AllowGetAll = false;
        }


        [HttpPost]
        [Authorize(Roles = Role.VOLUNTEER_ACCOUNT)]
        public void UpdateSources(Multipart multipart)
        {
            try
            {
                var apbdesID = long.Parse(multipart.Forms["ID"]);
                var sourceURL = multipart.Forms["SourceURL"];

                var apbdes = dbSet.SelectOne(apbdesID, 
                    s => new { s.IsCompleted, s.fkRegionID });
                if (apbdes.IsCompleted)
                    throw new ApplicationException("apbdes is completed");
                KawalDesaController.CheckRegionAllowed(dbContext, apbdes.fkRegionID);

                var fileResult = multipart.Files[0];
                var blob = new Blob(fileResult);
                dbContext.Set<Blob>().Add(blob);

                Update(apbdesID)
                    .Set(e => e.SourceURL, sourceURL)
                    .Set(e => e.fkSourceFileID, blob.ID)
                    .Save();

                fileResult.Move(blob.FilePath);
            }
            finally
            {
                multipart.DeleteUnmoved();
            }
        }

        [HttpPost]
        [Authorize(Roles = Role.VOLUNTEER_ACCOUNT)]
        public void Complete(long apbdesID)
        {
            var apbdes = dbSet.Find(apbdesID);
            if (apbdes.IsCompleted)
                throw new ApplicationException("apbdes is completed");
            KawalDesaController.CheckRegionAllowed(dbContext, apbdes.fkRegionID);

            apbdes.IsCompleted = true;
            dbContext.Entry(apbdes).State = EntityState.Modified;
            dbContext.SaveChanges();
        }

        [HttpPost]
        public void AddAccounts(long apbdesID, long rootAccountID, [FromBody] List<Account> accounts)
        {
            /* Fetches */

            var apbdes = Get(apbdesID);
            if (apbdes.IsCompleted)
                throw new ApplicationException("apbdes is completed");
            KawalDesaController.CheckRegionAllowed(dbContext, apbdes.fkRegionID);

            var rootAccount = dbContext.Set<Account>().Find(rootAccountID);

            var existingAccounts = apbdes.Accounts
                .Where(a => a.Type == rootAccount.Type)
                .ToList();

            var allAccounts = existingAccounts
                .Union(accounts)
                .ToList();

            /* Cleanups */

            foreach (var account in accounts)
            {
                if (!string.IsNullOrEmpty(account.Code))
                {
                    account.Code = Regex.Replace(account.Code, @"\s+", "");
                    account.Type = rootAccount.Type;
                    account.fkAPBDesID = apbdes.ID;
                }
            }

            /* Validate */

            this.ModelState.Clear();
            this.Validate(accounts);
            if (!ModelState.IsValid)
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));

            var invalids = new List<Invalid>();

            var accountCodesSet = new HashSet<String>(existingAccounts.Select(e => e.Code));
            for (var i = 0; i < accounts.Count; i++)
            {
                var field = String.Format("[{0}].{1}", i, "Code");
                var account = accounts[i];

                if (!Regex.IsMatch(account.Code, @"[\d\.]+"))
                    invalids.Add(new Invalid(field, "Kode tidak valid"));  
  
                if (accountCodesSet.Contains(account.Code))
                    invalids.Add(new Invalid(field, "Kode sudah terdaftar"));  
               
                accountCodesSet.Add(account.Code);
                
                var parentCode = account.ParentCode;
                if (!allAccounts.Any(a => a.Code == parentCode))
                    invalids.Add(new Invalid(field, "Anggaran tidak mempunyai induk anggaran")); 
            }

            this.ValidateWith(invalids);

            /* Persist */

            foreach (var account in accounts.OrderBy(a => a.Code))
            {
                var parentAccount = allAccounts.First(a => a.Code == account.ParentCode);
                account.fkParentAccountID = parentAccount.ID;

                dbContext.Set<Account>().Add(account);
                dbContext.SaveChanges();
            }

            foreach (var account in accounts.OrderByDescending(a => a.Code))
            {
                var childAccounts = allAccounts.Where(a => a.ParentCode == account.Code).ToList();
                if (childAccounts.Count > 0)
                {
                    account.Target = null;
                    dbContext.Entry(account).State = EntityState.Modified;
                    dbContext.SaveChanges();
                }
            }
        }

        public APBDes GetByRegionID(long regionID)
        {
            return dbSet.Include(e => e.Accounts).FirstOrDefault(e => e.fkRegionID == regionID);
        }

    }
}