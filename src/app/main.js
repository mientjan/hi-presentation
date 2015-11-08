define(["require", "exports", "../lib/easelts/display/Stage", "../lib/easelts/ui/Touch", "./page/ScrollingPage", "./page/KeydownPage"], function (require, exports, Stage_1, Touch_1, ScrollingPage_1, KeydownPage_1) {
    var main = (function () {
        function main() {
            this.stage = new Stage_1.default(document.body, { autoResize: true, autoClear: true });
            this.stage.enableMouseOver(50);
            this.stage.setFps(60);
            this.stage.start();
            Touch_1.default.enable(this.stage);
            this.scrollPage();
        }
        main.prototype.scrollPage = function () {
            var page = new ScrollingPage_1.default();
            this.stage.addChild(page);
        };
        main.prototype.keyDown = function () {
            var page = new KeydownPage_1.default();
            this.stage.addChild(page);
        };
        return main;
    })();
    exports.default = main;
});
