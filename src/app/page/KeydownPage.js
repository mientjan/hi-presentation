var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./util/ListUtil", "../lib/easelts/animation/ImageSequence", "./controls/Loader", "../lib/easelts/behavior/AutoScaleBehavior", "../../lib/easelts/display/Container"], function (require, exports, ListUtil_1, ImageSequence_1, Loader_1, AutoScaleBehavior_1, Container_1) {
    var KeydownPage = (function (_super) {
        __extends(KeydownPage, _super);
        function KeydownPage() {
            var _this = this;
            _super.call(this, '100%', '100%');
            this.loader = new Loader_1.default('50%', '50%');
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
            this.sequence.setGeomTransform(1280, 720, '50%', '50%', '50%', '50%');
            this.sequence.addBehavior(new AutoScaleBehavior_1.default().setAlwaysCover(true));
        }
        return KeydownPage;
    })(Container_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = KeydownPage;
});
