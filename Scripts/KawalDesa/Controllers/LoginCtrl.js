/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>
var App;
(function (App) {
    (function (Controllers) {
        var Models = App.Models;

        var LoginCtrl = (function () {
            function LoginCtrl($scope) {
                this.$scope = $scope;
            }
            LoginCtrl.prototype.login = function () {
                var scope = this.$scope;
                var model = new Models.User(this.$scope.model);

                model.Login().done(function (data) {
                    window.open("/", "_self");
                }).fail(function (response) {
                    var resp = response;
                    scope.formMessage = {
                        type: "error",
                        message: resp.responseJSON.Message,
                        errors: resp.responseJSON.ModelState
                    };
                }).always(function () {
                    scope.$apply();
                });
            };
            LoginCtrl.$inject = ["$scope"];
            return LoginCtrl;
        })();

        App.kawaldesa.controller("LoginCtrl", LoginCtrl);
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=LoginCtrl.js.map
