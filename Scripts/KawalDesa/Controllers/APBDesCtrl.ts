/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;

    class APBDesCtrl {

        static $inject = ["$scope", "$upload"];

        indexCtrl: IndexCtrl;
        apbdes: Models.APBDes;
        rootAccounts: Models.Account[];
        expenseTypeAccount: number = Models.AccountType.EXPENSE;
        newAccounts: { [rootAccountID: number]: Models.Account[] } = {};

        formErrors: {};
        filteredExpenses = [];
        filteredSector = [];

        websiteText: string;
        linktWebsiteShow: boolean = true;
        inputWebsiteShow: boolean = false;
        buttontWebsiteShow: boolean = true;
        buttonSearchFileShow: boolean = true;
        buttonCompleteShow: boolean = true;
        isCompleteStatus: string = "belum";

        constructor(public $scope, public $upload) {
            var ctrl = this;
            this.indexCtrl = this.$scope.indexCtrl;

            this.formErrors = {};
            this.websiteText = this.indexCtrl.region.Website;
            this.onRoleVolunteer(this.indexCtrl.isInRoleAndScope('volunteer_account', this.indexCtrl.region.ID));

            if (!this.indexCtrl.region.Website) {
                this.onWebsiteShowInput();
            }

            $scope.$on('regionChangeSuccess', function () {
                ctrl.onRegionChanged();
            });
        }

        addNewAccount(rootAccountID: number) {
            this.newAccounts[rootAccountID].push(new Models.Account());
            this.filteredExpenses = this.filterObject(Models.AccountType);
            this.filteredSector = this.filterObject(Models.Sector);
        }

        deleteNewAccount(accounts: any, index: number) {
            accounts.splice(index, 1);
        }

        saveNewAccounts(rootAccountID: number) {
            var ctrl = this;
            ctrl.formErrors[rootAccountID] = {};
            Models.APBDes.AddAccounts(this.apbdes.ID, rootAccountID, this.newAccounts[rootAccountID])
                .done(() => {
                    ctrl.getAPBDes(ctrl.indexCtrl.region.ID);
                })
                .fail((error: any) => {
                    ctrl.$scope.$apply(() => {
                        var modelState = error.responseJSON.ModelState;
                        function getError(idx) {
                            var idxKey = "[" + idx + "].";
                            var keys = Object.keys(modelState);
                            var results = {};
                            for (var i = 0; i < keys.length; i++) {
                                if (keys[i].indexOf(idxKey) == 0) {
                                    var attr = keys[i].substr(idxKey.length);
                                    results[attr] = modelState[keys[i]].join(",");
                                }
                            }
                            return results;
                        }
                        for (var i = 0; i < ctrl.newAccounts[rootAccountID].length; i++) {
                            ctrl.formErrors[rootAccountID][i] = getError(i);
                        }
                    });
                });
        }

        filterObject(object: any) {
            var keys = Object.keys(object);
            var filteredObject = [];

            for (var i = 0; i < keys.length; i++) {
                if (!isNaN(parseInt(keys[i]))) {
                    var item = object[keys[i]];

                    filteredObject.push(item);
                }
            }

            return filteredObject;
        }

        onRegionChanged() {
            if (this.indexCtrl.region.Type == 4) {
                this.getAPBDes(this.indexCtrl.region.ID);
            }
        }

        onRoleVolunteer(roleAccepted: boolean) {
            this.buttontWebsiteShow = roleAccepted;
            this.buttonSearchFileShow = roleAccepted;
            this.buttonCompleteShow = roleAccepted;
        }

        onWebsiteShowInput() {
            this.linktWebsiteShow = false;
            this.buttontWebsiteShow = false;
            this.inputWebsiteShow = true;
        }

        onWebsiteShowLink() {
            this.linktWebsiteShow = true;
            this.buttontWebsiteShow = true;
            this.inputWebsiteShow = false;
        }

        onSubmittingWebsite() {
            var ctrl = this;
            if (this.websiteText)
                Models.Region.UpdateWebsite(this.indexCtrl.region.ID, this.websiteText)
                    .done(() => {
                        ctrl.$scope.$apply(() => {
                            this.onWebsiteShowLink();
                        });
                    })
                else {
                this.websiteText = this.indexCtrl.region.Website;
                this.onWebsiteShowLink();
            }
        }

        onComplete() {
            var ctrl = this;
            Models.APBDes.Complete(this.apbdes.ID)
                .done(() => {
                    ctrl.$scope.$apply(() => {
                        this.isCompleteStatus = "sudah";
                        this.buttonCompleteShow = false;
                    });
                })
        }

        onRedirectWebsite(website: string) {
            var websiteProtocol = website.substring(0, website.indexOf(':'));
            if (websiteProtocol != 'http')
                window.open("http://" + website);
            else
                window.open(website);
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

                    if (apbdes.IsCompleted) {
                        this.isCompleteStatus = "sudah";
                        this.buttonCompleteShow = false;
                    }
                });
            });
        }
    }

    kawaldesa.controller("APBDesCtrl", APBDesCtrl);
}