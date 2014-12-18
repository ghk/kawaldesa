/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/underscore/underscore.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../Dashboard.ts"/>
var KawalDesa;
(function (KawalDesa) {
    (function (Controllers) {
        var Models = App.Models;

        var LoginCtrl = (function () {
            function LoginCtrl($scope, $state, principal) {
                this.$scope = $scope;
                this.$state = $state;
                this.principal = principal;
            }
            LoginCtrl.prototype.login = function () {
                var principal = this.principal;
                var scope = this.$scope;
                var state = this.$state;
                var model = new Models.User(this.$scope.model);

                model.Login().done(function (data) {
                    principal.authenticate({
                        name: data.UserName,
                        roles: data.Roles
                    });
                    if (scope.returnToState)
                        state.go(scope.returnToState.name, scope.returnToStateParams);
                    else
                        state.go('dashboard');
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

            LoginCtrl.prototype.logout = function () {
                Models.User.Logout();
                this.principal.authenticate(null);
                this.$state.go('index');
            };

            LoginCtrl.prototype.launchIntoFullscreen = function (element) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }

                console.log(element);
            };
            return LoginCtrl;
        })();

        KawalDesa.dashboard.controller("LoginCtrl", ["$scope", "$state", "principal", LoginCtrl]);
    })(KawalDesa.Controllers || (KawalDesa.Controllers = {}));
    var Controllers = KawalDesa.Controllers;
})(KawalDesa || (KawalDesa = {}));
//# sourceMappingURL=LoginCtrl.js.map
