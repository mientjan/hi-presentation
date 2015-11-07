define(["require", "exports", "../lib/easelts/display/Stage", "./util/ListUtil", "../lib/easelts/animation/ImageSequence", "./controls/Loader", "../lib/easelts/behavior/AutoScaleBehavior"], function (require, exports, Stage_1, ListUtil_1, ImageSequence_1, Loader_1, AutoScaleBehavior_1) {
    var main = (function () {
        function main() {
            var _this = this;
            this.loader = new Loader_1.default('50%', '50%');
            this.stage = new Stage_1.default(document.body, { autoResize: true, autoClear: true });
            this.sequence = ImageSequence_1.default.createFromString(ListUtil_1.default.createList(500, function (index) {
                return 'data/sequence/piday/image/sequence/' + ListUtil_1.default.padLeft('' + index, 4, '0') + '.png';
            }), 24, 1280, 720);
            this.stage.addChild(this.sequence);
            this.stage.addChild(this.loader);
            this.sequence.load(this.loader.setProgress.bind(this.loader)).then(function () {
                _this.loader.visible = false;
                _this.sequence.play(-1);
            });
            this.sequence.alpha = 1;
            this.stage.start();
            this.sequence.setGeomTransform(1280, 720, '50%', '50%', '50%', '50%');
            this.sequence.addBehavior(new AutoScaleBehavior_1.default().setAlwaysCover(true));
        }
        return main;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = main;
});
