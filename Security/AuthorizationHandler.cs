using App.Controllers;
using App.Models;
using App.Security;
using log4net;
using log4net.Repository.Hierarchy;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;

namespace App.Security
{
    public class AuthorizationHandler: DelegatingHandler, IRequiresSessionState
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            using (var db = new DB())
            {
                IEnumerable<string> authorizationHeaderValues = null;
                if (request.Headers.TryGetValues("Authorization", out authorizationHeaderValues))
                {
                    try
                    {
                        var auth = authorizationHeaderValues.First().Split(null)[1];
                        var token = JsonWebToken.Decode(auth, ConfigurationManager.AppSettings["Auth.SecretKey"]);
                        var userManager = new UserManager<User>(new CUserStore<User>(db));
                        var user = userManager.FindById(token.UserId);
                        if (user != null)
                        {
                            var identity = new KawalDesaIdentity(user, "exAuth");
                            var principal = new GenericPrincipal(identity, userManager.GetRoles(user.Id).ToArray());
                            Thread.CurrentPrincipal = principal;
                            if (HttpContext.Current != null)
                            {
                                HttpContext.Current.User = principal;
                            }
                        }
                    }
                    catch (Exception e)
                    {
                        LogManager.GetLogger(typeof(AuthorizationHandler)).Error("Auth error", e);
                    }
                }
                else if (HttpContext.Current.Session != null && !String.IsNullOrEmpty((string)HttpContext.Current.Session[KawalDesaController.USERID_KEY]))
                {
                    var session = HttpContext.Current.Session;
                    var userManager = new UserManager<User>(new CUserStore<User>(db));
                    var user = userManager.FindById((string)session[KawalDesaController.USERID_KEY]);
                    if (user != null)
                    {
                        var identity = new KawalDesaIdentity(user, "Session");
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
        }


    }
}