var Utils;
(function (Utils) {
    var SeriouslyCtrl = (function () {
        function SeriouslyCtrl() {
            this.$inject = [];
        }
        SeriouslyCtrl.prototype._setup = function () {
            var args = arguments;
            for (var i = 0; i < args.length; i++) {
                this[this.$inject[i]] = args[i];
            }
            this.init();
        };

        SeriouslyCtrl.prototype.init = function () {
        };
        return SeriouslyCtrl;
    })();
    Utils.SeriouslyCtrl = SeriouslyCtrl;

    var Seriously = (function () {
        function Seriously(parent) {
            this.parent = parent;
        }
        Seriously.prototype.controller = function (ctrlName, cls) {
            var ctrl = new cls();
            var setup = ctrl._setup.bind(ctrl);
            setup["$inject"] = ctrl.$inject;
            this.parent.controller(ctrlName, setup);
            return this.parent;
        };
        return Seriously;
    })();
    Utils.Seriously = Seriously;

    angular.seriously = function (name, deps) {
        var result = angular.module.apply(angular, arguments);
        result.seriously = new Seriously(result);
        return result;
    };
})(Utils || (Utils = {}));
//# sourceMappingURL=Seriously.js.map
