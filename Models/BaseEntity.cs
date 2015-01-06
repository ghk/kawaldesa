using Scaffold;
using System;

namespace App.Models
{
    public class BaseEntity: IModel<long>
    {
        public virtual long ID { get; set; }

        public DateTime DateCreated { get; set; }
 
        public DateTime DateModified { get; set; }
    }
}