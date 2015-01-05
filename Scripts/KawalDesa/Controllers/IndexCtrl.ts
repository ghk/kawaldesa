/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    export interface ICurrentUser {
        ID: string;
        FacebookID: String;
        Name: String;
        Roles: String[];
        Scopes: number[];
    }

    interface MyWindow extends Window {
        CurrentUser: ICurrentUser;
    }

    declare var window: MyWindow;

    import Models = App.Models;

    var CHILD_NAMES = [
        "Daerah",
        "Provinsi",
        "Kabupaten / Kota",
        "Kecamatan",
        "Desa"
    ];

    export class IndexCtrl {

        regionTree: Models.Region[];
        region: Models.Region;
        childName: string;
        type = "transfer";
        currentUser: ICurrentUser;
        regionID: number;
        isPathReplacing = false;

        static $inject = ["$scope", "$location"];

        constructor(public $scope, public $location){
            var ctrl = this;
            this.currentUser = window.CurrentUser;

            $scope.$on('$locationChangeSuccess', function () {
                if(!ctrl.isPathReplacing)
                    ctrl.onLocationChange();
                ctrl.isPathReplacing = false;
            });
        }

        onLocationChange() {
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

            if(regionID != -1 || regionKey)
                this.loadRegion(regionID, regionKey);

            if (regionID == -1 && !regionKey)
                regionID = 0;
            this.regionID = regionID;
        }

        changeType(type, $event) {
            if (this.type != 'dashboard') {
                $event.preventDefault();
                var t = "p"
                if (type == "realization")
                    t = "r";
                var path = "/" + t + "/" + this.region.ID;
                this.$location.path(path);
            }
        }

        changeRegion(regionID, $event) {
            $event.preventDefault();
            var t = "p"
            if (this.type == "realization")
                t = "r";
            var path = "/" + t + "/" + regionID;
            this.$location.path(path);
        }

        hasAnyVolunteerRoles() {
            return this.currentUser != null
                && this.currentUser.Roles.some(r => r.indexOf("volunteer_") != -1);
        }

        isInRole(roleName) {
            if (!this.currentUser) {
                return false;
            }
            return this.currentUser.Roles.some(r => roleName == r);
        }

        isInScope(entityID) {
            var regionIDs = this.regionTree.map(r => r.ID);
            regionIDs.push(entityID);
            return regionIDs.some(rid => this.currentUser.Scopes.some(id => rid == id));
        }

        isInRoleAndScope(roleName, entityID) {
            return this.isInRole(roleName) && this.isInScope(entityID);
        }

        loadRegion(parentID?: number, parentKey?: string) {
            var ctrl = this;

            this.regionTree = [];
            this.childName = CHILD_NAMES[0];

            var promise = null;
            if (parentID != -1)
                promise = Models.Region.Get(parentID);
            else if (parentKey)
                promise = Models.Region.GetByURLKey(parentKey);

            promise.done((region: Models.Region) => {
                ctrl.$scope.$apply(() => {
                    ctrl.region = region;
                    ctrl.regionID = region.ID;
                    var regionTree = [];
                    var cur : Models.IRegion = region;
                    while (cur) {
                        regionTree.push(cur);
                        cur = cur.Parent;
                    }
                    ctrl.regionTree = regionTree.reverse();
                    if (regionTree.length < CHILD_NAMES.length)
                        ctrl.childName = CHILD_NAMES[regionTree.length];

                    setTimeout(() => {
                        ctrl.$scope.$apply(() => {
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
        }

    }

    kawaldesa.controller("IndexCtrl", IndexCtrl);
}