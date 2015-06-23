/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>

module App.Controllers {
    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    function safeApply(scope, fn) {
        (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
    }

    class OrganizationCtrl {

        indexCtrl: IndexCtrl;

        static $inject = ["$scope"];

        organizations: Models.Organization[];
        selected: Models.Organization = null;
        picture: any;

        newOrganizationName: string;
        newOrganizationVolunteerEmail: string;
        newOrganizationAdminEmail: string;

        orgAdmins: Models.UserViewModel[] = null;
        orgVolunteers: Models.UserViewModel[] = null;
        orgUploads: Models.DocumentUpload[] = null;

        savingStates = {};

        constructor(public $scope) {
            var ctrl = this;
            this.indexCtrl = $scope.indexCtrl;

            var orgId = parseInt(this.indexCtrl.$location.path().replace("/orgs/", ""));

            this.savingStates["page"] = true;
            Controllers.OrganizationController.GetAll().done(orgs => {
                $scope.$apply(() => {
                    this.savingStates["page"] = false;
                    ctrl.organizations = orgs;
                    if (orgId > 0) {
                        ctrl.selected = this.organizations.filter(o => o.Id == orgId)[0];
                        ctrl.loadOrganization();
                    }
                });
            });
        }

        isEditable() {
            if (this.indexCtrl.isInRole("admin"))
                return true;
            if (this.indexCtrl.isInRole("org_admin"))
                return this.indexCtrl.currentUser.fkOrganizationId == this.selected.Id;
            return false
        }

        loadOrganization() {
            var ctrl = this;

            ctrl.orgAdmins = ctrl.orgVolunteers = null;
            Services.UserController.GetAllByOrg(this.selected.Id).done(users => {
                ctrl.$scope.$apply(() => {
                    ctrl.orgAdmins = users.filter(u => u.Roles.filter(r => r == 'org_admin').length > 0);
                    ctrl.orgVolunteers = users.filter(u => u.Roles.filter(r => r == 'org_admin').length == 0);
                });
            });

            ctrl.orgUploads = null;
            Controllers.DocumentUploadController.GetAll({ "fkOrganizationId": this.selected.Id }).done(uploads => {
                ctrl.$scope.$apply(() => {
                    ctrl.orgUploads = uploads;
                });
            });
        }

        select(id: number) {
            this.selected = this.organizations.filter(o => o.Id == id)[0];
        }

        saveOrganization() {
            var ctrl = this;
            this.savingStates["org"] = true;
            var multipart = new Scaffold.Multipart({
                forms: this.selected,
                files: this.picture
            });
            Controllers.OrganizationController.Update(multipart).success(() => {
                ctrl.indexCtrl.modal("#organization-modal", "hide");
            }).then(() => {
                ctrl.$scope.$apply(() => {
                    ctrl.savingStates["org"] = false;
                });
            });
        }

        saveNewOrganization() {
            var ctrl = this;
            this.savingStates["new-org"] = true;
            var org = new Models.Organization();
            org.Name = this.newOrganizationName;
            Controllers.OrganizationController.Save(org).done(() => {
                ctrl.organizations.push(org);
                ctrl.indexCtrl.modal("#new-organization-modal", "hide");
            }).always(() => {
                ctrl.$scope.$apply(() => {
                    ctrl.savingStates["new-org"] = false;
                });
            });
        }

        saveNewOrganizationAdmin() {
            var ctrl = this;
            this.savingStates["new-admin"] = true;
            Controllers.OrganizationController
                .AddOrgAdmin(this.selected.Id, this.newOrganizationAdminEmail).done(() => {
                    ctrl.indexCtrl.modal("#new-admin-modal", "hide");
                }).always(() => {
                    ctrl.$scope.$apply(() => {
                        ctrl.savingStates["new-admin"] = false;
                    });
            });
        }

        saveNewOrganizationVolunteer() {
            var ctrl = this;
            this.savingStates["new-volunteer"] = true;
            Controllers.OrganizationController
                .AddOrgVolunteer(this.selected.Id, this.newOrganizationVolunteerEmail).done(() => {
                    ctrl.indexCtrl.modal("#new-volunteer-modal", "hide");
                }).always(() => {
                    ctrl.$scope.$apply(() => {
                        ctrl.savingStates["new-volunteer"] = false;
                    });
            });
        }

    }
    kawaldesa.controller("OrganizationCtrl",  OrganizationCtrl);
}