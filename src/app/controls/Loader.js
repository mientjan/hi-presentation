var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../lib/easelts/display/Shape", "../../lib/easelts/display/Container", "../../lib/easelts/display/Text"], function (require, exports, Shape_1, Container_1, Text_1) {
    var Loader = (function (_super) {
        __extends(Loader, _super);
        function Loader(x, y) {
            _super.call(this, 100, 100, x, y);
            this.shape = new Shape_1.default();
            this.text = new Text_1.default('');
            this.addChild(this.shape);
            this.addChild(this.text);
            this.text.y += 20;
        }
        Loader.prototype.setProgress = function (progress) {
            var g = this.shape.graphics.clear();
            g.beginFill('#000');
            g.arc(0, 0, 10, 0, (progress * 2) * Math.PI, false);
            this.text.text = '' + progress + '%';
        };
        return Loader;
    })(Container_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Loader;
});
