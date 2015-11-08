define(["require", "exports"], function (require, exports) {
    var Texture = (function () {
        function Texture(bitmap, source) {
            var view = bitmap, x = source.x, y = source.y, width = source.width, height = source.height;
            this.draw = function (ctx) {
                ctx.drawImage(view, x, y, width, height, 0, 0, width, height);
                return true;
            };
        }
        return Texture;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Texture;
});
