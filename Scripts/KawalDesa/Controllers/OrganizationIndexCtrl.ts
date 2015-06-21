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
        selectedOrganization: Models.Organization;
        newOrganizationAdminEmail: string;

        savingStates = {};

        constructor(public $scope) {
            var ctrl = this;
            this.indexCtrl = $scope.indexCtrl;
            Controllers.OrganizationController.GetAll().done(orgs => {
                ctrl.organizations = orgs;
            });
        }

        saveOrganization() {
            var ctrl = this;
            this.savingStates["org"] = true;
            Controllers.OrganizationController.Save(this.selectedOrganization).done(() => {
                ctrl.savingStates["org"] = false;
            });
        }

        addNewOrganizationAdmin() {
            var ctrl = this;
            this.savingStates["org"] = true;
            Controllers.OrganizationController
                .AddOrgAdmin(this.selectedOrganization.Id, this.newOrganizationAdminEmail).done(() => {
                ctrl.savingStates["org"] = false;
            });
        }

    }
    kawaldesa.controller("OrganizationIndexCtrl",  OrganizationIndexCtrl);
}