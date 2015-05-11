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
        newAccounts: { [rootAccountID: number]: Models.Account[] } = {};
        expenseGroup = Models.ExpenseGroup;
        sector = Models.Sector;

        formErrors: {};
        realizations = {};
        fieldReport = {};
        formFieldReport = {};
        formTransactionRealization: { [key: number]: any } = {}
        expandedStates = {};
        realizationExpandedStates = {};
        filteredExpenses = [];
        filteredSector = [];

        isCompleteStatus: string = "belum";
        totalTargetAmount = {};
        totalRealizationAmount = {};
        totalRootTargetAmount = {};
        totalRootRealizationAmount = {};

        isVolunteer: boolean = false;

        linkWebsiteShow: boolean = false;
        inputUrlShow: boolean = false;
        inputWebsiteShow: boolean = false;
        buttonWebsiteShow: boolean = true;
        buttonSearchFileShow: boolean = true;
        buttonCompleteShow: boolean = true;
        buttonAddAccountShow: boolean = false;
        
        constructor(public $scope, public $upload) {
            var ctrl = this;
            this.indexCtrl = this.$scope.indexCtrl;

            this.formErrors = {};
            this.isVolunteer = this.indexCtrl.isInRoleAndScope('volunteer_account', this.indexCtrl.region.ID);

            $scope.$on('regionChangeSuccess', function () {
                ctrl.onRegionChanged();
            });
        }

        addNewAccount(rootAccountID: number) {
            this.newAccounts[rootAccountID].push(new Models.Account());
            this.filteredExpenses = this.filterObject(Models.ExpenseGroup);
            this.filteredSector = this.filterObject(Models.Sector);
            this.buttonAddAccountShow = true;
        }

        deleteNewAccount(accounts, index: number) {
            accounts.splice(index, 1);
            if (accounts.length == 0) {
                this.buttonAddAccountShow = false;
            }
        }

        saveNewAccounts(rootAccountID: number) {
            var ctrl = this;
            this.formErrors[rootAccountID] = {};
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

        saveNewRealization(accountID) {
            var ctrl = this;
            
            Models.Transaction.AddAccountTransaction(new Scaffold.Multipart({
                forms: this.formTransactionRealization[accountID[0]],
                files: this.formTransactionRealization[accountID[0]].Proof
            })).success(() => {
                ctrl.totalRealizationAmount[accountID[1]] += this.formTransactionRealization[accountID[0]].Amount;
                ctrl.totalRootRealizationAmount[accountID[2]] += this.formTransactionRealization[accountID[0]].Amount
                ctrl.setFormAccount(accountID[0], 0, false);
                ctrl.loadRealization(accountID[0]);
            });
        }

        saveNewFieldReport(realizationID) {
            var ctrl = this;

            console.log(this.formFieldReport[realizationID]);
            Models.FieldReport.AddFieldReport(new Scaffold.Multipart({
                forms: this.formFieldReport[realizationID],
                files: this.formFieldReport[realizationID].Report
            }))
                //.success(() => {
                //    ctrl.loadFieldReport(realizationID);
                //});
        }

        filterObject(object) {
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

        isExpanded(entity) {
            var result = this.expandedStates[entity.ID];
            return result;
        }

        isRealizationExpanded(entity) {
            var result = this.realizationExpandedStates[entity.Realization.ID];
            return result;
        }

        isFormExpanded(entity) {
            return this.formTransactionRealization[entity.ID];
        }

        isFormRealizationExpanded(entity) {
            return this.formFieldReport[entity.Realization.ID];
        }

        toggleAccountExpander(accountID, ev) {
            ev.preventDefault();
            this.expandedStates[accountID] = !this.expandedStates[accountID];
            this.loadRealization(accountID);
        }

        toggleRealizationExpander(realizationID, ev) {
            ev.preventDefault();
            this.realizationExpandedStates[realizationID] = !this.realizationExpandedStates[realizationID];
            //this.loadFieldReport(realizationID);
        }       

        setFormAccount(accountID, rootAccountID, state) {
            if (state)
                this.formTransactionRealization[accountID] = {
                    fkAccountID: accountID
                };
            else 
                delete this.formTransactionRealization[accountID];
        }

        setFormFieldReport(realizationID, state) {
            if (state)
                this.formFieldReport[realizationID] = {
                    RealizationID: realizationID
                };
            else
                delete this.formFieldReport[realizationID];
        }

        isRootAccount(parentAccountID) {
            if (parentAccountID != null)
                return true;
            return false;
        }

        onRegionChanged() {
            if (this.indexCtrl.region.Type == 4) {
                this.getAPBDes(this.indexCtrl.region.ID);
                this.formTransactionRealization = {};
                this.formFieldReport = {};
                this.realizations = {};
                this.fieldReport = {};
            }
        }

        onRoleVolunteer(roleAccepted: boolean) {
            this.buttonWebsiteShow = roleAccepted;
            this.buttonSearchFileShow = roleAccepted;
            this.buttonCompleteShow = roleAccepted;
            this.inputUrlShow = roleAccepted;
            if (this.indexCtrl.region.Website) {
                this.linkWebsiteShow = true;
                this.inputWebsiteShow = false;
            }
        }

        onWebsiteShowInput() {
            this.linkWebsiteShow = false;
            this.buttonWebsiteShow = false;
            this.inputWebsiteShow = true;
        }

        onWebsiteShowLink() {
            this.linkWebsiteShow = true;
            this.buttonWebsiteShow = true;
            this.inputWebsiteShow = false;
        }

        onSubmittingWebsite() {
            var ctrl = this;
            Models.Region.UpdateWebsite(this.indexCtrl.region.ID, this.indexCtrl.region.Website)
                    .done(() => {
                        ctrl.$scope.$apply(() => {
                            this.onWebsiteShowLink();
                        });
                    })
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

        loadRealization(accountID) {
            var ctrl = this;
            if (this.expandedStates[accountID]) {
                Models.Transaction.GetRealizationTransactions(accountID).done(details => {
                    ctrl.$scope.$apply(() => {
                        ctrl.realizations[accountID] = details;
                    });
                });
            }
        }

        loadFieldReport(realizationID) {
            var ctrl = this;
            if (this.realizationExpandedStates[realizationID]) {
                Models.FieldReport.GetPicture(realizationID).done(details => {
                    console.log(details);
                    ctrl.$scope.$apply(() => {
                        ctrl.fieldReport[realizationID] = details;
                    });
                });
            }
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
                        var totalRootObj = 0;
                        var totalRootRealizationObj = 0;
                        var root = ctrl.rootAccounts[i];
                        root.ChildAccounts = apbdes.Accounts
                            .filter(a => a.Type == root.Type && a.fkParentAccountID != null);
                        root.ChildAccounts.sort((a, b) => a.Code.localeCompare(b.Code));

                        for (var j = 0; j < root.ChildAccounts.length; j++) {
                            var totalObj = 0;
                            var totalRealizationObj = 0;

                            for (var k = 0; k < root.ChildAccounts[j].ChildAccounts.length; k++) {
                                var obj = root.ChildAccounts[j].ChildAccounts[k].Target;
                                var realizationObj = root.ChildAccounts[j].ChildAccounts[k].TotalRealizationPerAccount;

                                totalObj += obj;
                                totalRealizationObj += realizationObj;
                            }

                            if (root.ChildAccounts[j].ChildAccounts.length > 0) {
                                ctrl.totalTargetAmount[root.ChildAccounts[j].ID] = totalObj;
                                ctrl.totalRealizationAmount[root.ChildAccounts[j].ID] = totalRealizationObj;

                                totalRootObj += totalObj;
                                totalRootRealizationObj += totalRealizationObj;
                            }
                        }

                        ctrl.totalRootTargetAmount[ctrl.rootAccounts[i].ID] = totalRootObj;
                        ctrl.totalRootRealizationAmount[ctrl.rootAccounts[i].ID] = totalRootRealizationObj;
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