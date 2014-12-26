/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>
var App;
(function (App) {
    (function (Controllers) {
        var Models = App.Models;

        var TransferRecapitulationCtrl = (function () {
            function TransferRecapitulationCtrl($scope, $upload) {
                this.$scope = $scope;
                this.$upload = $upload;
                this.expandedStates = {};
                this.formTransactions = {};
                this.formErrors = {};
                this.transactions = {};
                var ctrl = this;
                this.indexCtrl = this.$scope.indexCtrl;

                $scope.$on('regionChangeSuccess', function () {
                    ctrl.onRegionChanged();
                });
            }
            TransferRecapitulationCtrl.prototype.onRegionChanged = function () {
                if (this.indexCtrl.type == "transfer") {
                    this.expandedStates = {};
                    this.formTransactions = {};
                    this.formErrors = {};
                    this.transactions = {};
                    this.getRecapitulations(this.indexCtrl.region.ID);
                }
            };

            TransferRecapitulationCtrl.prototype.toggleTransactions = function (entityID, ev) {
                ev.preventDefault();
                this.expandedStates[entityID] = !this.expandedStates[entityID];
                this.loadTransactions(entityID);
            };

            TransferRecapitulationCtrl.prototype.isExpanded = function (entity) {
                var result = this.expandedStates[entity.RegionID];
                return result;
            };

            TransferRecapitulationCtrl.prototype.setFormExpanded = function (entity, state) {
                if (state) {
                    this.formTransactions[entity.RegionID] = {
                        fkSourceID: state[0],
                        fkDestinationID: state[1],
                        fkActorID: state[2]
                    };
                } else {
                    delete this.formTransactions[entity.RegionID];
                    delete this.formErrors[entity.RegionID];
                }
            };

            TransferRecapitulationCtrl.prototype.isFormExpanded = function (entity) {
                return this.formTransactions[entity.RegionID];
            };

            TransferRecapitulationCtrl.prototype.saveForm = function (entity) {
                var ctrl = this;
                this.$upload.upload({
                    type: 'POST',
                    url: '/api/Transaction/AddTransferTransaction',
                    data: this.formTransactions[entity.RegionID],
                    file: this.formTransactions[entity.RegionID].File
                }).success(function () {
                    ctrl.setFormExpanded(entity, null);
                    ctrl.getRecapitulations(entity.ParentRegionID);
                    ctrl.loadTransactions(entity.RegionID);
                }).error(function (formErr) {
                    ctrl.formErrors[entity.RegionID] = {};
                    ctrl.formErrors[entity.RegionID][formErr.Field] = formErr.Message;
                });
            };

            TransferRecapitulationCtrl.prototype.getRecapitulations = function (parentID) {
                var ctrl = this;
                var scope = this.$scope;
                var query = {
                    "SortOrder": "ASC",
                    "ParentID": parentID
                };
                var type = Models.FrozenTransferRecapitulation;
                if (this.indexCtrl.currentUser) {
                    type = Models.TransferRecapitulation;
                }
                type.GetAll(query).done(function (recapitulations) {
                    scope.$apply(function () {
                        scope.entities = recapitulations.filter(function (r) {
                            return r.RegionID != parentID;
                        });
                        scope.total = recapitulations.filter(function (r) {
                            return r.RegionID == parentID;
                        })[0];
                    });
                });
            };

            TransferRecapitulationCtrl.prototype.loadTransactions = function (entityID) {
                var ctrl = this;
                if (this.expandedStates[entityID]) {
                    console.log("haaa");
                    Models.Transaction.GetTransferTransactions(entityID).done(function (details) {
                        ctrl.$scope.$apply(function () {
                            ctrl.transactions[entityID] = details;
                        });
                    });
                }
            };
            TransferRecapitulationCtrl.$inject = ["$scope", "$upload"];
            return TransferRecapitulationCtrl;
        })();

        App.kawaldesa.controller("TransferRecapitulationCtrl", TransferRecapitulationCtrl);
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=TransferRecapitulationCtrl.js.map
