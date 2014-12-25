/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
var App;
(function (App) {
    (function (Controllers) {
        var Models = App.Models;

        function safeApply(scope, fn) {
            (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
        }

        var DashboardCtrl = (function () {
            function DashboardCtrl($scope, $upload) {
                this.$scope = $scope;
                this.$upload = $upload;
                this.roles = {};
                $scope.model = {};
                this.indexCtrl = $scope.indexCtrl;
                this.loadThings();
                this.loadRoles();
            }
            DashboardCtrl.prototype.loadThings = function () {
                var $scope = this.$scope;
                var indexCtrl = this.indexCtrl;

                if (indexCtrl.isInRole("admin")) {
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

            DashboardCtrl.prototype.loadRoles = function () {
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

            DashboardCtrl.prototype.saveRoles = function () {
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

            DashboardCtrl.prototype.uploadFile = function () {
                if (!this.$scope.file || this.$scope.file[0] == null)
                    return;

                var file = this.$scope.file[0];
                var ctrl = this;
                var res = null;

                var res = ctrl.$upload.upload({
                    type: 'POST',
                    url: '/api/APBDFile/PostFile',
                    file: file
                }).success(function () {
                    var modal = $("#apbnFileModal");
                    modal.modal("hide");
                });
            };
            DashboardCtrl.$inject = ["$scope", "$upload"];
            return DashboardCtrl;
        })();
        App.kawaldesa.controller("DashboardCtrl", DashboardCtrl);
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=DashboardCtrl.js.map
