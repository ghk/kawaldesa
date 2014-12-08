using App.Models;
using System.Security.Principal;

namespace App.Security
{
    public class LombokIdentity : GenericIdentity
    {
        public User User { get; set; }
        
        public LombokIdentity(User user, string type): base(user.UserName, type) 
        {
            User = user;
        }
    }

}