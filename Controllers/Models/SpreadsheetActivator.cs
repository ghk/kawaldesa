using App.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace App.Controllers.Models
{
    public class SpreadsheetActivator<TSpreadsheetEntry> where TSpreadsheetEntry: class, ISpreadsheetEntry 
    {
        public void Activate(DbContext db, Spreadsheet doc)
        {
            var previousDoc = db.Set<Spreadsheet>().FirstOrDefault(d => d.IsActivated && d.Type == doc.Type && d.ApbnKey == doc.ApbnKey && d.fkRegionId == doc.fkRegionId);
            if(previousDoc != null)
            {
                var previousEntries = db.Set<TSpreadsheetEntry>().Where(d => d.fkSpreadsheetId == previousDoc.Id);
                foreach(var entry in previousEntries)
                {
                    entry.IsActivated = false;
                    db.Entry(entry).State = EntityState.Modified;
                }
                previousDoc.IsActivated = false;
                previousDoc.DateActivated = DateTime.Now;
                db.Entry(previousDoc).State = EntityState.Modified;
            }
            var entries = db.Set<TSpreadsheetEntry>().Where(d => d.fkSpreadsheetId == doc.Id);
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