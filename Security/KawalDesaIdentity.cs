using App.Models;
using System.Security.Principal;

namespace App.Security
{
    public class KawalDesaIdentity : GenericIdentity
    {
        public User User { get; set; }
        
        public KawalDesaIdentity(User user, string type): base(user.UserName, type) 
        {
            User = user;
        }
    }

}