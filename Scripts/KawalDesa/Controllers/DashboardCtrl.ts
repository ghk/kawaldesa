/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="../../gen/Controllers.ts"/>

module App.Controllers {
    import Models = App.Models;
    import Controllers = App.Controllers.Models;

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
                Controllers.ApbnController.GetAll().then(apbns => {
                    $scope.$apply(() => {
                        $scope.apbns = apbns;
                    });
                });
            }
            Controllers.RegionController.Get("0").then(region => {
                $scope.$apply(() => {
                    ctrl.national = region.data;
                });
            });
        }

        loadUser() {
            var ctrl = this;
            Services.UserController.GetCurrentUser().then((user) => {
                ctrl.$scope.$apply(() => {
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
            /*
            Models.User.UpdateVolunteerRoles(selectedRoles).then(() => {
                ctrl.loadUser();
                this.savingStates["roles"] = false;
            });
            */
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
            var apbns : Models.Apbn[] = this.$scope.apbns;
            this.savingStates["apbn"] = true;
            for (var i = 0, len = apbns.length; i < len; i++) {
                var apbn = apbns[i];                                                              
                Controllers.ApbnController.Save(apbn).then(() => {
                    ctrl.$scope.$apply(() => {
                        ctrl.savingStates["apbn"] = false;
                    });
                });
            }
        }

    }
    kawaldesa.controller("DashboardCtrl",  DashboardCtrl);
}