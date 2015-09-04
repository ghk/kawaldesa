using System;
using System.Web.Http;

namespace App.Utils.Spreadsheets
{
    public class SpreadsheetFileNameAttribute: Attribute
    {
        public string Value { get; set; }

        public SpreadsheetFileNameAttribute(string value)
        {
           this.Value = value;
        }
    }
}