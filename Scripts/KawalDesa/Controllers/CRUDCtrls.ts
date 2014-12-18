/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/underscore/underscore.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../KawalDesa.ts"/>

module KawalDesa.Controllers {
    import Models = App.Models;

    class CRUDCtrl {

        type: any
        query: {}
        showForm: boolean;
        IDField: string = "ID";
        sortField: string = this.IDField;
        sortOrder: string = "ASC";
        keywords: string;

        constructor(public $scope, public cfpLoadingBar) {
            var ctrl = this;
            $scope.model = {};

            $scope.page = 1;
            $scope.entitiesPerPage = 10;
            $scope.pagination = { current: 1 };

            $scope.$watch("entitiesPerPage", function (newVal, oldVal) {
                if (newVal === oldVal)
                    return;
                ctrl.query = ctrl.generateQuery(ctrl.sortField, ctrl.sortOrder,
                    ctrl.$scope.page, ctrl.$scope.entitiesPerPage, ctrl.keywords);
                ctrl.fetch(ctrl.query);
            });
        }

        save(): void {
            var ctrl = this;
            var model = new this.type(this.$scope.model);

            model.Save().done(() => {
                ctrl.updateEntity(model);
                ctrl.$scope.formMessage = {
                    type: "success",
                    message: "Successfully saved!"
                };
            }).fail(response => {
                    ctrl.$scope.formMessage = {
                        type: "error",
                        message: response.responseJSON.Message,
                        errors: response.responseJSON.ModelState
                    };
                }).always(() => {
                    ctrl.$scope.$apply(() => {
                        ctrl.$scope.formMessage;
                    });
                });
        }

        edit(model: any): void {
            this.toggleForm(true);
            this.$scope.model = model;
        }

        updateEntity(model: any): void {
            var ctrl = this;
            var scope = this.$scope;
            for (var i = 0; i < scope.entities.length; i++) {
                if (model[ctrl.IDField] !== null && model[ctrl.IDField] === scope.entities[i][ctrl.IDField]) {
                    scope.$apply(() => {
                        scope.entities[i] = model;
                    });
                    return;
                }
            }
            scope.$apply(() => {
                scope.entities.push(model);
                scope.totalEntities += 1;
            });
        }

        fetch(query: any): void {
            var scope = this.$scope;
            var ctrl = this;
            ctrl.cfpLoadingBar.start();
            this.type.Count(query).done(count => {
                scope.$apply(() => {
                    scope.totalEntities = count;
                })
            });

            this.type.GetAll(query).done(entities => {
                scope.$apply(() => {
                    scope.entities = entities;
                    ctrl.cfpLoadingBar.complete();
                });
            });
        }

        search(): void {
            var keywords = this.keywords;
            if (!this.keywords)
                keywords = "";
            else if (this.keywords.length < 3)
                return;

            this.query = this.generateQuery(this.sortField, this.sortOrder, 1, this.$scope.entitiesPerPage, keywords);
            this.fetch(this.query);
        }

        changePage(newPage: number): void {
            this.$scope.page = newPage;
            this.query = this.generateQuery(this.sortField, this.sortOrder, newPage, this.$scope.entitiesPerPage, this.keywords);
            this.fetch(this.query);
        }

        generateQuery(sortField: string, sortOrder: string, pageBegin: number, pageLength: number, keywords: string): any {
            var result = {};
            result["SortField"] = sortField;
            result["SortOrder"] = sortOrder
            result["PageBegin"] = pageBegin;
            result["PageLength"] = pageLength;
            if (keywords)
                result["Keywords"] = keywords;
            return result;
        }

        toggleForm(show: boolean): void {
            this.showForm = show;
            this.$scope.model = null;
            this.$scope.formMessage = null;
        }

        validate(model: any): boolean {
            return true;
        }
    }

    class RegionCtrl extends CRUDCtrl {

        type = Models.Region;
        regions: Models.IRegion[];
        regionName: {};
        regionTypeName: {};
        SortField = "DateCreated";
        SortOrder = "DESC";

        constructor(public $scope, public cfpLoadingBar) {
            super($scope, cfpLoadingBar);
            //this.getRegions();
            this.getRegionsType();
        }

        save(): void {
            this.$scope.model.ParentID = this.$scope.model.Parent.ID;
            super.save();
        }

        //getRegions() {
        //    var scope = this.$scope;
        //    var ctrl = this;
        //    App.Models.Region.GetAll().done(regions => {
        //        scope.$apply(() => {
        //            ctrl.regions = regions;
        //            ctrl.regionName = _.reduce(regions, function (o, v: any) { o[v.ID] = v.Name; return o }, {});
        //        });
        //    });
        //}

        getRegion(query: string) {
            return App.Models.Region.GetAll({
                Keywords: query,
                SortOrder: 'ASC'
            })
        }

        getRegionsType() {
            var scope = this.$scope;
            var ctrl = this;
            $.ajax({
                type: "GET",
                url: "/api/Enum/GetRegionType"
            }).done(regionTypeName => {
                    scope.$apply(() => {
                        ctrl.regionTypeName = regionTypeName;

                        //ctrl.regionTypeName = _.reduce(regionTypeName, function (o, v: any) { o[v.Value] = v.Text; console.log(o); return o }, {});
                    });
                });
        }
    }

    class TransactionCtrl extends CRUDCtrl {

        type = Models.Transaction;
        openExamDatePicker: boolean;

        constructor(public $scope, public cfpLoadingBar) {
            super($scope, cfpLoadingBar);
        }

        save(): void {
            this.$scope.model.SourceID = this.$scope.model.Source.ID;
            this.$scope.model.DestinationID = this.$scope.model.Destination.ID;           
            super.save();
        }

        getRegion(query: string) {
            return App.Models.Region.GetAll({
                Keywords: query,
                SortOrder: 'ASC'
            })
        }

        open($event) {
            $event.preventDefault();
            $event.stopPropagation();
            this.openExamDatePicker = true;
        }
    }

    class UserCtrl extends CRUDCtrl {

        type = Models.User;
        roles = [];
        roleNames = ["admin"];
        IDField = 'Id';

        constructor(public $scope, public cfpLoadingBar) {
            super($scope, cfpLoadingBar);
        }

        getRoles() {
            var ctrl = this;
            var scope = this.$scope;
            $.ajax({
                type: 'GET',
                url: '/api/User/GetAllRoles'
            }).done(roles => {
                    scope.$apply(() => {
                        ctrl.roles = _.reduce(roles, function (o, v: any) { o[v.Value] = v.Text; return o }, {});
                    });
                });
        }
    }

    class NationalRegionCtrl extends CRUDCtrl {

        type = Models.Region;
        roles = [];
        roleNames = ["admin"];
        IDField = 'Id';

        constructor(public $scope, public cfpLoadingBar, public $stateParams) {
            super($scope, cfpLoadingBar);

            var ctrl = this;
            $scope.entitiesPerPage = 34;
            ctrl.query = ctrl.generateQuery(ctrl.sortField, ctrl.sortOrder,
                ctrl.$scope.page, ctrl.$scope.entitiesPerPage, ctrl.keywords);
            ctrl.fetch(ctrl.query);
            $scope.ID = $stateParams.ID;
        }        
    }

    kawaldesa.controller("RegionCtrl", ["$scope", "cfpLoadingBar", RegionCtrl]);
    kawaldesa.controller("TransactionCtrl", ["$scope", "cfpLoadingBar", TransactionCtrl]);
    kawaldesa.controller("UserCtrl", ["$scope", "cfpLoadingBar", UserCtrl]);
    kawaldesa.controller("NationalRegionCtrl", ["$scope", "cfpLoadingBar", '$stateParams', NationalRegionCtrl]);
}