using App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Controllers
{
    public class TransactionController: BaseController<Transaction, long>
    {
        public TransactionController(DB dbContext) : base(dbContext) {
            Include(t => t.Source, t => t.Destination, t => t.Proof);            
        }

        protected override void PrePersist(Transaction model)
        {
            model.Source = null;
            model.Destination = null;
            base.PrePersist(model);
        }

    }
}