/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="../../gen/Controllers.ts"/>

module App.Controllers {
    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    function safeApply(scope, fn) {
        (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
    }

    class UserCtrl {

        indexCtrl: IndexCtrl;

        static $inject = ["$scope"];

        roles = {};
        national: Models.Region;
        regionPairs: Models.Region[][] = [];
        regionChildren: { [key: number]: Models.Region[] } = {};

        selected: Models.UserViewModel = null;

        uploads: Models.Spreadsheet[] = null;

        savingStates = {};

        constructor(public $scope) {
            var ctrl = this;
            this.indexCtrl = $scope.indexCtrl;

            var id = this.indexCtrl.$location.path().replace("/u/", "");
            this.loadUser(id);
            Controllers.RegionController.Get("0").then(region => {
                ctrl.national = region.data;
            });
        }

        isEditable() {
            if (this.selected == null)
                return false;

            var isAdmin = this.selected.Roles.filter(r => r == "admin" || r == "org_admin");
            if (isAdmin.length > 0)
                return false;
            if (this.indexCtrl.isInRole("admin"))
                return true;
            if (this.indexCtrl.isInRole("org_admin"))
                return this.indexCtrl.currentUser.fkOrganizationId == this.selected.Organization.Id;
            return false
        }

        getRegionChildren(id: number) {
            if (id != 0 && !id)
                return;

            var ctrl = this;
            if (! (typeof (this.regionChildren[id]) == "undefined"))
                return this.regionChildren[id];

            this.regionChildren[id] = [];
            Controllers.RegionController.GetAll({ "ParentId": id }).then(regions => {
                for (var i = 0; i < regions.data.length; i++) {
                    ctrl.regionChildren[id].push(regions.data[i]);
                }
            });
            return this.regionChildren[id];
        }

        truncateRegionPair(regionPair, index) {
            for (var i = index + 1; i < regionPair.length; i++) {
                regionPair[i] = null;
            }
        }

        saveScopes() {
            var ctrl = this;
            var selectedRegions : Models.Region[] = [];
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
                if (last){
                    selectedRegions.push(last);
                }
            }

            this.savingStates["scopes"] = true;
            Services.UserController.SetScopes(this.selected.Id, selectedRegions).then(() => {
                ctrl.loadUser(this.selected.Id);
                ctrl.savingStates["scopes"] = false;
            });
        }

        loadUser(id: string) {
            var ctrl = this;
            Services.UserController.Get(id).then((user) => {
                ctrl.selected = user.data;
                ctrl.roles = {};
                for (var i = 0; i < user.data.Roles.length; i++) {
                    ctrl.roles[user.data.Roles[i]] = true;
                }
                ctrl.regionPairs = [];
                for (var i = 0; i < user.data.Scopes.length; i++) {
                    var regionPair = [null, null, null, null, null];
                    var current = user.data.Scopes[i];
                    while (current) {
                        regionPair[current.Type] = current;
                        current = current.Parent;
                    }
                    ctrl.regionPairs.push(regionPair);
                }
                console.log(ctrl.regionPairs);
            });

            ctrl.uploads = null;
            Controllers.SpreadsheetController.GetAll({ "fkCreatedById": id }).then(uploads => {
                ctrl.uploads = uploads.data;
            });
        }

        saveRoles() {
            var ctrl = this;
            var selectedRoles = [];
            for (var key in this.roles) {
                if (this.roles[key]) {
                    selectedRoles.push(key);
                }
            }
            this.savingStates["roles"] = true;
            Services.UserController.UpdateVolunteerRoles(this.selected.Id, selectedRoles).then(() => {
                this.savingStates["roles"] = false;
            });
        }

        saveAnonymous() {
            var ctrl = this;
            this.savingStates["anonymous"] = true;
            Services.UserController.SetAnonymous(!ctrl.selected.IsAnonymous).then(() => {
                location.reload();
            });
        }
    }

    kawaldesa.controller("UserCtrl",  UserCtrl);
}