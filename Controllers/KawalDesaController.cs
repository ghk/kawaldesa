using App.Models;
using log4net;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using App.Security;

namespace App.Controllers
{
    public class KawalDesaController : Controller
    {
        private static ILog logger = LogManager.GetLogger(typeof(KawalDesaController));

        [AllowAnonymous]
        public ActionResult Index()
        {
            var user = GetCurrentUser();
            if(user != null)
            {
                ViewData["User.Name"] = user.Name;
                ViewData["User.FacebookID"] = user.FacebookID;
            }
            return View();
        }

        [KawalDesaAuthorize]
        public ActionResult Dashboard()
        {
            var user = GetCurrentUser();
            if(user == null)
            {
                return new RedirectResult("/login");
            }
            ViewData["User.Name"] = user.Name;
            ViewData["User.FacebookID"] = user.FacebookID;
            return View();
        }

        private readonly string FacebookClientID = "1512932775635958";
        private readonly string FacebookClientSecret = "d8fd9e1d1f785a04975af1555ba5417c";

        private string GetRedirectHost()
        {
            var redirectHost = "http://kawaldesa.org";
            if (HttpContext.IsDebuggingEnabled)
                redirectHost = "http://localhost:11002";
            return redirectHost;

        }
        public ActionResult Login()
        {
            var redirectHost = GetRedirectHost();
            var redirectUrl = redirectHost + "/FacebookRedirect";

            var referrer = Request.ServerVariables["HTTP_REFERER"] as String;
            if (referrer != null && (!referrer.StartsWith(redirectHost) || referrer.ToLower().EndsWith("login")))
                referrer = null;

            if (referrer != null)
                Session["LoginRedirect"] = referrer;

            if(GetCurrentUser() != null)
            {
                if (referrer != null)
                    return new RedirectResult(referrer);

                return new RedirectResult("/");
            }

            String facebookRedirect = String.Format("https://graph.facebook.com/oauth/authorize? type=web_server&client_id={0}&redirect_uri={1}", FacebookClientID, redirectUrl);
            return new RedirectResult(facebookRedirect);
        }
        public ActionResult FacebookRedirect(String code)
        {
            var redirectHost = GetRedirectHost();
            var redirectUrl = redirectHost + "/FacebookRedirect";

            string url = "https://graph.facebook.com/oauth/access_token?client_id={0}&redirect_uri={1}&client_secret={2}&code={3}";
            WebRequest request = WebRequest.Create(string.Format(url, FacebookClientID, redirectUrl, FacebookClientSecret, code));
            string accessToken = null;

            using(WebResponse response = request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            { 
                Encoding encode = Encoding.GetEncoding("utf-8");
                using (StreamReader streamReader = new StreamReader(stream, encode))
                {
                    accessToken = streamReader.ReadToEnd().Replace("access_token=", "");
                }
            }

            Session["FacebookAccessToken"] = accessToken;

            String facebookID = null;
            String name = null;
            try
            {
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
                    }
                }
            }
            catch(Exception e)
            {
                logger.Error("facebook graph error, token:"+accessToken, e);
            }

            if(facebookID != null)
            {
                using(DB db = new DB())
                {
                    var user = db.Users.FirstOrDefault(u => u.FacebookID == facebookID);
                    if(user == null)
                    {
                        var userManager = new UserManager<User>(new UserStore<User>(db));
                        user = new User
                        {
                            FacebookID = facebookID,
                            Name = name,
                            UserName = "fb"+facebookID,
                        };
                        var newUser = userManager.Create(user);
                        userManager.AddToRole(user.Id, Role.VOLUNTEER);
                        db.SaveChanges();
                    }
                    Session["userid"] = user.Id;
                }
            }

            String loginRedirect = Session["LoginRedirect"] as string;
            if(loginRedirect == null)
                loginRedirect = "/";
            Session["LoginRedirect"] = null;

            return new RedirectResult(loginRedirect);
        }

        public User GetCurrentUser()
        {
            string userId = Session["userid"] as string;
            if (userId == null)
                return null;
            using(var db = new DB())
            {
                return db.Users.FirstOrDefault(u => u.Id == userId);
            }
        }
    }
}