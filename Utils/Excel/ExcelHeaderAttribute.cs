using System;
using System.Web.Http;

namespace App.Utils.Excel
{
    public class ExcelHeaderAttribute: Attribute 
    {
        public int? Width { get; set; }
        public string[] Values { get; set; }

        public ExcelHeaderAttribute(int width, params string[] values)
        {
            this.Width = width;
           this.Values = values;
        }
        public ExcelHeaderAttribute(params string[] values)
        {
           this.Values = values;
        }
    }
}