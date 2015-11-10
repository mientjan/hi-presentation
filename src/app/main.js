define(["require", "exports", "../lib/easelts/display/Stage", "../lib/easelts/ui/Touch", "../lib/easelts/behavior/AutoScaleBehavior", "./page/ScrollingPage", "./page/KeydownPage", "./page/FollowPointer", "./page/FollowPointer0", "./page/FollowPointer1", "./page/FollowPointer2", "./page/KaleidopussPage"], function (require, exports, Stage_1, Touch_1, AutoScaleBehavior_1, ScrollingPage_1, KeydownPage_1, FollowPointer_1, FollowPointer0_1, FollowPointer1_1, FollowPointer2_1, KaleidopussPage_1) {
    var main = (function () {
        function main() {
            this.stage = new Stage_1.default(document.body, { autoResize: true, autoClear: true });
            this.stage.enableMouseOver(50);
            this.stage.setFps(60);
            this.stage.start();
            Touch_1.default.enable(this.stage);
            this.kaleidopussPage();
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
        main.prototype.followPointer0 = function () {
            var page = new FollowPointer0_1.default();
            this.stage.addChild(page);
        };
        main.prototype.followPointer1 = function () {
            var page = new FollowPointer1_1.default();
            this.stage.addChild(page);
        };
        main.prototype.followPointer2 = function () {
            var page = new FollowPointer2_1.default();
            this.stage.addChild(page);
        };
        main.prototype.kaleidopussPage = function () {
            var page = new KaleidopussPage_1.default();
            this.stage.addChild(page);
            page.addBehavior(new AutoScaleBehavior_1.default().setAlwaysCover(true));
        };
        return main;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = main;
});
