define(["require", "exports"], function (require, exports) {
    var ListUtil = (function () {
        function ListUtil() {
        }
        ListUtil.createList = function (from, to, fn) {
            var list = [];
            for (var i = from; i < to; i++) {
                list.push(fn.call(this, i));
            }
            return list;
        };
        ListUtil.padLeft = function (value, length, fillChar) {
            if (fillChar === void 0) { fillChar = ' '; }
            if (fillChar == null || fillChar.length == 0) {
                throw 'invalid value for fillChar: "' + fillChar + '"';
            }
            if (value.length < length) {
                var lim = length - value.length;
                for (var i = 0; i < lim; i++) {
                    value = fillChar + value;
                }
            }
            return value;
        };
        return ListUtil;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ListUtil;
});
