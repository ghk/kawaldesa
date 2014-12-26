/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../KawalDesa.ts"/>
var App;
(function (App) {
    (function (Controllers) {
        var Models = App.Models;

        var CHILD_NAMES = [
            "Daerah",
            "Provinsi",
            "Kabupaten / Kota",
            "Kecamatan",
            "Desa"
        ];

        var IndexCtrl = (function () {
            function IndexCtrl($scope, $location) {
                this.$scope = $scope;
                this.$location = $location;
                this.type = "transfer";
                this.isPathReplacing = false;
                var ctrl = this;
                this.currentUser = window.CurrentUser;

                $scope.$on('$locationChangeSuccess', function () {
                    if (!ctrl.isPathReplacing)
                        ctrl.onLocationChange();
                    ctrl.isPathReplacing = false;
                });
            }
            IndexCtrl.prototype.onLocationChange = function () {
                var path = this.$location.path();
                var regionID = -1;
                var regionKey = null;
                if (path == "/" || path == "") {
                    regionID = 0;
                    this.type = "transfer";
                } else if (path.indexOf("/p/") != -1) {
                    regionID = parseInt(this.$location.path().replace("/p/", ""));
                    this.type = "transfer";
                } else if (path.indexOf("/r/") != -1) {
                    regionID = parseInt(this.$location.path().replace("/r/", ""));
                    this.type = "realization";
                } else if (path.indexOf("/dashboard") != -1) {
                    this.type = "dashboard";
                } else if (path.indexOf("/login") != -1) {
                    this.type = "login";
                } else {
                    this.type = "realization";
                    regionKey = path.substring(1);
                }

                if (regionID != -1 || regionKey)
                    this.loadRegion(regionID, regionKey);

                if (regionID == -1 && !regionKey)
                    regionID = 0;
                this.regionID = regionID;
            };

            IndexCtrl.prototype.changeType = function (type, $event) {
                if (this.type != 'dashboard') {
                    $event.preventDefault();
                    var t = "p";
                    if (type == "realization")
                        t = "r";
                    var path = "/" + t + "/" + this.region.ID;
                    this.$location.path(path);
                }
            };

            IndexCtrl.prototype.changeRegion = function (regionID, $event) {
                $event.preventDefault();
                var t = "p";
                if (this.type == "realization")
                    t = "r";
                var path = "/" + t + "/" + regionID;
                this.$location.path(path);
            };

            IndexCtrl.prototype.hasAnyVolunteerRoles = function () {
                return this.currentUser != null && this.currentUser.Roles.some(function (r) {
                    return r.indexOf("volunteer_") != -1;
                });
            };

            IndexCtrl.prototype.isInRole = function (roleName) {
                if (!this.currentUser) {
                    return false;
                }
                return this.currentUser.Roles.some(function (r) {
                    return roleName == r;
                });
            };

            IndexCtrl.prototype.isInScope = function (entityID) {
                var _this = this;
                var regionIDs = this.regionTree.map(function (r) {
                    return r.ID;
                });
                regionIDs.push(entityID);
                return regionIDs.some(function (rid) {
                    return _this.currentUser.Scopes.some(function (id) {
                        return rid == id;
                    });
                });
            };

            IndexCtrl.prototype.isInRoleAndScope = function (roleName, entityID) {
                return this.isInRole(roleName) && this.isInScope(entityID);
            };

            IndexCtrl.prototype.loadRegion = function (parentID, parentKey) {
                var ctrl = this;

                this.regionTree = [];
                this.childName = CHILD_NAMES[0];

                var promise = null;
                if (parentID != -1)
                    promise = Models.Region.Get(parentID);
                else if (parentKey)
                    promise = Models.Region.GetByURLKey(parentKey);

                promise.done(function (region) {
                    ctrl.$scope.$apply(function () {
                        ctrl.region = region;
                        ctrl.regionID = region.ID;
                        var regionTree = [];
                        var cur = region;
                        while (cur) {
                            regionTree.push(cur);
                            cur = cur.Parent;
                        }
                        ctrl.regionTree = regionTree.reverse();
                        if (regionTree.length < CHILD_NAMES.length)
                            ctrl.childName = CHILD_NAMES[regionTree.length];

                        setTimeout(function () {
                            ctrl.$scope.$apply(function () {
                                ctrl.$scope.$broadcast("regionChangeSuccess");
                            });
                        }, 0);
                        if (region.UrlKey && ctrl.$location.path() != "/" + region.UrlKey) {
                            ctrl.isPathReplacing = true;
                            ctrl.$location.path("/" + region.UrlKey);
                            ctrl.$location.replace();
                        }
                    });
                });
            };
            IndexCtrl.$inject = ["$scope", "$location"];
            return IndexCtrl;
        })();
        Controllers.IndexCtrl = IndexCtrl;

        App.kawaldesa.controller("IndexCtrl", IndexCtrl);
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=IndexCtrl.js.map
