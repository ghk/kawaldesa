using App.Models;
using App.Security;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using AuthorizeAttribute = System.Web.Http.AuthorizeAttribute;
using System.Linq.Expressions;
using log4net;

namespace App.Controllers.Models
{
    public class BaseController<TModel, TId> : CRUDController<TModel, TId>
        where TModel : class, IModel<TId>, new()
    {
        public BaseController(DbContext dbContext) : base(dbContext)                 
        {
            dbContext.Configuration.ProxyCreationEnabled = false;
        }

        [KawalDesaAuthorize(Roles = Role.ADMIN)]
        public override TId Post(TModel model)        
        {
            return base.Post(model);
        }

        [KawalDesaAuthorize(Roles = Role.ADMIN)]
        public override void Put(TModel model)
        {
            base.Put(model);
        }

        [KawalDesaAuthorize(Roles = Role.ADMIN)]
        public override void Delete(TId id)
        {
            base.Delete(id);
        }

        public override TModel Get(TId id)
        {
            return base.Get(id);
        }

        public override long GetCount()
        {
            return base.GetCount();
        }

        public override IQueryable<TModel> GetAll()
        {
            return base.GetAll();
        }

        protected virtual void ValidateModel(TModel model)
        {
            ModelState.Clear();
            Validate(model);
        }
    }
}