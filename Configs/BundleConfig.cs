using System.Web.Optimization;

namespace App.Configs
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Use Bundle rather than StyleBundle or ScriptBundle in order to turn off
            // minification (takes the already minified files).

            // CSS Bundles

            bundles.Add(new StyleBundle("~/css/index")
                .Include("~/Content/style.css"));

            bundles.Add(new ScriptBundle("~/js/index")
                .Include("~/Scaffold/Scripts/angular.js")
                .Include("~/Scripts/Models.js")
                .Include("~/Scripts/KawalDesa/KawalDesa.js")
                .Include("~/Scripts/KawalDesa/Controllers/*.js")
                );

            bundles.Add(new StyleBundle("~/css/app")
                .Include("~/Content/app/app.css")
                .Include("~/Content/loading-bar.min.css")
                .Include("~/Content/style.css"));

            bundles.Add(new StyleBundle("~/css/smartadmin")
                .Include("~/Scaffold/Content/smartadmin/smartadmin-production.css")
                .Include("~/Scaffold/Content/smartadmin/smartadmin-skins.css"));

            // Script Bundles

            bundles.Add(new ScriptBundle("~/js/libraries")
                .Include("~/Scaffold/Scripts/jquery-{version}.js")
                .Include("~/Scaffold/Scripts/bootstrap.js")
                .Include("~/Scaffold/Scripts/angular.js")
                .Include("~/Scripts/angular-ui-router.js")
                .Include("~/Scaffold/Scripts/angular-sanitize.js")
                .Include("~/Scaffold/Scripts/angular-animate.js")
                .Include("~/Scripts/angular-ui/ui-bootstrap.js")
                .Include("~/Scripts/angular-ui/ui-bootstrap-tpls.js")
                .Include("~/Scripts/libraries/angular-blocks.min.js")
                .Include("~/Scripts/loading-bar.min.js")
                .Include("~/Scripts/libraries/dirPagination.js")
                .Include("~/Scripts/libraries/underscore.js")
                .Include("~/Scripts/Utils/*.js")
                .Include("~/Scripts/angular-file-upload.min.js")  
                .Include("~/Scaffold/Scripts//Scaffold/Smartadmin/app.min.js"));

            bundles.Add(new ScriptBundle("~/js/scaffold")
                .Include("~/Scaffold/Scripts/Scaffold/Scaffold.js"));

            bundles.Add(new ScriptBundle("~/js/base")
                .Include("~/Scripts/Models.js"));

            bundles.Add(new ScriptBundle("~/js/dashboard")
                .Include("~/Scripts/dashboard/Dashboard.js")
                .Include("~/Scripts/dashboard/Services/Principal.js")
                .Include("~/Scripts/dashboard/Services/Authorization.js")
                .Include("~/Scripts/dashboard/Models/*.js")
                .Include("~/Scripts/dashboard/Controllers/*.js")
                .Include("~/Scripts/dashboard/Services/Run.js"));

            bundles.Add(new ScriptBundle("~/js/scaffold/smartadmin")
                .Include("~/Scaffold/Scripts/Scaffold/Demo/Smartadmin/*.js"));

        }
    }
}