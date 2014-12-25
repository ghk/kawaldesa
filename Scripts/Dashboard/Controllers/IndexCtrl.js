/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../Services/Principal.ts"/>
/// <reference path="../Dashboard.ts"/>
var KawalDesa;
(function (KawalDesa) {
    (function (Controllers) {
        var Models = App.Models;

        function safeApply(scope, fn) {
            (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
        }

        var IndexCtrl = (function () {
            function IndexCtrl($scope, $upload, principal) {
                this.$scope = $scope;
                this.$upload = $upload;
                this.principal = principal;
                this.roles = {};
                var ctrl = this;
                $scope.principal = principal;
                $scope.model = {};
                principal.identity().then(function (identity) {
                    ctrl.loadThings();
                    ctrl.loadRoles();
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
                }
            };

            IndexCtrl.prototype.loadRoles = function () {
                var ctrl = this;
                Models.User.GetCurrentUser().done(function (user) {
                    ctrl.$scope.$apply(function () {
                        ctrl.roles = {};
                        for (var i = 0; i < user.Roles.length; i++) {
                            ctrl.roles[user.Roles[i]] = true;
                        }
                    });
                });
            };

            IndexCtrl.prototype.saveRoles = function () {
                var ctrl = this;
                var selectedRoles = [];
                for (var key in this.roles) {
                    if (this.roles[key]) {
                        selectedRoles.push(key);
                    }
                }
                Models.User.UpdateVolunteerRoles(selectedRoles).done(function () {
                    ctrl.loadRoles();
                });
            };

            IndexCtrl.prototype.uploadFile = function () {
                if (!this.$scope.file || this.$scope.file[0] == null)
                    return;

                var file = this.$scope.file[0];
                var ctrl = this;
                var res = null;

                var res = ctrl.$upload.upload({
                    type: 'POST',
                    url: '/api/APBDFile/PostFile',
                    data: { "anu": "lalala", "lalala": 11, "caca": true },
                    file: file
                }).success(function () {
                    var modal = $("#apbnFileModal");
                    modal.modal("hide");
                });
            };
            IndexCtrl.$inject = ["$scope", "$upload", "principal"];
            return IndexCtrl;
        })();
        KawalDesa.dashboard.controller("IndexCtrl", IndexCtrl);
    })(KawalDesa.Controllers || (KawalDesa.Controllers = {}));
    var Controllers = KawalDesa.Controllers;
})(KawalDesa || (KawalDesa = {}));
//# sourceMappingURL=IndexCtrl.js.map
