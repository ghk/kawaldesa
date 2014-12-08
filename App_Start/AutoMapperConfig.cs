using App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.App_Start
{
    public static class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            AutoMapper.Mapper.CreateMap<User, LoginViewModel>()
                .ForMember(login => login.UserName, opt => opt.MapFrom(user => user.UserName))
                .ReverseMap();

            AutoMapper.Mapper.CreateMap<User, UserViewModel>()
                .ForMember(view => view.Id, opt => opt.MapFrom(user => user.Id))
                .ForMember(view => view.UserName, opt => opt.MapFrom(user => user.UserName))
                .ForMember(view => view.Roles, opt => opt.Ignore());

        }
    }
}