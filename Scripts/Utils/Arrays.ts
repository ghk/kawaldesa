module Utils {
    export class Arrays {
        static removeWhere<T>(array: Array<T>, filter: (item: T) => boolean) {
            for (var i = array.length - 1; i >= 0; i--) {
                if (filter(array[i])) {
                    array.splice(i, 1);
                }
            }
        }

        static remove<T>(array: Array<T>, item: T) {
            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i] === item) {
                    array.splice(i, 1);
                }
            }
        }
        static find<T>(array: Array<T>, predicate: (item: T, index?: number, array?: Array<T>) => boolean): T {
            if (typeof predicate !== 'function') {
                throw new TypeError();
            }
            for (var i = 0; i < array.length; i++) {
                if (i in array) {  // skip holes
                    var elem = array[i];
                    if (predicate(elem, i, array)) {
                        return elem;  // (1)
                    }
                }
            }
            return undefined;  // (2)
        }
    }
}