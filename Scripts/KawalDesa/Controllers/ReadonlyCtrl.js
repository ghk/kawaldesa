/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Models.ts"/>
/// <reference path="../Lombok.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Lombok;
(function (Lombok) {
    (function (Controllers) {
        var ReadonlyCtrl = (function (_super) {
            __extends(ReadonlyCtrl, _super);
            function ReadonlyCtrl() {
                _super.apply(this, arguments);
                this.$inject = ["$scope"];
            }
            ReadonlyCtrl.prototype.init = function () {
                this.fetch();
            };

            ReadonlyCtrl.prototype.fetch = function () {
                var scope = this.$scope;
                this.type.GetAll(this.query).done(function (entities) {
                    scope.$apply(function () {
                        scope.entities = entities;
                    });
                });
            };
            return ReadonlyCtrl;
        })(Utils.SeriouslyCtrl);
        Controllers.ReadonlyCtrl = ReadonlyCtrl;
    })(Lombok.Controllers || (Lombok.Controllers = {}));
    var Controllers = Lombok.Controllers;
})(Lombok || (Lombok = {}));
//# sourceMappingURL=ReadonlyCtrl.js.map
