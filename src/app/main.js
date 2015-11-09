define(["require", "exports", "../lib/easelts/display/Stage", "../lib/easelts/ui/Touch", "./page/ScrollingPage", "./page/KeydownPage", "./page/FollowPointer"], function (require, exports, Stage_1, Touch_1, ScrollingPage_1, KeydownPage_1, FollowPointer_1) {
    var main = (function () {
        function main() {
            this.stage = new Stage_1.default(document.body, { autoResize: true, autoClear: false });
            this.stage.enableMouseOver(50);
            this.stage.setFps(60);
            this.stage.start();
            Touch_1.default.enable(this.stage);
            this.followPointer();
        }
        main.prototype.scrollPage = function () {
            var page = new ScrollingPage_1.default();
            this.stage.addChild(page);
        };
        main.prototype.keyDown = function () {
            var page = new KeydownPage_1.default();
            this.stage.addChild(page);
        };
        main.prototype.followPointer = function () {
            var page = new FollowPointer_1.default();
            this.stage.addChild(page);
        };
        return main;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = main;
});
