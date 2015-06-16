/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>

module App.Controllers {
    import Models = App.Models;

    function safeApply(scope, fn) {
        (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
    }

    class DashboardCtrl {

        state: string

        indexCtrl: IndexCtrl;

        static $inject = ["$scope", "$upload"];

        roles = {};
        national: Models.Region;
        regionPairs: Models.Region[][] = [];
        regionChildren: { [key: number]: Models.Region[] } = {};
        savingStates = {};

        constructor(public $scope, public $upload) {
            $scope.model = {};
            this.indexCtrl = $scope.indexCtrl;
            this.loadThings();
            this.loadUser();
        }

        loadThings() {
            var ctrl = this;
            var $scope = this.$scope;
            var indexCtrl = this.indexCtrl;

            if (indexCtrl.isInRole("admin")) {
                Models.APBN.GetAll().done(apbns => {
                    $scope.$apply(() => {
                        $scope.apbns = apbns;
                    });
                });
                Models.APBDFile.GetAll().done(apbdFiles => {
                    $scope.$apply(() => {
                        $scope.apbdFiles = apbdFiles;
                    });
                });
            }
            Models.Region.Get(0).done(region => {
                $scope.$apply(() => {
                    ctrl.national = region;
                });
            });
            this.getRegionChildren(0);
        }

        loadUser() {
            var ctrl = this;
            Models.User.GetCurrentUser().done((user) => {
                ctrl.$scope.$apply(() => {
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
            Models.User.UpdateVolunteerRoles(selectedRoles).done(() => {
                ctrl.loadUser();
                this.savingStates["roles"] = false;
            });
        }

        getRegionChildren(id: number) {
            if (id != 0 && !id)
                return;

            var ctrl = this;
            if (! (typeof (this.regionChildren[id]) == "undefined"))
                return this.regionChildren[id];

            this.regionChildren[id] = [];
            Models.Region.GetAll({ "ParentID": id }).done(regions => {
                ctrl.$scope.$apply(() => {
                    for (var i = 0; i < regions.length; i++) {
                        ctrl.regionChildren[id].push(regions[i]);
                    }
                });
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
            Models.User.SetScopes(selectedRegions).done(() => {
                ctrl.loadUser();
                ctrl.$scope.$apply(() => {
                    ctrl.savingStates["scopes"] = false;
                });
            });
        }

        uploadFile() {
            if (!this.$scope.file || this.$scope.file[0] == null)
                return;

            var file = this.$scope.file[0];
            var ctrl = this;
            var res = null;

            this.savingStates["apbd"] = true;
            var res = ctrl.$upload.upload({
                type: 'POST',
                url: '/api/APBDFile/PostFile',
                file: file
            }).success(() => {
                var modal: any = $("#apbnFileModal");
                modal.modal("hide");
                this.savingStates["apbd"] = false;
            });
        }

        saveAPBNs() {
            var ctrl = this;
            var apbns : Models.APBN[] = this.$scope.apbns;
            this.savingStates["apbn"] = true;
            for (var i = 0, len = apbns.length; i < len; i++) {
                var apbn = apbns[i];
                apbn.Save().done(() => {
                    ctrl.$scope.$apply(() => {
                        ctrl.savingStates["apbn"] = false;
                    });
                });
            }
        }

    }
    kawaldesa.controller("DashboardCtrl",  DashboardCtrl);
}