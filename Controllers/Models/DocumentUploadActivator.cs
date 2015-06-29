using App.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class DocumentUploadActivator<TDocumentUploadEntry> where TDocumentUploadEntry: class, IDocumentUploadEntry 
    {
        public void Activate(DbContext db, DocumentUpload doc)
        {
            var previousDoc = db.Set<DocumentUpload>().FirstOrDefault(d => d.IsActivated && d.Type == doc.Type && d.ApbnKey == doc.ApbnKey);
            if(previousDoc != null)
            {
                var previousEntries = db.Set<TDocumentUploadEntry>().Where(d => d.fkDocumentUploadId == previousDoc.Id);
                foreach(var entry in previousEntries)
                {
                    entry.IsActivated = false;
                    db.Entry(entry).State = EntityState.Modified;
                }
                previousDoc.IsActivated = false;
                previousDoc.DateActivated = DateTime.Now;
                db.Entry(previousDoc).State = EntityState.Modified;
            }
            var entries = db.Set<TDocumentUploadEntry>().Where(d => d.fkDocumentUploadId == doc.Id);
            foreach(var entry in entries)
            {
                entry.IsActivated = true;
                db.Entry(entry).State = EntityState.Modified;
            }
            doc.IsActivated = true;
            doc.DateActivated = DateTime.Now;
            db.Entry(doc).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}