using System.Web.Optimization;

namespace App.Configs
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            // CSS Bundles
            bundles.Add(new StyleBundle("~/css/libs/bootstrap", "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css")
                .Include("~/Scaffold/Content/bootstrap/bootstrap.css"));

            bundles.Add(new StyleBundle("~/css/libs/bootstrap-theme", "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css")
                .Include("~/Scaffold/Content/bootstrap-theme.min.css"));

            bundles.Add(new StyleBundle("~/css/kawaldesa")
                .Include("~/Content/loading-bar.min.css")
                .Include("~/Content/style.css"));

            // Script Bundles

            bundles.Add(new ScriptBundle("~/js/libs/jquery", "http://code.jquery.com/jquery-2.1.1.min.js")
                .Include("~/Scaffold/Scripts/jquery-2.1.1.js"));

            bundles.Add(new ScriptBundle("~/js/libs/bootstrap", "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.js")
                .Include("~/Scaffold/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/js/kawaldesa")
                .Include("~/Scaffold/Scripts/angular.js")
                .Include("~/Scripts/angular-file-upload.min.js")
                .Include("~/Scripts/Models.js")
                .Include("~/Scripts/KawalDesa/Models/*.js")
                .Include("~/Scripts/KawalDesa/KawalDesa.js")
                .Include("~/Scripts/KawalDesa/Controllers/*.js")
                );

        }
    }
}