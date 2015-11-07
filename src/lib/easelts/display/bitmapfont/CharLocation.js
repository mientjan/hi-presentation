define(["require", "exports"], function (require, exports) {
    var CharLocation = (function () {
        function CharLocation(char) {
            this.scale = 0;
            this.x = 0;
            this.y = 0;
            this.char = char;
        }
        return CharLocation;
    })();
    exports.default = CharLocation;
});
