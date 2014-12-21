using Scaffold;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Recapitulation : HampirBaseEntity
    {
        public override long ID { get; set; }
        public long RegionID { get; set; }
        public long APBNID { get; set; }
        public int APBNYear { get; set; }
        public long? ParentRegionID { get; set; }
        public string RegionName { get; set; }
        public decimal BudgetedAPBN { get; set; }
        public decimal TransferredAPBN { get; set; }
        public decimal AcknowledgedAPBN { get; set; }
        public decimal BudgetedADD { get; set; }
        public decimal TransferredADD { get; set; }
        public decimal AcknowledgedADD { get; set; }

        [NotMapped]
        public decimal BudgettedTotal
        {
            get
            {
                return BudgetedAPBN + BudgetedADD;
            }
        }

        [NotMapped]
        public decimal TransferredTotal
        {
            get
            {
                return TransferredAPBN + TransferredADD;
            }
        }

        [NotMapped]
        public decimal AcknowledgedTotal
        {
            get
            {
                return AcknowledgedAPBN + AcknowledgedADD;
            }
        }

    }

    public class LiveRecapitulation: HampirBaseEntity
    {
        public override long ID { get; set; }
        public long RegionID { get; set; }
        public long APBNID { get; set; }
        public int APBNYear { get; set; }
        public long? ParentRegionID { get; set; }
        public string RegionName { get; set; }
        public decimal BudgetedAPBN { get; set; }
        public decimal TransferredAPBN { get; set; }
        public decimal AcknowledgedAPBN { get; set; }
        public decimal BudgetedADD { get; set; }
        public decimal TransferredADD { get; set; }
        public decimal AcknowledgedADD { get; set; }

        [NotMapped]
        public decimal BudgettedTotal
        {
            get
            {
                return BudgetedAPBN + BudgetedADD;
            }
        }

        [NotMapped]
        public decimal TransferredTotal
        {
            get
            {
                return TransferredAPBN + TransferredADD;
            }
        }

        [NotMapped]
        public decimal AcknowledgedTotal
        {
            get
            {
                return AcknowledgedAPBN + AcknowledgedADD;
            }
        }
    }

}