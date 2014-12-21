/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../Services/Principal.ts"/>
/// <reference path="../Dashboard.ts"/>

module KawalDesa.Controllers {
    import Models = App.Models;
    import APBNFileUpload = App.Models.APBNFileUpload;

    function safeApply(scope, fn) {
        (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
    }

    class IndexCtrl {

        state: string

        static $inject = ["$scope", "$upload", "principal"];

        roles = {};

        constructor(public $scope, public $upload, public principal: IPrincipal) {
            var ctrl = this;
            $scope.principal = principal;
            $scope.model = {};
            principal.identity().then(function (identity) {
                ctrl.loadThings();
                ctrl.loadRoles();
            });
        }

        loadThings() {
            var $scope = this.$scope;
            var principal = this.principal;

            principal.identity().then(function (identity) {
                $scope.user = new Models.User(identity.user);
            });

            if (principal.isInRole("admin")) {
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
                Models.TransactionFile.GetAll().done(transactionFiles => {
                    safeApply($scope, () => {
                        $scope.transactionFiles = transactionFiles;
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

            APBNFileUpload.UploadFile(file, res, ctrl.$upload).success(function (data, status, headers, config) {
                var modal: any = $("#apbnFileModal");
                modal.modal("hide");
            });;
        }

    }
    dashboard.controller("IndexCtrl",  IndexCtrl);
}