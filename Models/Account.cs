using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Account : BaseEntity
    {
        [Index("IX_Code_Type_fkAPBDesID", 1, IsUnique=true)]
        public String Code { get; set; }

        public String Name { get; set; }

        [Index("IX_Code_Type_fkAPBDesID", 2, IsUnique=true)]
        [Index]
        public AccountType Type { get; set; }
        public ExpenseType? ExpenseType { get; set; }
        [Index]
        public ExpenseGroup? ExpenseGroup { get; set; }
        public decimal? Target { get; set; }

        [Index]
        public bool IsActivated { get; set; }
        public DateTime? DateDeactivated { get; set; }

        [Index("IX_TargetSource_fkAPBDesID", 1, IsUnique=true)]
        public String TargetSource { get; set; }

        [ForeignKey("ParentAccount")]
        public long? fkParentAccountID { get; set; }
        public virtual Account ParentAccount { get; set; }
        public virtual List<Account> ChildAccounts { get; set; }
        
        [Index("IX_TargetSource_fkAPBDesID", 2, IsUnique=true)]
        [Index("IX_Code_Type_fkAPBDesID", 3, IsUnique=true)]
        [Index]
        [ForeignKey("APBDes")]
        public long fkAPBDesID { get; set; }
        public virtual APBDes APBDes { get; set; }

        [ForeignKey("CreatedBy")]
        public string fkCreatedByID { get; set; }
        public virtual User CreatedBy { get; set; }

        [ForeignKey("ModifiedBy")]
        public string fkModifiedByID { get; set; }
        public virtual User ModifiedBy { get; set; }

        [ForeignKey("DeactivatedBy")]
        public string fkDeactivatedByID { get; set; }
        public virtual User DeactivatedBy { get; set; }

        public String ParentCode
        {
            get
            {
                if (!Code.Contains('.'))
                    return null;
                return Code.Substring(0, Code.LastIndexOf('.'));
            }
        }
    }
}