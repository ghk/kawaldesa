/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../Services/Principal.ts"/>
/// <reference path="../Dashboard.ts"/>
var KawalDesa;
(function (KawalDesa) {
    (function (Controllers) {
        var Models = App.Models;
        var APBNFileUpload = App.Models.APBNFileUpload;

        function safeApply(scope, fn) {
            (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
        }

        var IndexCtrl = (function () {
            function IndexCtrl($scope, $upload, principal) {
                this.$scope = $scope;
                this.$upload = $upload;
                this.principal = principal;
                $scope.principal = principal;

                principal.identity().then(function (identity) {
                    $scope.user = new Models.User(identity.user);
                });

                if (principal.isInRole("admin")) {
                    Models.APBN.GetAll().done(function (apbns) {
                        safeApply($scope, function () {
                            $scope.apbns = apbns;
                        });
                    });
                    Models.APBDFile.GetAll().done(function (apbdFiles) {
                        safeApply($scope, function () {
                            $scope.apbdFiles = apbdFiles;
                        });
                    });
                    Models.TransactionFile.GetAll().done(function (transactionFiles) {
                        safeApply($scope, function () {
                            $scope.transactionFiles = transactionFiles;
                        });
                    });
                }
            }
            IndexCtrl.prototype.uploadFile = function () {
                if (!this.$scope.file || this.$scope.file[0] == null)
                    return;

                var file = this.$scope.file[0];
                var ctrl = this;
                var res = null;

                APBNFileUpload.UploadFile(file, res, ctrl.$upload).success(function (data, status, headers, config) {
                    ctrl.processFile(data);
                });
                ;
            };

            IndexCtrl.prototype.processFile = function (data) {
                var isValidFileLocation = (data != null && data[0].Path != "" && data[0].Name != "");
                var ctrl = this;
                var scope = this.$scope;

                if (!isValidFileLocation)
                    return;
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
            };
            return IndexCtrl;
        })();
        KawalDesa.dashboard.controller("IndexCtrl", ["$scope", "$upload", "principal", IndexCtrl]);
    })(KawalDesa.Controllers || (KawalDesa.Controllers = {}));
    var Controllers = KawalDesa.Controllers;
})(KawalDesa || (KawalDesa = {}));
//# sourceMappingURL=IndexCtrl.js.map
