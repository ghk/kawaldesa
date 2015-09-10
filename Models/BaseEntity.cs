using Microvac.Web;
using System;

namespace App.Models
{
    public class BaseEntity: IModel<long>
    {
        public virtual long Id { get; set; }

        public DateTime DateCreated { get; set; }
 
        public DateTime DateModified { get; set; }
    }
}