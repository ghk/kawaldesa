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

namespace App.Controllers
{
    public class APBDesController : ReadOnlyController<APBDes, long>
    {
        public APBDesController(DB dbContext)
            : base(dbContext)
        {
            AllowGetAll = false;
        }

        //public HttpResponseException CreateInputException(int index, String field, String message)
        //{
        //    var error = new HttpError(message) { {"Field", field }, {"Index", index} };
        //    return new HttpResponseException(
        //        ControllerContext.Request.CreateErrorResponse(
        //            HttpStatusCode.BadRequest,
        //            error));
        //}

        public HttpResponseException CreateInputExceptions(Dictionary<String, List<Dictionary<String, Object>>> exceptions)
        {
            var error = new HttpError("Error");

            foreach (var exception in exceptions)
            {
                error.Add(exception.Key, exception.Value);
            }

            return new HttpResponseException(
                ControllerContext.Request.CreateErrorResponse(
                    HttpStatusCode.BadRequest,
                    error));
        }

        [HttpPost]
        [Authorize(Roles = Role.VOLUNTEER_ACCOUNT)]
        public async void UpdateSources(Uploader uploader)
        {
            var res = await uploader.PostFile();

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
        //Holy! so much validation
        public void AddAccounts(long apbdesID, long rootAccountID, [FromBody] List<Account> accounts)
        {
            var apbdes = Get(apbdesID);
            var errors = new Dictionary<String, List<Dictionary<String, Object>>>();

            if (apbdes.IsCompleted)
                throw new ApplicationException("apbdes is completed");
            KawalDesaController.CheckRegionAllowed(dbContext, apbdes.fkRegionID);

            var rootAccount = dbContext.Set<Account>().Find(rootAccountID);
            var type = rootAccount.Type;

            foreach (var account in accounts)
            {
                if (!string.IsNullOrEmpty(account.Code))
                {
                    account.Code = Regex.Replace(account.Code, @"\s+", "");
                    account.Type = type;
                }
            }

            var existingAccounts = apbdes.Accounts
                .Where(a => a.Type == type)
                .ToList();

            var allAccounts = existingAccounts
                .Union(accounts)
                .ToList();

            var accountCodesSet = new HashSet<String>(existingAccounts.Select(e => e.Code));

            for (var i = 0; i < accounts.Count; i++)
            {
                var account = accounts[i];
                var errorList = new List<Dictionary<String, Object>>();
                if (string.IsNullOrWhiteSpace(account.Code))
                    errorList.Add(new Dictionary<String, Object>() { { "Field", "Code" }, { "Message", "Kode harus diisi" } });                    
                else if(!Regex.IsMatch(account.Code, @"[\d\.]+"))
                    errorList.Add(new Dictionary<String, Object>() { { "Field", "Code" }, { "Message", "Kode invalid" } });
                else if (accountCodesSet.Contains(account.Code))
                    errorList.Add(new Dictionary<String, Object>() { { "Field", "Code" }, { "Message", "Kode sudah terdaftar" } });
                
                if (string.IsNullOrWhiteSpace(account.Name))
                    errorList.Add(new Dictionary<String, Object>() { { "Field", "Name" }, { "Message", "Nama harus diisi" } });

                if (!account.Target.HasValue)
                    errorList.Add(new Dictionary<String, Object>() { { "Field", "Target" }, { "Message", "Target harus diisi" } });
                else if (account.Target.HasValue && account.Target.Value < 0)
                    errorList.Add(new Dictionary<String, Object>() { { "Field", "Target" }, { "Message", "Nilai target harus lebih dari 0" } });
                
                //throw CreateInputException(i, "Code", "Kode harus diisi"); 
                //throw CreateInputException(i, "Code", "Kode invalid");
                //throw CreateInputException(i, "Code", "Kode sudah terdaftar");
                //throw CreateInputException(i, "Name", "Nama harus diisi");
                //throw CreateInputException(i, "Target", "Nilai target harus lebih dari 0");

                if (errorList.Count > 0)
                {
                    errors.Add(i.ToString(), errorList);
                    continue;
                }
                
                accountCodesSet.Add(account.Code);

                var parentCode = account.ParentCode;
                if (!allAccounts.Any(a => a.Code == parentCode))
                    throw new ApplicationException(String.Format("parent account not exists for {1}", account.Code));

            }

            if (errors.Count > 0)
                throw CreateInputExceptions(errors);

            foreach (var account in accounts.OrderBy(a => a.Code))
            {
                var parentAccount = allAccounts.First(a => a.Code == account.ParentCode);
                account.fkParentAccountID = parentAccount.ID;
                account.fkAPBDesID = apbdes.ID;
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