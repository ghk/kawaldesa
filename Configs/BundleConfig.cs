using System.Web.Optimization;

namespace App.Configs
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            // CSS Bundles

            bundles.Add(new StyleBundle("~/css/index")
                .Include("~/Content/loading-bar.min.css")
                .Include("~/Content/style.css"));

            // Script Bundles

            bundles.Add(new ScriptBundle("~/js/base")
                .Include("~/Scaffold/Scripts/angular.js")
                .Include("~/Scripts/Models.js"));

            bundles.Add(new ScriptBundle("~/js/index")
                .Include("~/Scripts/KawalDesa/KawalDesa.js")
                .Include("~/Scripts/KawalDesa/Controllers/*.js")
                );

            bundles.Add(new ScriptBundle("~/js/dashboard")
                .Include("~/Scripts/loading-bar.min.js")
                .Include("~/Scripts/angular-file-upload.min.js")
                .Include("~/Scripts/Models.js")
                .Include("~/Scripts/dashboard/Dashboard.js")
                .Include("~/Scripts/dashboard/Services/Principal.js")
                .Include("~/Scripts/dashboard/Services/Authorization.js")
                .Include("~/Scripts/dashboard/Models/*.js")
                .Include("~/Scripts/dashboard/Controllers/*.js")
                );

        }
    }
}