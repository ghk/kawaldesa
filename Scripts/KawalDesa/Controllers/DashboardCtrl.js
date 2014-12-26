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
                this.regionPairs = [];
                this.regionChildren = {};
                this.savingStates = {};
                $scope.model = {};
                this.indexCtrl = $scope.indexCtrl;
                this.loadThings();
                this.loadUser();
            }
            DashboardCtrl.prototype.loadThings = function () {
                var ctrl = this;
                var $scope = this.$scope;
                var indexCtrl = this.indexCtrl;

                if (indexCtrl.isInRole("admin")) {
                    Models.APBN.GetAll().done(function (apbns) {
                        $scope.$apply(function () {
                            $scope.apbns = apbns;
                        });
                    });
                    Models.APBDFile.GetAll().done(function (apbdFiles) {
                        $scope.$apply(function () {
                            $scope.apbdFiles = apbdFiles;
                        });
                    });
                }
                Models.Region.Get(0).done(function (region) {
                    $scope.$apply(function () {
                        ctrl.national = region;
                    });
                });
                this.getRegionChildren(0);
            };

            DashboardCtrl.prototype.loadUser = function () {
                var ctrl = this;
                Models.User.GetCurrentUser().done(function (user) {
                    ctrl.$scope.$apply(function () {
                        ctrl.roles = {};
                        for (var i = 0; i < user.Roles.length; i++) {
                            ctrl.roles[user.Roles[i]] = true;
                        }
                        ctrl.regionPairs = [];
                        for (var i = 0; i < user.Scopes.length; i++) {
                            var regionPair = [null, null, null, null, null];
                            var current = user.Scopes[i];
                            while (current) {
                                regionPair[current.Type] = current;
                                current = current.Parent;
                            }
                            ctrl.regionPairs.push(regionPair);
                        }
                    });
                    console.log(ctrl.regionPairs);
                });
            };

            DashboardCtrl.prototype.saveRoles = function () {
                var _this = this;
                var ctrl = this;
                var selectedRoles = [];
                for (var key in this.roles) {
                    if (this.roles[key]) {
                        selectedRoles.push(key);
                    }
                }
                this.savingStates["roles"] = true;
                Models.User.UpdateVolunteerRoles(selectedRoles).done(function () {
                    ctrl.loadUser();
                    _this.savingStates["roles"] = false;
                });
            };

            DashboardCtrl.prototype.getRegionChildren = function (id) {
                if (id != 0 && !id)
                    return;

                var ctrl = this;
                if (!(typeof (this.regionChildren[id]) == "undefined"))
                    return this.regionChildren[id];

                this.regionChildren[id] = [];
                Models.Region.GetAll({ "ParentID": id }).done(function (regions) {
                    ctrl.$scope.$apply(function () {
                        for (var i = 0; i < regions.length; i++) {
                            ctrl.regionChildren[id].push(regions[i]);
                        }
                    });
                });
                return this.regionChildren[id];
            };

            DashboardCtrl.prototype.truncateRegionPair = function (regionPair, index) {
                for (var i = index + 1; i < regionPair.length; i++) {
                    regionPair[i] = null;
                }
            };

            DashboardCtrl.prototype.saveScopes = function () {
                var _this = this;
                var ctrl = this;
                var selectedRegions = [];
                for (var i = 0; i < this.regionPairs.length; i++) {
                    var last = null;
                    var regionPair = this.regionPairs[i];
                    for (var j = 0; j < regionPair.length; j++) {
                        var region = regionPair[j];
                        if (!region) {
                            break;
                        }
                        last = region;
                    }
                    if (last) {
                        selectedRegions.push(last);
                    }
                }

                this.savingStates["scopes"] = true;
                Models.User.SetScopes(selectedRegions).done(function () {
                    ctrl.loadUser();
                    _this.savingStates["scopes"] = false;
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
