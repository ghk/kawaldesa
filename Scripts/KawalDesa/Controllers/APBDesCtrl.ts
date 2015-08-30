/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    class ApbdesCtrl {

        static $inject = ["$scope", "$upload"];

        indexCtrl: IndexCtrl;
        apbdes: Models.Apbdes;
        rootAccounts: Models.Account[];
        newAccounts: { [rootAccountId: number]: Models.Account[] } = {};
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
            this.isVolunteer = this.indexCtrl.isInRoleAndScope('volunteer_account', this.indexCtrl.region.Id);

            $scope.$on('regionChangeSuccess', function () {
                ctrl.onRegionChanged();
            });
        }

        addNewAccount(rootAccountId: number) {
            this.newAccounts[rootAccountId].push(new Models.Account());
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

        saveNewAccounts(rootAccountId: number) {
            var ctrl = this;
            this.formErrors[rootAccountId] = {};
            Controllers.ApbdesController.AddAccounts(this.apbdes.Id, rootAccountId, this.newAccounts[rootAccountId])
                .then(() => {
                    ctrl.getApbdes(ctrl.indexCtrl.region.Id);
                })
                .catch((error: any) => {
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
                        for (var i = 0; i < ctrl.newAccounts[rootAccountId].length; i++) {
                            ctrl.formErrors[rootAccountId][i] = getError(i);
                        }
                    });
                });
        }

        saveNewRealization(accountId) {
            var ctrl = this;
            
            Controllers.TransactionController.AddAccountTransaction(new Scaffold.Multipart({
                forms: this.formTransactionRealization[accountId[0]],
                files: this.formTransactionRealization[accountId[0]].Proof
            })).success(() => {
                ctrl.totalRealizationAmount[accountId[1]] += this.formTransactionRealization[accountId[0]].Amount;
                ctrl.totalRootRealizationAmount[accountId[2]] += this.formTransactionRealization[accountId[0]].Amount
                ctrl.setFormAccount(accountId[0], 0, false);
                ctrl.loadRealization(accountId[0]);
            });
        }

        saveNewFieldReport(realizationId) {
            var ctrl = this;

            console.log(this.formFieldReport[realizationId]);
            Controllers.FieldReportController.AddFieldReport(new Scaffold.Multipart({
                forms: this.formFieldReport[realizationId],
                files: this.formFieldReport[realizationId].Report
            }))
                //.success(() => {
                //    ctrl.loadFieldReport(realizationId);
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
            var result = this.expandedStates[entity.Id];
            return result;
        }

        isRealizationExpanded(entity) {
            var result = this.realizationExpandedStates[entity.Realization.Id];
            return result;
        }

        isFormExpanded(entity) {
            return this.formTransactionRealization[entity.Id];
        }

        isFormRealizationExpanded(entity) {
            return this.formFieldReport[entity.Realization.Id];
        }

        toggleAccountExpander(accountId, ev) {
            ev.preventDefault();
            this.expandedStates[accountId] = !this.expandedStates[accountId];
            this.loadRealization(accountId);
        }

        toggleRealizationExpander(realizationId, ev) {
            ev.preventDefault();
            this.realizationExpandedStates[realizationId] = !this.realizationExpandedStates[realizationId];
            //this.loadFieldReport(realizationId);
        }       

        setFormAccount(accountId, rootAccountId, state) {
            if (state)
                this.formTransactionRealization[accountId] = {
                    fkAccountId: accountId
                };
            else 
                delete this.formTransactionRealization[accountId];
        }

        setFormFieldReport(realizationId, state) {
            if (state)
                this.formFieldReport[realizationId] = {
                    RealizationId: realizationId
                };
            else
                delete this.formFieldReport[realizationId];
        }

        isRootAccount(parentAccountId) {
            if (parentAccountId != null)
                return true;
            return false;
        }

        onRegionChanged() {
            if (this.indexCtrl.type == "realization") {
                this.getApbdes(this.indexCtrl.region.Id);
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
            
            Controllers.RegionController.UpdateWebsite(this.indexCtrl.region.Id, this.indexCtrl.region.Website)
                    .then(() => {
                        ctrl.$scope.$apply(() => {
                            this.onWebsiteShowLink();
                        });
                    })
        }

        onComplete() {
            var ctrl = this;
            Controllers.ApbdesController.Complete(this.apbdes.Id)
                .then(() => {
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

        loadRealization(accountId) {
            var ctrl = this;
            if (this.expandedStates[accountId]) {
                Controllers.TransactionController.GetRealizationTransactions(accountId).then(details => {
                    ctrl.$scope.$apply(() => {
                        ctrl.realizations[accountId] = details;
                    });
                });
            }
        }

        loadFieldReport(realizationId) {
            var ctrl = this;
            if (this.realizationExpandedStates[realizationId]) {
                Controllers.FieldReportController.GetPicture(realizationId).then(details => {
                    console.log(details);
                    ctrl.$scope.$apply(() => {
                        ctrl.fieldReport[realizationId] = details;
                    });
                });
            }
        }

        getApbdes(regionId: string) {
            var ctrl = this;
            var scope = this.$scope;
            Controllers.ApbdesController.GetByRegionId(regionId).then((apbdes) => {
                ctrl.$scope.$apply(() => {
                    ctrl.apbdes = new App.Models.Apbdes(apbdes.data);
                    ctrl.rootAccounts = ctrl.apbdes.Accounts.filter(a => a.fkParentAccountId == null);
                    ctrl.rootAccounts.sort((a, b) => a.Type - b.Type);
                    for (var i = 0; i < ctrl.rootAccounts.length; i++) {
                        var totalRootObj = 0;
                        var totalRootRealizationObj = 0;
                        var root = ctrl.rootAccounts[i];
                        root.ChildAccounts = ctrl.apbdes.Accounts
                            .filter(a => a.Type == root.Type && a.fkParentAccountId != null);
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
                                ctrl.totalTargetAmount[root.ChildAccounts[j].Id] = totalObj;
                                ctrl.totalRealizationAmount[root.ChildAccounts[j].Id] = totalRealizationObj;

                                totalRootObj += totalObj;
                                totalRootRealizationObj += totalRealizationObj;
                            }
                        }

                        ctrl.totalRootTargetAmount[ctrl.rootAccounts[i].Id] = totalRootObj;
                        ctrl.totalRootRealizationAmount[ctrl.rootAccounts[i].Id] = totalRootRealizationObj;
                    }

                    ctrl.newAccounts = {};
                    for (var i = 0; i < ctrl.rootAccounts.length; i++) {
                        var root = ctrl.rootAccounts[i];
                        ctrl.newAccounts[root.Id] = [];
                    }

                    if (ctrl.apbdes.IsCompleted) {
                        this.isCompleteStatus = "sudah";
                        this.buttonCompleteShow = false;
                    }
                });
            });
        }
    }

    kawaldesa.controller("ApbdesCtrl", ApbdesCtrl);
}