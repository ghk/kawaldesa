/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    function safeApply(scope, fn) {
        (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
    }

    export interface ICurrentUser {
        Id: string;
        FacebookId: String;
        Name: String;
        fkOrganizationId: number;
        Roles: String[];
        Scopes: string[];
    }

    interface MyWindow extends Window {
        CurrentUser: ICurrentUser;
    }

    declare var window: MyWindow;

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    var CHILD_NAMES = [
        "Daerah",
        "Provinsi",
        "Kabupaten / Kota",
        "Kecamatan",
        "Desa"
    ];

    var ROUTES = [
        ["/dd/", "dd", true],
        ["/add/", "add", true],
        ["/bhpr/", "bhpr", true],
        ["/p/", "transfer", true],
        ["/r/", "realization", true],
        ["/dashboard", "dashboard", false],
        ["/orgs", "orgs", false],
        ["/u/", "users", false],
        ["/login", "login", false],
    ];

    export class IndexCtrl {

        regionTree: Models.Region[];
        region: Models.Region;
        childName: string;
        type = "transfer";
        currentUser: ICurrentUser;
        regionId: string;
        guessedRegionType: number;
        isPathReplacing = false;
        currentPath = null;

        activeUploadType: App.Models.DocumentUploadType;
        activeUploadRegionId: string;
        activeUpload: App.Models.DocumentUpload;
        newUploadFile: any;
        newUpload: App.Models.DocumentUpload;
        newUploadState = false;

        static $inject = ["$scope", "$location"];

        constructor(public $scope, public $location){
            $scope.App = App;
            var ctrl = this;
            var scope = this.$scope;
            this.currentUser = window.CurrentUser;

            if(!ctrl.isPathReplacing)
                ctrl.onLocationChange();
            ctrl.isPathReplacing = false;

            $scope.$on('$locationChangeSuccess', function () {
                if(!ctrl.isPathReplacing)
                    ctrl.onLocationChange();
                ctrl.isPathReplacing = false;
            });
        }


        onLocationChange() {
            var path = this.$location.path();
            if (path == this.currentPath)
                return;
            var regionId:string = null;
            var regionKey = null;
            this.type = null;
            if (path == "/" || path == "") {
                regionId = "0";
                this.type = "transfer";
            } else {
                var matched : any[] = ROUTES.filter(r => path.indexOf(r[0]) == 0);
                if (matched[0]) {
                    this.type = matched[0][1] ;
                    if (matched[0][2]) {
                        regionId = path.replace(matched[0][1], "");
                    }
                }
            }
            if (this.type == null) {
                this.type = "realization";
                regionKey = path.substring(1);
            }

            if(regionId != null || regionKey)
                this.loadRegion(regionId, regionKey);

            if (regionId == null && !regionKey)
                regionId = "0";
            this.guessedRegionType = this.guessType(regionId);
            this.regionId = regionId;
            this.currentPath = path;
        }

        changeType(type, $event) {
            if (this.type != 'dashboard') {
                $event.preventDefault();
                var matched : any[] = ROUTES.filter(r => r[1] == type);
                var path = matched[0][0] + this.region.Id;
                this.$location.path(path);
            }
        }

        changeRegion(regionId, $event) {
            $event.preventDefault();
            this.$scope.$broadcast("regionChangeBefore");
            var type = this.type;
            var matched : any[] = ROUTES.filter(r => r[1] == type);
            var path = matched[0][0] + regionId;
            this.$location.path(path);
        }

        hasAnyVolunteerRoles() {
            return this.currentUser != null
                && this.currentUser.Roles.some(r => r.indexOf("volunteer_") != -1);
        }

        isInRole(roleName) {
            if (!this.currentUser) {
                return false;
            }
            return this.currentUser.Roles.some(r => roleName == r);
        }

        isInScope(entityId) {
            var regionId = this.regionTree.map(r => r.Id);
            regionId.push(entityId);
            return regionId.some(rid => this.currentUser.Scopes.some(id => rid == id));
        }

        isInRoleAndScope(roleName, entityId) {
            return this.isInRole(roleName) && this.isInScope(entityId);
        }

        modal(selector, action) {
            var modal: any = $(selector);
            modal.modal(action);
        }

        configureDocumentUpload(type: App.Models.DocumentUploadType, regionId: string) {
            this.activeUploadType = type;
            this.activeUploadRegionId = regionId;
            this.newUpload = new Models.DocumentUpload();
            var ctrl = this;
            ctrl.activeUpload = null;
            Controllers.DocumentUploadController.GetActive(type, regionId, "2015p").done(doc => {
                ctrl.$scope.$apply(() => {
                    ctrl.activeUpload = doc;
                    if (doc) {
                        ctrl.newUpload.DocumentName = doc.DocumentName;
                        ctrl.newUpload.Source = doc.Source;
                        ctrl.newUpload.Notes = doc.Notes;
                    }
                });
            });
        }

        upload() {
            var ctrl = this;
            var multipart = new Scaffold.Multipart({ files: this.newUploadFile, forms: this.newUpload });
            ctrl.newUploadState = true;
            Controllers.DocumentUploadController.Upload(multipart, this.activeUploadType, this.activeUploadRegionId, "2015p").success(() => {
                safeApply(ctrl.$scope, () => {
                    ctrl.modal('#document-upload-modal', 'hide');
                    ctrl.configureDocumentUpload(ctrl.activeUploadType, ctrl.activeUploadRegionId);
                    ctrl.$scope.$broadcast("regionChangeSuccess");
                });
            }).finally(() => {
                safeApply(ctrl.$scope, () => {
                    ctrl.newUploadState = false;
                });
            });;
        }

        guessType(regionId: string) {
            if (regionId == "0")
                return 0;
            return (regionId.match(/\./g) || []).length + 1;
        }

        loadRegion(parentId?: string, parentKey?: string) {
            var ctrl = this;

            this.regionTree = [];
            this.childName = CHILD_NAMES[0];

            var promise = null;
            if (parentId != null)
                promise = Controllers.RegionController.Get(parentId);
            else if (parentKey)
                promise = Controllers.RegionController.GetByURLKey(parentKey);

            promise.done((region: Models.Region) => {
                ctrl.$scope.$apply(() => {
                    ctrl.region = region;
                    ctrl.regionId = region.Id;
                    var regionTree = [];
                    var cur : Models.IRegion = region;
                    while (cur) {
                        regionTree.push(cur);
                        cur = cur.Parent;
                    }
                    ctrl.regionTree = regionTree.reverse();
                    if (regionTree.length < CHILD_NAMES.length)
                        ctrl.childName = CHILD_NAMES[regionTree.length];

                    setTimeout(() => {
                        ctrl.$scope.$apply(() => {
                            ctrl.$scope.$broadcast("regionChangeSuccess");
                        });
                    }, 0);
                    if (region.UrlKey && ctrl.$location.path() != "/" + region.UrlKey) {
                        ctrl.isPathReplacing = true;
                        ctrl.$location.path("/" + region.UrlKey);
                        ctrl.$location.replace();
                    }
                });
            });
        }

    }

    kawaldesa.controller("IndexCtrl", IndexCtrl);
}