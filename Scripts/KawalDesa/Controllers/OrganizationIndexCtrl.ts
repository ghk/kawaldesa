/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>

module App.Controllers {
    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    function safeApply(scope, fn) {
        (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
    }

    class OrganizationIndexCtrl {

        indexCtrl: IndexCtrl;

        static $inject = ["$scope"];

        organizations: Models.Organization[];
        selected: Models.Organization;
        newOrganizationAdminEmail: string;

        savingStates = {};

        constructor(public $scope) {
            var ctrl = this;
            this.indexCtrl = $scope.indexCtrl;
            Controllers.OrganizationController.GetAll().done(orgs => {
                $scope.$apply(() => {
                    ctrl.organizations = orgs;
                });
            });
        }

        addOrganization() {
            this.selected = new Models.Organization();
            var modal: any = $("#organization-modal");
            modal.modal("show");
        }

        saveOrganization() {
            var ctrl = this;
            this.savingStates["org"] = true;
            Controllers.OrganizationController.Save(this.selected).done(() => {
                ctrl.savingStates["org"] = false;
            });
        }

        addNewOrganizationAdmin() {
            var ctrl = this;
            this.savingStates["org"] = true;
            Controllers.OrganizationController
                .AddOrgAdmin(this.selected.Id, this.newOrganizationAdminEmail).done(() => {
                ctrl.savingStates["org"] = false;
            });
        }

    }
    kawaldesa.controller("OrganizationIndexCtrl",  OrganizationIndexCtrl);
}