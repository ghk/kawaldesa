using App.Models;
using Scaffold;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;

namespace App.Controllers
{
    public class APBDesController: ReadOnlyController<APBDes, long>
    {
        public APBDesController(DB dbContext)
            : base(dbContext)
        {
            AllowGetAll = false;
        }

        [HttpPost]
        [Authorize(Roles=Role.VOLUNTEER_ACCOUNT)]
        public async void UpdateSources()
        {
            var res = await new Uploader().PostFile<Blob>(Request);

            try
            {
                var apbdesID = long.Parse(res.Forms["ID"]);
                var sourceURL = res.Forms["SourceURL"];

                var fileResult = res.Files[0];
                var blob = new Blob(fileResult);

                var apbdes = dbSet.Find(apbdesID);
                if (apbdes.IsCompleted)
                    throw new ApplicationException("apbdes is completed");
                KawalDesaController.CheckRegionAllowed(dbContext, apbdes.fkRegionID);

                dbContext.Set<Blob>().Add(blob);

                apbdes.SourceURL = sourceURL;
                apbdes.fkSourceFileID = blob.ID;
                dbContext.Entry(apbdes).State = EntityState.Modified;

                fileResult.Move(blob.FilePath);

                dbContext.SaveChanges();

            }
            finally
            {
                res.DeleteUnmoved();
            }
        }

        [HttpPost]
        [Authorize(Roles=Role.VOLUNTEER_ACCOUNT)]
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
        //Holy! so much validation
        public void AddAccounts(long apbdesID, int type, List<Account> accounts)
        {
            var apbdes = Get(apbdesID);

            if (apbdes.IsCompleted)
                throw new ApplicationException("apbdes is completed");
            KawalDesaController.CheckRegionAllowed(dbContext, apbdes.fkRegionID);

            foreach(var account in accounts)
            {
                account.Code = Regex.Replace(account.Code, @"\s+", "");
                if (!Regex.IsMatch(account.Code, @"[\d\.]+"))
                    throw new ApplicationException(String.Format("invalid code {0}", account.Code));
            }

            var mismatchedType = accounts.FirstOrDefault(a => (int)a.Type != type);
            if(mismatchedType != null)
                throw new ApplicationException(String.Format("mismatched account {0} {1}", type, mismatchedType.Code));

            var mismatchedCode = accounts.FirstOrDefault(a => !a.Code.StartsWith(type+"."));
            if(mismatchedCode != null)
                throw new ApplicationException(String.Format("mismatched account code and type {0} {1}", type, mismatchedCode.Code));

            var allAccounts = apbdes.Accounts.Union(accounts).ToList();

            var duplicateCode = allAccounts.GroupBy(a => a.Code)
                .Where(g => g.Count() > 1)
                .Select(g => g.Key)
                .FirstOrDefault();
            if(duplicateCode != null)
                throw new ApplicationException(String.Format("duplicate account codes {1}", duplicateCode));

            foreach(var account in accounts)
            {
                var parentCode = account.ParentCode;
                if(!allAccounts.Any(a => a.Code == parentCode))
                    throw new ApplicationException(String.Format("parent account not exists for {1}", account.Code));
            }

            foreach(var account in accounts.OrderBy(a => a.Code))
            {
                var parentAccount = allAccounts.First(a => a.Code == account.ParentCode);
                account.fkParentAccountID = parentAccount.ID;
                account.fkAPBDesID = apbdes.ID;
                dbContext.Set<Account>().Add(account);
            }

            foreach(var account in accounts.OrderByDescending(a => a.Code))
            {
                var childAccounts = allAccounts.Where(a => a.ParentCode == account.Code).ToList();
                if(childAccounts.Count > 0)
                {
                    account.Target = childAccounts.Sum(c => c.Target);
                    dbContext.Entry(account).State = EntityState.Modified;
                }
            }

            dbContext.SaveChanges();
        }

        public APBDes GetByRegionID(long regionID)
        {
            return dbSet.Include(e => e.Accounts).FirstOrDefault(e => e.fkRegionID == regionID);
        }

    }
}