/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../Dashboard.ts"/>
var KawalDesa;
(function (KawalDesa) {
    (function (Controllers) {
        var IndexCtrl = (function () {
            function IndexCtrl($scope, principal) {
                this.$scope = $scope;
                this.principal = principal;
                $scope.principal = principal;
            }
            return IndexCtrl;
        })();
        KawalDesa.dashboard.controller("IndexCtrl", ["$scope", "principal", IndexCtrl]);
    })(KawalDesa.Controllers || (KawalDesa.Controllers = {}));
    var Controllers = KawalDesa.Controllers;
})(KawalDesa || (KawalDesa = {}));
//# sourceMappingURL=IndexCtrl.js.map
