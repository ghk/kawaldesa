using Scaffold;
using System;

namespace App.Models
{
    //TODO: hack for Model.tt, remove this later
    public class HampirBaseEntity: IModel<long>
    {
        public virtual long ID { get; set; }
    }
}