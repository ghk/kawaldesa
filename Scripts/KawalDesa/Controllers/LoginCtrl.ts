/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="../../gen/Controllers.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;

    declare var Referrer;

    class LoginCtrl {

        static $inject = ["$scope"];

        constructor(public $scope) {
        }

        login() {
            var scope = this.$scope;
            var model = new Models.User(this.$scope.model);

            /*
            model.Login().then(data => {
                window.location.href = Referrer;
            }).fail(response => {
                    var resp: any = response;
                    scope.formMessage = {
                        type: "error",
                        message: resp.responseJSON.Message,
                        errors: resp.responseJSON.ModelState
                    }
            }).always(() => {
                scope.$apply();
            });

*/
        }
    }

    kawaldesa.controller("LoginCtrl", LoginCtrl);
}