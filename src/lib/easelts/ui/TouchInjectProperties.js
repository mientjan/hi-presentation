define(["require", "exports"], function (require, exports) {
    var TouchInjectProperties = (function () {
        function TouchInjectProperties() {
            this.pointers = {};
            this.multitouch = false;
            this.preventDefault = false;
            this.count = 0;
        }
        return TouchInjectProperties;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TouchInjectProperties;
});
