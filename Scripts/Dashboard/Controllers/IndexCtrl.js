/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../Services/Principal.ts"/>
/// <reference path="../Dashboard.ts"/>
var KawalDesa;
(function (KawalDesa) {
    (function (Controllers) {
        var Models = App.Models;
        var APBNFileUpload = App.Models.APBNFileUpload;

        function safeApply(scope, fn) {
            (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
        }

        var IndexCtrl = (function () {
            function IndexCtrl($scope, $upload, principal) {
                this.$scope = $scope;
                this.$upload = $upload;
                this.principal = principal;
                var ctrl = this;
                $scope.principal = principal;
                $scope.model = {};
                principal.identity().then(function (identity) {
                    if (identity != null) {
                    }
                    if (principal.isAuthenticated())
                        ctrl.loadThings();
                });
            }
            IndexCtrl.prototype.loadThings = function () {
                var $scope = this.$scope;
                var principal = this.principal;

                principal.identity().then(function (identity) {
                    $scope.user = new Models.User(identity.user);
                });

                if (principal.isInRole("admin")) {
                    Models.APBN.GetAll().done(function (apbns) {
                        safeApply($scope, function () {
                            $scope.apbns = apbns;
                        });
                    });
                    Models.APBDFile.GetAll().done(function (apbdFiles) {
                        safeApply($scope, function () {
                            $scope.apbdFiles = apbdFiles;
                        });
                    });
                    Models.TransactionFile.GetAll().done(function (transactionFiles) {
                        safeApply($scope, function () {
                            $scope.transactionFiles = transactionFiles;
                        });
                    });
                }
            };

            IndexCtrl.prototype.uploadFile = function () {
                if (!this.$scope.file || this.$scope.file[0] == null)
                    return;

                var file = this.$scope.file[0];
                var ctrl = this;
                var res = null;

                APBNFileUpload.UploadFile(file, res, ctrl.$upload).success(function (data, status, headers, config) {
                    var modal = $("#apbnFileModal");
                    modal.modal("hide");
                });
                ;
            };

            IndexCtrl.prototype.login = function () {
                var ctrl = this;
                var principal = this.principal;
                var scope = this.$scope;
                var model = new Models.User(this.$scope.model);

                model.Login().done(function (data) {
                    principal.authenticate({
                        name: data.UserName,
                        roles: data.Roles
                    });
                    ctrl.loadThings();
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

            IndexCtrl.prototype.logout = function () {
                Models.User.Logout();
                this.principal.authenticate(null);
            };
            IndexCtrl.$inject = ["$scope", "$upload", "principal"];
            return IndexCtrl;
        })();
        KawalDesa.dashboard.controller("IndexCtrl", IndexCtrl);
    })(KawalDesa.Controllers || (KawalDesa.Controllers = {}));
    var Controllers = KawalDesa.Controllers;
})(KawalDesa || (KawalDesa = {}));
//# sourceMappingURL=IndexCtrl.js.map
