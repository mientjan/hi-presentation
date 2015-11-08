var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../lib/easelts/display/Container"], function (require, exports, Container_1) {
    var Keydown = (function (_super) {
        __extends(Keydown, _super);
        function Keydown() {
            _super.call(this, '100%', '100%');
        }
        return Keydown;
    })(Container_1.default);
});
