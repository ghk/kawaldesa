App.Controllers.Services.BundleController.GetTransferBundle = function (apbnKey, regionId) {
    var res = Microvac.Web.$http(App.Controllers.Services.BundleController.ajaxSettings.build({
        method: 'GET',
        url: '/bundles/p/'+apbnKey+'/'+regionId+'.json'
    }));
    return res;
};
App.Controllers.Services.BundleController.GetAllocationBundle = function (subtype, apbnKey, regionId) {
    var res = Microvac.Web.$http(App.Controllers.Services.BundleController.ajaxSettings.build({
        method: 'GET',
        url: '/bundles/'+subtype+'/'+apbnKey+'/'+regionId+'.json'
    }));
    return res;
};