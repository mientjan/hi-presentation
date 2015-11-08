define(["require", "exports", "../lib/easelts/display/Stage"], function (require, exports, Stage_1) {
    var main = (function () {
        function main() {
            this.stage = new Stage_1.default(document.body, { autoResize: true, autoClear: true });
            this.stage.start();
        }
        return main;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = main;
});
