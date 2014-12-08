/**
    A seriously better controller api for inheritance in typescript
    Usage:
        var app = angular.seriously("app", []);
        
        class ParentCtrl extends Utils.SeriouslCtrl {
            x: number;
            init() {
                console.log(this.x);
            }
        }
        class ChildCtrl extends ParentCtrl {
            x = 3;
        }
        app.seriously.controller("ChildCtrl", ChildCtrl);
 */
declare module ng {
    interface IAngularStatic {
        seriously(name, deps): Utils.ISeriouslyModule;
    }
}
module Utils {
    export class SeriouslyCtrl {
        $inject = [];

        _setup() {
            var args = arguments;
            for (var i = 0; i < args.length; i++) {
                this[this.$inject[i]] = args[i];
            }
            this.init();
        }

        init() {
        }
    }

    export class Seriously{
        constructor(public parent: ISeriouslyModule) {
        }
        controller(ctrlName: string, cls): ISeriouslyModule {
            var ctrl = new cls();
            var setup = ctrl._setup.bind(ctrl);
            setup["$inject"] = ctrl.$inject;
            this.parent.controller(ctrlName, setup);
            return this.parent;
        }
    }

    export interface ISeriouslyModule extends ng.IModule{
        seriously: Seriously;
    }

    angular.seriously = function (name, deps): ISeriouslyModule {
        var result = angular.module.apply(angular, arguments);
        result.seriously = new Seriously(result);
        return result;
    }

}