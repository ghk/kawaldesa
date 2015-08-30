using App.Models;
using AutoMapper;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Utils
{

    /// <summary>
    /// Anonymous things
    /// </summary>
    public class JsonAnonymouser: JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(User) || objectType == typeof(UserViewModel);
        }

        public override bool CanRead
        {
            get { return false; }
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if(value != null)
            {
                if(value.GetType() == typeof(User))
                {
                    var modified = Mapper.Map<User>(value);
                    if(modified.IsAnonymous)
                    {
                        modified.Name = "Anonim";
                        modified.UserName = null;
                        modified.Email = null;
                        modified.FacebookId = null;
                    }
                    JToken t = JToken.FromObject(modified);
                    t.WriteTo(writer);
                }
                if(value.GetType() == typeof(UserViewModel))
                {
                    var modified = Mapper.Map<UserViewModel>(value);
                    if(modified.IsAnonymous)
                    {
                        modified.Name = "Anonim";
                        modified.UserName = null;
                        modified.FacebookId = null;
                    }
                    JToken t = JToken.FromObject(modified);
                    t.WriteTo(writer);
                }
            }
        }
    }
}