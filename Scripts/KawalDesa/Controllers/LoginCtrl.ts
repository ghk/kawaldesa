/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/underscore/underscore.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../KawalDesa.ts"/>

module KawalDesa.Controllers {
    import Models = App.Models;

    class LoginCtrl {

        constructor(public $scope, public $state, public principal) {            
        }

        login() {
            var principal = this.principal;
            var scope = this.$scope;
            var state = this.$state;
            var model = new Models.User(this.$scope.model);

            model.Login().done(data => {
                principal.authenticate({
                    name: data.UserName,
                    roles: data.Roles
                });
                if (scope.returnToState)
                    state.go(scope.returnToState.name, scope.returnToStateParams);
                else
                    state.go('dashboard');
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
        }

        logout() {            
            Models.User.Logout();
            this.principal.authenticate(null);
            this.$state.go('index');
        }

        launchIntoFullscreen(element) {
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
        }
    }

    kawaldesa.controller("LoginCtrl", ["$scope", "$state", "principal", LoginCtrl]);
}