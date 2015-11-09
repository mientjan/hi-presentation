var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../lib/easelts/behavior/AutoScaleBehavior", "../../lib/easelts/display/Container", "../util/ListUtil", "../../lib/easelts/animation/ImageSequence", "../controls/Loader", "../../lib/easelts/behavior/ButtonBehavior", "../../lib/easelts/component/RectangleColor", "../../lib/keys/KeyCode", "../../lib/easelts/display/SpriteSheet"], function (require, exports, AutoScaleBehavior_1, Container_1, ListUtil_1, ImageSequence_1, Loader_1, ButtonBehavior_1, RectangleColor_1, KeyCode_1, SpriteSheet_1) {
    var KeydownPage = (function (_super) {
        __extends(KeydownPage, _super);
        function KeydownPage() {
            var _this = this;
            _super.call(this, '100%', '100%');
            this.loader = new Loader_1.default('50%', '50%');
            this.frames = 0;
            this.scrollPower = .1;
            this.framesPerBlock = 50;
            this.keycode = {};
            this.hitArea = new RectangleColor_1.default('#000', '100%', '100%');
            this.addChild(this.hitArea);
            this.hitArea.visible = false;
            var data = SpriteSheet_1.default.getSequenceStructureByList(ListUtil_1.default.createList(0, 499, function (index) {
                return 'data/sequence/piday/image/sequence/' + ListUtil_1.default.padLeft('' + index, 4, '0') + '.png';
            }), 1280, 720);
            var frames = 50;
            for (var i = 0; i < 10; i++) {
                if (i == 9) {
                    this.keycode[KeyCode_1.default['NUM_' + i]] = [frames * i, frames * (i + 1) - 2];
                }
                else {
                    this.keycode[KeyCode_1.default['NUM_' + i]] = [frames * i, frames * (i + 1)];
                }
            }
            this.spriteSheet = new SpriteSheet_1.default(data);
            this.sequence = new ImageSequence_1.default(this.spriteSheet, 24, 1280, 720);
            this.addChild(this.sequence);
            this.addChild(this.loader);
            this.spriteSheet.load(this.loader.setProgress.bind(this.loader)).then(function () {
                _this.loader.visible = false;
            });
            this.sequence.alpha = 1;
            this.sequence.setGeomTransform(1280, 720, '50%', '50%', '50%', '50%');
            this.sequence.addBehavior(new AutoScaleBehavior_1.default().setAlwaysCover(true));
            this.enableMouseInteraction();
            this.addBehavior(new ButtonBehavior_1.default());
            this.bindEvents();
        }
        KeydownPage.prototype.bindEvents = function () {
            var _this = this;
            $(document).on("keypress", function (e) {
                if (_this.keycode[e.keyCode]) {
                    _this.sequence.play(1, _this.keycode[e.keyCode]);
                }
            });
        };
        return KeydownPage;
    })(Container_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = KeydownPage;
});
