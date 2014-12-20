/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../Services/Principal.ts"/>
/// <reference path="../Dashboard.ts"/>

module KawalDesa.Controllers {
    import Models = App.Models;
    import APBNFileUpload = App.Models.APBNFileUpload;

    function safeApply(scope, fn) {
        (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
    }

    class IndexCtrl {

        state: string

        static $inject = ["$scope", "$upload", "principal"];

        constructor(public $scope, public $upload, public principal: IPrincipal) {
            var ctrl = this;
            $scope.principal = principal;
            $scope.model = {};
            principal.identity().then(function (identity) {
                if (identity != null) {
                }
                if(principal.isAuthenticated())
                    ctrl.loadThings();
            });
        }

        loadThings() {
            var $scope = this.$scope;
            var principal = this.principal;

            principal.identity().then(function (identity) {
                $scope.user = new Models.User(identity.user);
            });

            if (principal.isInRole("admin")) {
                Models.APBN.GetAll().done(apbns => {
                    safeApply($scope, () => {
                        $scope.apbns = apbns;
                    });
                });
                Models.APBDFile.GetAll().done(apbdFiles => {
                    safeApply($scope, () => {
                        $scope.apbdFiles = apbdFiles;
                    });
                });
                Models.TransactionFile.GetAll().done(transactionFiles => {
                    safeApply($scope, () => {
                        $scope.transactionFiles = transactionFiles;
                    });
                });
            }
        }

        uploadFile() {
            if (!this.$scope.file || this.$scope.file[0] == null)
                return;

            var file = this.$scope.file[0];
            var ctrl = this;
            var res = null;

            APBNFileUpload.UploadFile(file, res, ctrl.$upload).success(function (data, status, headers, config) {
                var modal: any = $("#apbnFileModal");
                modal.modal("hide");
            });;
        }

        login() {
            var ctrl = this;
            var principal = this.principal;
            var scope = this.$scope;
            var model = new Models.User(this.$scope.model);

            model.Login().done(data => {
                principal.authenticate({
                    name: data.UserName,
                    roles: data.Roles
                });
                ctrl.loadThings();
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
        }
    }
    dashboard.controller("IndexCtrl",  IndexCtrl);
}