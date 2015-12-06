using App.Models;
using log4net;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using App.Security;
using System.Web.Script.Serialization;
using System.Configuration;
using System.Security.Principal;
using App.Mailers;
using App.Utils;
using System.Web;

namespace App.Controllers
{
    public class KawalDesaController : Controller
    {
        private static ILog logger = LogManager.GetLogger(typeof(KawalDesaController));
        public static string USERID_KEY = "userid";

        private readonly string FacebookClientIDConfig = "Facebook.ClientID";
        private readonly string FacebookSecretKeyConfig = "Facebook.SecretKey";
        private readonly string FacebookUseInDebugConfig = "Facebook.UseInDebug";
        private readonly string AuthenticatedCookie = "kd-auth";

        [AllowAnonymous]
        public ActionResult Index()
        {
            TempData["isUserFoundError"] = true;
            var anonymousHost = ConfigurationManager.AppSettings["AnonymousHost"];
            var user = GetUserDictFromSession();

            var hasAuthCookie =Request.Cookies.AllKeys.Contains(AuthenticatedCookie);
            if(user == null && hasAuthCookie)
            {
                RemoveAuthenticatedCookie();
                hasAuthCookie = false;
            }
           
            if(anonymousHost != null && !hasAuthCookie)
            {
                if(user != null)
                {
                    AddAuthenticatedCookie();
                }
                else if(!Request.QueryString.AllKeys.Contains("anonForce"))
                {
                    return Redirect(RedirectAnonymous(anonymousHost));
                }
            }

            ViewData["User"] = new JavaScriptSerializer().Serialize(user);
            using (var db = new DB())
            {
                ViewData["Data"] = new JavaScriptSerializer().Serialize(new Dictionary<string, object>
                {
                    { "InScopeKabCount", db.Regions.Count(r => r.IsInScope) },
                    { "TransferCount", db.Transfers.Count(t => t.IsActivated) },
                });
            }
            return View();
        }

        private void AddAuthenticatedCookie()
        {
            HttpCookie cookie = new HttpCookie(AuthenticatedCookie);
            cookie.Value = "true";
            cookie.Domain = ConfigurationManager.AppSettings["AuthenticatedCookie.Domain"];
            cookie.Path = "/";
            this.ControllerContext.HttpContext.Response.Cookies.Add(cookie);
        }

        private void RemoveAuthenticatedCookie()
        {
            HttpCookie cookie = new HttpCookie(AuthenticatedCookie);
            if (ControllerContext.HttpContext.Response.Cookies.AllKeys.Contains(AuthenticatedCookie))
                cookie = ControllerContext.HttpContext.Response.Cookies[AuthenticatedCookie];
            cookie.Value = "false";
            cookie.Domain = ConfigurationManager.AppSettings["AuthenticatedCookie.Domain"];
            cookie.Path = "/";
            cookie.Expires = DateTime.Now.AddDays(-1);
            this.ControllerContext.HttpContext.Response.Cookies.Add(cookie);
        }

        [KawalDesaAuthorize]
        public ActionResult Logout()
        {
            Session.Clear();
            return new RedirectResult("/");
        }

        [KawalDesaAuthorize]
        public ActionResult Dashboard()
        {
            //new UserMailer().Invitation().Deliver();
            var user = GetUserDictFromSession();
            if (user == null)
            {
                return new RedirectResult("/login");
            }

            ViewData["User"] = new JavaScriptSerializer().Serialize(user);
            return View();
        }

        [AllowAnonymous]
        public ActionResult Organization(long? id)
        {
            var user = GetUserDictFromSession();
            ViewData["User"] = new JavaScriptSerializer().Serialize(user);
            return View();
        }

        [AllowAnonymous]
        public new ActionResult User(string id)
        {
            var user = GetUserDictFromSession();
            ViewData["User"] = new JavaScriptSerializer().Serialize(user);
            return View();
        }

        private String RedirectAnonymous(string anonymousHost)
        {
            var context = HttpContext;
            return string.Format("{0}{1}",
                                    anonymousHost,
                                    context.Request.Url.PathAndQuery);
        }

        private string GetRedirectHost()
        {
            var context = HttpContext;
            return string.Format("{0}://{1}{2}",
                                    context.Request.Url.Scheme,
                                    context.Request.Url.Host,
                                    context.Request.Url.IsDefaultPort
                                        ? string.Empty
                                        : ":" + context.Request.Url.Port);
        }

        public ActionResult Login(String token, String exAuthState)
        {
            var referrer = Request.ServerVariables["HTTP_REFERER"] as String;

            if (System.Web.HttpContext.Current.IsDebuggingEnabled)
            {
                var useInDebugStr = ConfigurationManager.AppSettings[FacebookUseInDebugConfig];
                if (useInDebugStr != null)
                {
                    bool useInDebug;
                    if (bool.TryParse(useInDebugStr, out useInDebug) && !useInDebug)
                    {
                        ViewData["Referrer"] = referrer;
                        return View();
                    }
                }
            }

            var redirectHost = GetRedirectHost();
            var redirectUrl = redirectHost + "/FacebookRedirect";
            if (!string.IsNullOrWhiteSpace(token))
                redirectUrl += "?token=" + token.Trim();
            if (!string.IsNullOrWhiteSpace(exAuthState))
                redirectUrl += "?exAuthState=" + exAuthState.Trim();

            if (referrer != null && (!referrer.StartsWith(redirectHost) || referrer.ToLower().EndsWith("login")))
                referrer = null;

            if (referrer != null)
                Session["LoginRedirect"] = referrer;

            string userId = Session[USERID_KEY] as string;
            if (userId != null)
            {
                if (referrer != null)
                    return new RedirectResult(referrer);

                return new RedirectResult("/");
            }

            String clientID = ConfigurationManager.AppSettings[FacebookClientIDConfig];
            String facebookRedirect = String.Format("https://graph.facebook.com/oauth/authorize? type=web_server&client_id={0}&redirect_uri={1}", clientID, redirectUrl);
            return new RedirectResult(facebookRedirect);
        }

        public ActionResult FacebookRedirect(String code, String token, String exAuthState)
        {
            
            String loginRedirect = Session["LoginRedirect"] as string;
            if (loginRedirect == null)
                loginRedirect = "/";
            Session["LoginRedirect"] = null;

            if (String.IsNullOrEmpty(code))
            {
                return new RedirectResult(loginRedirect);
            }
            
            string accessToken = null;
            String facebookID = null;
            String name = null;
            bool isVerified = false;

            try
            {
                String clientID = ConfigurationManager.AppSettings[FacebookClientIDConfig];
                String secretKey = ConfigurationManager.AppSettings[FacebookSecretKeyConfig];
                var redirectHost = GetRedirectHost();
                var redirectUrl = redirectHost + "/FacebookRedirect";
                if (!string.IsNullOrWhiteSpace(token))
                    redirectUrl += "?token=" + token;
                if (!string.IsNullOrWhiteSpace(exAuthState))
                    redirectUrl += "?exAuthState="+exAuthState;

                string url = "https://graph.facebook.com/oauth/access_token?client_id={0}&redirect_uri={1}&client_secret={2}&code={3}";
                WebRequest request = WebRequest.Create(string.Format(url, clientID, redirectUrl, secretKey, code));

                using (WebResponse response = request.GetResponse())
                using (Stream stream = response.GetResponseStream())
                {
                    Encoding encode = Encoding.GetEncoding("utf-8");
                    using (StreamReader streamReader = new StreamReader(stream, encode))
                    {
                        accessToken = streamReader.ReadToEnd().Replace("access_token=", "");
                    }
                }

                Session["FacebookAccessToken"] = accessToken;

                string meUrl = "https://graph.facebook.com/me?access_token={0}";
                request = WebRequest.Create(string.Format(meUrl, accessToken));
                using (WebResponse response = request.GetResponse())
                using (Stream stream = response.GetResponseStream())
                {
                    Encoding encode = Encoding.GetEncoding("utf-8");
                    using (StreamReader streamReader = new StreamReader(stream, encode))
                    {
                        var userDict = JsonConvert.DeserializeObject<IDictionary<String, Object>>(streamReader.ReadToEnd());
                        facebookID = userDict["id"] as string;
                        name = userDict["name"] as string;
                        isVerified = (bool) userDict["verified"];
                    }
                }
            }
            catch (Exception e)
            {
                logger.Error("facebook graph error, token:" + accessToken, e);
            }

            if (facebookID != null)
            {
                using (DB db = new DB())
                {
                    InvitationToken invitationToken = null;
                    if (!string.IsNullOrWhiteSpace(token))
                    {
                        token = token.Trim();
                        invitationToken = db.InvitationTokens.FirstOrDefault(t => t.Token == token && !t.IsUsed);
                    }

                    var user = db.Users.FirstOrDefault(u => u.FacebookId == facebookID && u.IsActive);
                    if(invitationToken != null)
                    {
                        using (var tx = db.Database.BeginTransaction())
                        {
                            invitationToken.IsUsed = true;
                            db.Entry(invitationToken).State = EntityState.Modified;
                            if (user != null)
                            {
                                user.IsADuplicate = true;
                                user.IsActive = false;
                                user.UserName = "inactive" + user.Id.Replace("-", "");
                                db.Entry(user).State = EntityState.Modified;

                                foreach (var spreadsheet in db.Set<Spreadsheet>().Where(d => d.fkCreatedById == user.Id))
                                {
                                    spreadsheet.fkCreatedById = invitationToken.fkUserId;
                                    db.Entry(spreadsheet).State = EntityState.Modified;
                                }
                                foreach (var spreadsheet in db.Set<Spreadsheet>().Where(d => d.fkApprovedById == user.Id))
                                {
                                    spreadsheet.fkApprovedById = invitationToken.fkUserId;
                                    db.Entry(spreadsheet).State = EntityState.Modified;
                                }
                            }
                            user = invitationToken.User;
                            user.IsActive = true;
                            user.FacebookId = facebookID;
                            user.Name = name;

                            db.SaveChanges();
                            tx.Commit();
                        }
                    }

                    if (user == null)
                    {

                        
                        return View("Error");
                        /*
                        using (var tx = db.Database.BeginTransaction())
                        {
                            var userManager = new UserManager<User>(new CUserStore<User>(db));
                            user = new User
                            {
                                FacebookId = facebookID,
                                Name = name,
                                IsActive = true,
                                UserName = "fb" + facebookID,
                                Id = Guid.NewGuid().ToString(),
                                FacebookIsVerified = isVerified
                            };
                            var newUser = userManager.Create(user);
                            userManager.AddToRole(user.Id, Role.VOLUNTEER);
                            tx.Commit();
                        }
                        */
                    }

                    TempData["isUserFoundError"] = true;
                    Session[USERID_KEY] = user.Id;
                    AddAuthenticatedCookie();
                }
            }

            if(!string.IsNullOrEmpty(exAuthState))
                return new RedirectResult("/AuthTokenGet?state="+exAuthState);

            return new RedirectResult(loginRedirect);
        }

        public ActionResult AuthTokenGenerate()
        {
            string userId = Session[USERID_KEY] as string;
            if (userId == null)
                return HttpNotFound("not logged in");
            var token = new AuthToken(userId);
            var key = ConfigurationManager.AppSettings["Auth.SecretKey"];
            var tokenStr = JsonWebToken.Encode(token, key, JwtHashAlgorithm.HS512);
            return Content(tokenStr);
        }

        public ActionResult AuthTokenGet(String state)
        {
            string userId = Session[USERID_KEY] as string;
            if (userId == null)
                return Redirect("/Login?exAuthState="+state);
            var token = new AuthToken(userId);
            var key = ConfigurationManager.AppSettings["Auth.SecretKey"];
            var tokenStr = JsonWebToken.Encode(token, key, JwtHashAlgorithm.HS512);
            var redirect = ConfigurationManager.AppSettings["Auth.Redirect"];
            return Redirect(redirect+"?token="+tokenStr+"&state="+state);
        }

        public ActionResult AuthTokenValidate(string token)
        {
            var key = ConfigurationManager.AppSettings["Auth.SecretKey"];
            var authToken = JsonWebToken.Decode(token, key, true);
            return Content(authToken.UserId);
        }

        public ActionResult TestDrive()
        {
            var authEmail = ConfigurationManager.AppSettings["Drive.AuthEmail"];
            var authKey = ConfigurationManager.AppSettings["Drive.AuthKey"];
            var parentDir = ConfigurationManager.AppSettings["Drive.ParentDir"];


            var driveUtils = new DriveUtils(authEmail, authKey, parentDir);


            //var fileId = driveUtils.UploadFile(null, @"D:\Work\kawal-desa\Content\sheets\DD 2015p 0 NASIONAL.xlsx", "DD 2015p 0 NASIONAL.xlsx");
            //var fileId = driveUtils.CreateRootDirectory();
            var fileId = ""+driveUtils.IsFileExists("0B5Uy21bYS6k9a1BQdUdoWFBQV3M", "DD 2015p 0 NASIONAL.xlsx A");
            return Content(fileId);
        }

        private IDictionary<String, Object> GetUserDictFromSession()
        {
            var result = new Dictionary<String, Object>();
            string userId = Session[USERID_KEY] as string;
            if (userId == null)
                return null;
            using (var db = new DB())
            {
                var userManager = new UserManager<User>(new CUserStore<User>(db));
                var user = db.Users.FirstOrDefault(u => u.Id == userId && u.IsActive);
                if (user == null)
                    return null;
                result["Id"] = user.Id;
                result["Name"] = user.Name;
                result["FacebookId"] = user.FacebookId;
                result["fkOrganizationId"] = user.fkOrganizationId;
                result["Roles"] = userManager.GetRoles(user.Id);
                result["Scopes"] = db.UserScopes.Where(s => s.fkUserId == user.Id)
                    .Select(s => s.fkRegionId)
                    .ToList();
                return result;
            }
        }

        public static User GetCurrentUser()
        {
            var principal = System.Web.HttpContext.Current.User;
            if (principal == null)
                return null;
            var identity = principal.Identity as KawalDesaIdentity;
            if (identity == null)
                return null;

            return identity.User;
        }
        public static void CheckRegionAllowed(DbContext db, string regionID)
        {
            var principal = System.Web.HttpContext.Current.User;
            CheckRegionAllowed(principal, db, regionID);
        }
        public static void CheckRegionAllowed(IPrincipal principal,DbContext db, string regionID)
        {
            String userID = ((KawalDesaIdentity)principal.Identity).User.Id;
            if (userID == null)
                throw new ApplicationException("region is not allowed for thee");

            var region = db.Set<Region>()
                .AsNoTracking()
                .Include(r => r.Parent)
                .Include(r => r.Parent.Parent)
                .Include(r => r.Parent.Parent.Parent)
                .Include(r => r.Parent.Parent.Parent.Parent)
                .First(r => r.Id == regionID);

            var regionIDs = new List<string>();
            var current = region;
            while(current != null)
            {
                regionIDs.Add(current.Id);
                current = current.Parent;
            }

            var allowed = db.Set<UserScope>()
                .Any(s => s.fkUserId == userID && regionIDs.Contains(s.fkRegionId));
            if (!allowed)
                throw new ApplicationException("region is not allowed for thee");
        }

    }
}