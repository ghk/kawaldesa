using System.Collections.Generic;
using System.Web.Http;
using App.Models;

namespace App.Controllers
{
    public class EnumController : ApiController
    {
        [System.Web.Http.HttpGet]
        public IEnumerable<NumericValueSelectListItem> GetCreditType()
        {
            List<NumericValueSelectListItem> result = new List<NumericValueSelectListItem>();

            return result;            
        }
    }

    public class NumericValueSelectListItem
    {
        public string Text { get; set; }
        public int Value { get; set; }
    }

    public class StringValueSelectListItem
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }
}
