/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../Services/Principal.ts"/>
/// <reference path="../Dashboard.ts"/>

module KawalDesa.Controllers {
    import Models = App.Models;
    import APBNFileUpload = App.Models.APBNFileUpload;

    function safeApply(scope, fn) {
        (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
    }

    class IndexCtrl {
        constructor(public $scope, public $upload, public principal: IPrincipal) {
            $scope.principal = principal;
            
            principal.identity().then(function (identity) {
                 $scope.user = new Models.User(identity.user);
            });

            if (principal.isInRole("admin")) {
                Models.APBN.GetAll().done(apbns => {
                    safeApply($scope, () => {
                        $scope.apbns = apbns;
                    });
                });
                Models.APBDFile.GetAll().done(apbdFiles => {
                    safeApply($scope, () => {
                        $scope.apbdFiles = apbdFiles;
                    });
                });
                Models.TransactionFile.GetAll().done(transactionFiles => {
                    safeApply($scope, () => {
                        $scope.transactionFiles = transactionFiles;
                    });
                });
            }
        }

        uploadFile() {
            if (!this.$scope.file || this.$scope.file[0] == null)
                return;

            var file = this.$scope.file[0];
            var ctrl = this;
            var res = null;

            APBNFileUpload.UploadFile(file, res, ctrl.$upload).success(function (data, status, headers, config) {
                ctrl.processFile(data);
            });;
        }

        processFile(data) {
            var isValidFileLocation = (data != null && data[0].Path != "" && data[0].Name != "");
            var ctrl = this;
            var scope = this.$scope;

            if (!isValidFileLocation) return;
            var fileLocation = data[0].Path.concat("\\", data[0].Name);

            /*
            APBNFileUpload.ParseAPBNFileFile(fileLocation)
                .done(result => {
                    scope.$apply(() => {
                        var total = result.length;
                        var message = "Data kuesioner sebanyak: " + total + " berhasil diproses";
                    });
                });
            */
        }
    }
    dashboard.controller("IndexCtrl", ["$scope", "$upload", "principal", IndexCtrl]);
}
