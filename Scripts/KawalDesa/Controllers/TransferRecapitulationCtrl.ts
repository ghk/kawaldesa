/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;

    class TransferRecapitulationCtrl {

        static $inject = ["$scope", "$upload"];

        expandedStates = {};
        formTransactions: { [key: number]: any } = {};
        formErrors = {};
        transactions: { [key: number]: any } = {};
        indexCtrl: IndexCtrl;

        constructor(public $scope, public $upload) {
            var ctrl = this;
            this.indexCtrl = this.$scope.indexCtrl;

            $scope.$on('regionChangeSuccess', function () {
                ctrl.onRegionChanged();
            });
        }

        onRegionChanged() {
            if (this.indexCtrl.type == "transfer") {
                this.expandedStates = {};
                this.formTransactions = {};
                this.formErrors = {};
                this.transactions = {};
                this.getRecapitulations(this.indexCtrl.region.ID);
            }
        }

        toggleTransactions(entityID, ev) {
            ev.preventDefault();
            this.expandedStates[entityID] = !this.expandedStates[entityID];
            this.loadTransactions(entityID);
        }

        isExpanded(entity) {
            var result = this.expandedStates[entity.RegionID];
            return result;
        }

        setFormExpanded(entity, state) {
            if (state) {
                this.formTransactions[entity.RegionID] = {
                    fkSourceID: state[0],
                    fkDestinationID: state[1],
                    fkActorID: state[2]
                }
            } else {
                delete this.formTransactions[entity.RegionID];
                delete this.formErrors[entity.RegionID];
            }
        }

        isFormExpanded(entity) {
            return this.formTransactions[entity.RegionID];
        }

        saveForm(entity) {
            var ctrl = this;

            Models.Transaction.AddTransferTransaction(new Scaffold.Multipart({
                forms: this.formTransactions[entity.RegionID],
                files: this.formTransactions[entity.RegionID].File
            })).success(() => {
                ctrl.setFormExpanded(entity, null);
                ctrl.getRecapitulations(entity.ParentRegionID);
                ctrl.loadTransactions(entity.RegionID);
            }).error(formErr => {
                ctrl.formErrors[entity.RegionID] = {};
                ctrl.formErrors[entity.RegionID][formErr.Field] = formErr.Message;
                var modelState = formErr.ModelState;
                var keys = Object.keys(modelState);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    ctrl.formErrors[entity.RegionID][key] = modelState[key].join(",");
                }
            });
        }

        getRecapitulations(parentID: number) {
            var ctrl = this;
            var scope = this.$scope;
            var query = {
                "SortOrder": "ASC",
                "ParentID": parentID
            }
            var type = Models.FrozenTransferRecapitulation;
            if (this.indexCtrl.currentUser) {
                type = Models.TransferRecapitulation;
            }
            type.GetAll(query).done((recapitulations) => {
                scope.$apply(() => {
                    scope.entities = recapitulations.filter(r => r.RegionID != parentID);
                    scope.total = recapitulations.filter(r => r.RegionID == parentID)[0];
                });
            });
        }

        loadTransactions(entityID) {
            var ctrl = this;
            if (this.expandedStates[entityID]) {
                Models.Transaction.GetTransferTransactions(entityID).done(details => {
                    ctrl.$scope.$apply(() => {
                        ctrl.transactions[entityID] = details;
                    });
                });
            }
        }

        moveFillMeterBar(fullValue:number, realValue:number) {
            var getPercent = (realValue / fullValue) * 100;
            return { "width": getPercent + "%" };
        }

    }

    kawaldesa.controller("TransferRecapitulationCtrl", TransferRecapitulationCtrl);
}