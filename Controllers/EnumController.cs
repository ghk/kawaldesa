using System.Collections.Generic;
using System.Web.Http;
using App.Models;

namespace App.Controllers
{
    public class EnumController : ApiController
    {
        [System.Web.Http.HttpGet]
        public IEnumerable<NumericValueSelectListItem> GetRegionType()
        {
            List<NumericValueSelectListItem> result = new List<NumericValueSelectListItem>();
            result.Add(new NumericValueSelectListItem()
            {
                Text = RegionType.DESA.ToString(),
                Value = (int)RegionType.DESA
            });

            result.Add(new NumericValueSelectListItem()
            {
                Text = RegionType.KABUPATEN.ToString(),
                Value = (int)RegionType.KABUPATEN
            });

            result.Add(new NumericValueSelectListItem()
            {
                Text = RegionType.PROPINSI.ToString(),
                Value = (int)RegionType.PROPINSI
            });

            result.Add(new NumericValueSelectListItem()
            {
                Text = RegionType.NASIONAL.ToString(),
                Value = (int)RegionType.NASIONAL
            });
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
