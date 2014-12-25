/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>

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

        constructor(public $scope, public $upload) {
            $scope.model = {};
            this.indexCtrl = $scope.indexCtrl;
            this.loadThings();
            this.loadRoles();
        }

        loadThings() {
            var $scope = this.$scope;
            var indexCtrl = this.indexCtrl;

            if (indexCtrl.isInRole("admin")) {
                Models.APBN.GetAll().done(apbns => {
                    safeApply($scope, () => {
                        $scope.apbns = apbns;
                    });
                });
                Models.APBDFile.GetAll().done(apbdFiles => {
                    safeApply($scope, () => {
                        $scope.apbdFiles = apbdFiles;
                    });
                });
            }
        }

        loadRoles() {
            var ctrl = this;
            Models.User.GetCurrentUser().done((user) => {
                ctrl.$scope.$apply(() => {
                    ctrl.roles = {};
                    for (var i = 0; i < user.Roles.length; i++) {
                        ctrl.roles[user.Roles[i]] = true;
                    }
                });
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
            Models.User.UpdateVolunteerRoles(selectedRoles).done(() => {
                ctrl.loadRoles();
            });
        }

        uploadFile() {
            if (!this.$scope.file || this.$scope.file[0] == null)
                return;

            var file = this.$scope.file[0];
            var ctrl = this;
            var res = null;

            var res = ctrl.$upload.upload({
                type: 'POST',
                url: '/api/APBDFile/PostFile',
                file: file
            }).success(() => {
                var modal: any = $("#apbnFileModal");
                modal.modal("hide");
            });
        }

    }
    kawaldesa.controller("DashboardCtrl",  DashboardCtrl);
}