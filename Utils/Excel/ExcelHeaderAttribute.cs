using System;
using System.Web.Http;

namespace App.Utils.Excel
{
    public class ExcelHeaderAttribute: Attribute 
    {
        public string[] Values { get; set; }

        public ExcelHeaderAttribute(params string[] values)
        {
           this.Values = values;
        }
    }
}