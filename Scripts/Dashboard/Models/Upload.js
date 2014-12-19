/// <reference path="../../Models.ts"/>
var App;
(function (App) {
    (function (Models) {
        var APBNFileUpload = (function () {
            function APBNFileUpload() {
            }
            APBNFileUpload.UploadFile = function (file, result, upload) {
                var res = upload.upload({
                    type: 'POST',
                    url: '/api/KawalDesaUpload/PostFile',
                    data: result,
                    file: file
                });
                return res;
            };
            return APBNFileUpload;
        })();
        Models.APBNFileUpload = APBNFileUpload;
    })(App.Models || (App.Models = {}));
    var Models = App.Models;
})(App || (App = {}));
//# sourceMappingURL=Upload.js.map
