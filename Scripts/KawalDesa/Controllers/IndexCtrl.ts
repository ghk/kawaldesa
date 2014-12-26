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

        static $inject = ["$scope", "$location"];

        constructor(public $scope, public $location) {
            var ctrl = this;
            this.currentUser = window.CurrentUser;

            $scope.$on('$locationChangeSuccess', function () {
                ctrl.onLocationChange();
            });
        }

        onLocationChange() {
            var path = this.$location.path();
            var regionID = -1;
            if (path == "/") {
                regionID = 0;
                this.type = "transfer";
            } else if (path.indexOf("/p/") != -1) {
                regionID = parseInt(this.$location.path().replace("/p/", ""));
                this.type = "transfer";
            }
            else if (path.indexOf("/r/") != -1) {
                regionID = parseInt(this.$location.path().replace("/r/", ""));
                this.type = "realization";
            }
            else if (path.indexOf("/dashboard") != -1) {
                this.type = "dashboard";
            }
            if(regionID != -1)
                this.loadRegion(regionID);

            if (regionID == -1)
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

        loadRegion(parentID: number) {
            var ctrl = this;

            this.regionTree = [];
            this.childName = CHILD_NAMES[0];
            
            Models.Region.Get(parentID).done(region => {
                ctrl.$scope.$apply(() => {
                    ctrl.region = region;
                    var regionTree = [];
                    var cur : Models.IRegion = region;
                    while (cur) {
                        regionTree.push(cur);
                        cur = cur.Parent;
                    }
                    ctrl.regionTree = regionTree.reverse();
                    if (regionTree.length < CHILD_NAMES.length)
                        ctrl.childName = CHILD_NAMES[regionTree.length];
                    ctrl.$scope.$broadcast("regionChangeSuccess");
                });
            });
        }

    }

    kawaldesa.controller("IndexCtrl", IndexCtrl);
}