using Scaffold;
using System;

namespace App.Models
{
    public class BaseEntity: IModel<long>
    {
        public virtual long ID { get; set; }
        public virtual DateTime DateCreated { get; set; }
        public virtual DateTime DateModified { get; set; }
    }
}