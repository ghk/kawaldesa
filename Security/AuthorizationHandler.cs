using App.Models;
using App.Security;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace App.Security
{
    public class AuthorizationHandler: DelegatingHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            IEnumerable<string> userNameHeaderValues = null;
            if (request.Headers.TryGetValues(EmissHeaders.X_EMISS_USERNAME, out userNameHeaderValues))
            {
                if (!IsValidEmissRequest(request))
                {
                    var response = request.CreateErrorResponse(HttpStatusCode.BadRequest, "Not a Valid Request");
                    return Task.FromResult<HttpResponseMessage>(response);
                }

                IEnumerable<String> expireHeaderValues = null;
                if (request.Headers.TryGetValues(EmissHeaders.X_EMISS_EXPIRES, out expireHeaderValues))
                {
                    if (IsExpiredRequest(expireHeaderValues.FirstOrDefault()))
                    {
                        var response = request.CreateErrorResponse(HttpStatusCode.BadRequest, "Your Request Has Expired");
                        return Task.FromResult<HttpResponseMessage>(response);                        
                    }
                }

                var userName = userNameHeaderValues.First();                
                var userManager = new UserManager<User>(new UserStore<User>(new DB()));
                var user = userManager.FindByName(userName);
                if (user != null) 
                {
                    string signature = CryptographyHelper.Sign(request, user.SecretKey);
                    if (signature.Equals(request.Headers.GetValues(EmissHeaders.X_EMISS_SIGNATURE).FirstOrDefault()))
                    {
                        var identity = new LombokIdentity(user, "Emiss");
                        var principal = new GenericPrincipal(identity, userManager.GetRoles(user.Id).ToArray());
                        Thread.CurrentPrincipal = principal;
                        if (HttpContext.Current != null)
                        {
                            HttpContext.Current.User = principal;
                        }
                    }     
                }
            }             
            else if (HttpContext.Current.Session != null && !String.IsNullOrEmpty((string)HttpContext.Current.Session["username"]))
            {
                var session = HttpContext.Current.Session;                
                var userManager = new UserManager<User>(new UserStore<User>(new DB()));
                var user = userManager.FindByName((string)session["username"]);
                if (user != null)
                {
                    var identity = new LombokIdentity(user, "Session");
                    var principal = new GenericPrincipal(identity, userManager.GetRoles(user.Id).ToArray());
                    Thread.CurrentPrincipal = principal;
                    if (HttpContext.Current != null)
                    {
                        HttpContext.Current.User = principal;
                    }
                }
            }

            return base.SendAsync(request, cancellationToken);
        }

        private bool IsValidEmissRequest(HttpRequestMessage request)
        {
            IEnumerable<string> headerValues = null;
            if (request.Headers.TryGetValues(EmissHeaders.X_EMISS_EXPIRES, out headerValues) &&
                request.Headers.TryGetValues(EmissHeaders.X_EMISS_SIGNATURE, out headerValues) &&
                request.Headers.TryGetValues(EmissHeaders.X_EMISS_USERNAME, out headerValues))
                return true;

            return false;
        }

        private bool IsExpiredRequest(String expireString)
        {            
            int expire = 0;
            if (!int.TryParse(expireString, out expire))
                return true;

            TimeSpan now = DateTime.UtcNow - new DateTime(1970, 1, 1);
            if ((int)now.TotalSeconds < expire)
                return false;
            else
                return true;
        }

    }
}