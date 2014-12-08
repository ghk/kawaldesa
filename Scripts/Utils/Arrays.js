var Utils;
(function (Utils) {
    var Arrays = (function () {
        function Arrays() {
        }
        Arrays.removeWhere = function (array, filter) {
            for (var i = array.length - 1; i >= 0; i--) {
                if (filter(array[i])) {
                    array.splice(i, 1);
                }
            }
        };

        Arrays.remove = function (array, item) {
            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i] === item) {
                    array.splice(i, 1);
                }
            }
        };
        Arrays.find = function (array, predicate) {
            if (typeof predicate !== 'function') {
                throw new TypeError();
            }
            for (var i = 0; i < array.length; i++) {
                if (i in array) {
                    var elem = array[i];
                    if (predicate(elem, i, array)) {
                        return elem;
                    }
                }
            }
            return undefined;
        };
        return Arrays;
    })();
    Utils.Arrays = Arrays;
})(Utils || (Utils = {}));
//# sourceMappingURL=Arrays.js.map
