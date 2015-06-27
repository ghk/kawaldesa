using FluentValidation;
using Scaffold.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Http.Validation;

namespace App.Models
{
    public class BaseTransaction : BaseEntity
    {
        [Required(ErrorMessage="Jumlah harus diisi")]
        [Range(0, double.MaxValue, ErrorMessage = "Jumlah harus merupakan angka dan positif")]
        public decimal Amount { get; set; }

        public DateTime Date { get; set; }

        [Index]
        public bool IsActivated { get; set; }

        public string SourceUrl { get; set; }

        [ForeignKey("SourceFile")]
        public long? fkSourceFileId { get; set; }
        public virtual Blob SourceFile { get; set; }

        [ForeignKey("Apbn")]
        public long fkApbnId { get; set; }
        public virtual Apbn Apbn { get; set; }

        [ForeignKey("Source")]
        public string fkSourceId { get; set; }
        public virtual Region Source { get; set; }
        
        [ForeignKey("Destination")]
        public string fkDestinationId { get; set; }
        public virtual Region Destination { get; set; }
        
        [ForeignKey("Account")]
        public long? fkAccountId { get; set; }
        public virtual Account Account { get; set; }

        [ForeignKey("Actor")]
        public string fkActorId { get; set; }
        public virtual Region Actor { get; set; }

        [ForeignKey("CreatedBy")]
        public string fkCreatedById { get; set; }
        public virtual User CreatedBy { get; set; }

        [ForeignKey("DocumentUpload")]
        public long? fkDocumentUploadId { get; set; }
        public virtual DocumentUpload DocumentUpload { get; set; }

        [Validator]
        public IEnumerable<ModelValidationResult> Validate()
        {
            if (fkSourceId != fkActorId && fkDestinationId != fkActorId)
                yield return new Invalid("fkActorID", "fkActorID must matched either fkDestinationID or fkSourceID");

        }
    }

    public class Transaction : BaseTransaction
    {
    }

    public class FrozenTransaction : BaseTransaction
    {
    }
}