using System;
using System.Web.Http;

namespace App.Utils.Spreadsheets
{
    public class SpreadsheetHeaderAttribute: Attribute 
    {
        public int? Width { get; set; }
        public string[] Values { get; set; }

        public SpreadsheetHeaderAttribute(int width, params string[] values)
        {
            this.Width = width;
           this.Values = values;
        }
        public SpreadsheetHeaderAttribute(params string[] values)
        {
           this.Values = values;
        }
    }
}