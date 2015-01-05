/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;

    class APBDesCtrl {

        static $inject = ["$scope", "$upload"];

        indexCtrl: IndexCtrl;
        apbdes: Models.APBDes;
        formErrors: {}
        rootAccounts: Models.Account[];
        newAccounts: { [rootAccountID: number]: Models.Account[] } = {};

        websiteText: string;
        websiteDisable: boolean = true;
        isCompleteStatus: string = "belum";


        constructor(public $scope, public $upload) {
            var ctrl = this;
            this.indexCtrl = this.$scope.indexCtrl;

            this.formErrors = {};
            $scope.$on('regionChangeSuccess', function () {
                ctrl.onRegionChanged();
            });
        }

        addNewAccount(rootAccountID: number) {
            this.newAccounts[rootAccountID].push(new Models.Account());
        }

        saveNewAccounts(rootAccountID: number) {
            var ctrl = this;
            Models.APBDes.AddAccounts(this.apbdes.ID, rootAccountID, this.newAccounts[rootAccountID])
                .done(() => {
                    ctrl.getAPBDes(ctrl.indexCtrl.region.ID);
                })
                .fail((error: any) => {
                    ctrl.$scope.$apply(() => {
                        var err = {};
                        for (var i = 0; i < this.newAccounts[rootAccountID].length; i++) {
                            for (var j = 0; j < error.responseJSON[i].length; j++) {
                                err[error.responseJSON[i][j].Field] = error.responseJSON[i][j].Message;
                                ctrl.formErrors[rootAccountID] = {};
                                ctrl.formErrors[rootAccountID][i] = {};
                                ctrl.formErrors[rootAccountID][i][j] = err;
                            }
                        }
                    });
                });
        }

        onRegionChanged() {
            if (this.indexCtrl.region.Type == 4) {
                this.getAPBDes(this.indexCtrl.region.ID);
            }
        }

        onEnableInput() {
            this.websiteDisable = false;
        }

        onSubmittingWebsite() {
            var ctrl = this;
            Models.Region.UpdateWebsite(this.indexCtrl.region.ID, this.websiteText)
                .done(() => {
                    ctrl.$scope.$apply(() => {
                        this.websiteDisable = true;
                    });
                })
        }

        onComplete() {
            var ctrl = this;
            Models.APBDes.Complete(this.apbdes.ID)
                .done(() => {
                    ctrl.$scope.$apply(() => {
                        this.isCompleteStatus = "sudah";
                    });
                })
        }

        getAPBDes(regionID: number) {
            var ctrl = this;
            var scope = this.$scope;
            Models.APBDes.GetByRegionID(regionID).done((apbdes) => {
                ctrl.$scope.$apply(() => {
                    ctrl.apbdes = apbdes;
                    ctrl.rootAccounts = apbdes.Accounts.filter(a => a.fkParentAccountID == null);
                    ctrl.rootAccounts.sort((a, b) => a.Type - b.Type);
                    for (var i = 0; i < ctrl.rootAccounts.length; i++) {
                        var root = ctrl.rootAccounts[i];
                        root.ChildAccounts = apbdes.Accounts
                            .filter(a => a.Type == root.Type && a.fkParentAccountID != null);
                        root.ChildAccounts.sort((a, b) => a.Code.localeCompare(b.Code));
                    }

                    ctrl.newAccounts = {};
                    for (var i = 0; i < ctrl.rootAccounts.length; i++) {
                        var root = ctrl.rootAccounts[i];
                        ctrl.newAccounts[root.ID] = [];
                    }

                    if (apbdes.IsCompleted)
                        this.isCompleteStatus = "sudah";
                });
            });
        }

    }

    kawaldesa.controller("APBDesCtrl", APBDesCtrl);
}