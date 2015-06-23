using System;
using System.Web.Http;

namespace App.Utils.Excel
{
    public class ExcelFileNameAttribute: Attribute
    {
        public string Value { get; set; }

        public ExcelFileNameAttribute(string value)
        {
           this.Value = value;
        }
    }
}