var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../lib/easelts/behavior/AutoScaleBehavior", "../../lib/easelts/geom/Point", "../../lib/easelts/display/Container", "../util/ListUtil", "../controls/Loader", "../../lib/easelts/behavior/ButtonBehavior", "../../lib/easelts/component/RectangleColor", "../../lib/easelts/util/MathUtil", "../../lib/keys/KeyCode", "../../lib/easelts/display/SpriteSheet", "../../lib/easelts/display/Sprite"], function (require, exports, AutoScaleBehavior_1, Point_1, Container_1, ListUtil_1, Loader_1, ButtonBehavior_1, RectangleColor_1, MathUtil_1, KeyCode_1, SpriteSheet_1, Sprite_1) {
    var KeydownPage = (function (_super) {
        __extends(KeydownPage, _super);
        function KeydownPage() {
            var _this = this;
            _super.call(this, '100%', '100%');
            this.loader = new Loader_1.default('50%', '50%');
            this.frames = 0;
            this.scrollPower = .1;
            this.framesPerBlock = 50;
            this.queue = [];
            this.position = new Point_1.default(0, 0);
            this.positionTo = new Point_1.default(0, 0);
            this.hitArea = new RectangleColor_1.default('#000', '100%', '100%');
            this.addChild(this.hitArea);
            this.hitArea.visible = false;
            var data = SpriteSheet_1.default.getSequenceStructureByList(ListUtil_1.default.createList(0, 499, function (index) {
                return 'data/sequence/piday/image/sequence/' + ListUtil_1.default.padLeft('' + index, 4, '0') + '.png';
            }), 1280, 720);
            var frames = 50;
            for (var i = 0; i < 10; i++) {
                data.animations['' + i] = [frames * i, frames * (i + 1) - 1];
            }
            console.log(data.animations);
            this.spriteSheet = new SpriteSheet_1.default(data);
            this.sequence = new Sprite_1.default(this.spriteSheet);
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
                switch (e.keyCode) {
                    case KeyCode_1.default.NUMPAD_0:
                    case KeyCode_1.default.NUM_0: {
                        _this.sequence.gotoAndPlay('0');
                        break;
                    }
                    case KeyCode_1.default.NUMPAD_1:
                    case KeyCode_1.default.NUM_1: {
                        _this.sequence.gotoAndPlay('1');
                        break;
                    }
                    case KeyCode_1.default.NUMPAD_2:
                    case KeyCode_1.default.NUM_2: {
                        _this.sequence.gotoAndPlay('2');
                        break;
                    }
                    case KeyCode_1.default.NUMPAD_3:
                    case KeyCode_1.default.NUM_3: {
                        _this.sequence.gotoAndPlay('3');
                        break;
                    }
                    case KeyCode_1.default.NUMPAD_4:
                    case KeyCode_1.default.NUM_4: {
                        _this.sequence.gotoAndPlay('4');
                        break;
                    }
                    case KeyCode_1.default.NUMPAD_5:
                    case KeyCode_1.default.NUM_5: {
                        _this.sequence.gotoAndPlay('5');
                        break;
                    }
                    case KeyCode_1.default.NUMPAD_6:
                    case KeyCode_1.default.NUM_6: {
                        _this.sequence.gotoAndPlay('6');
                        break;
                    }
                    case KeyCode_1.default.NUMPAD_7:
                    case KeyCode_1.default.NUM_7: {
                        _this.sequence.gotoAndPlay('7');
                        break;
                    }
                    case KeyCode_1.default.NUMPAD_8:
                    case KeyCode_1.default.NUM_8: {
                        _this.sequence.gotoAndPlay('8');
                        break;
                    }
                    case KeyCode_1.default.NUMPAD_9:
                    case KeyCode_1.default.NUM_9: {
                        _this.sequence.gotoAndPlay('9');
                        break;
                    }
                }
            });
        };
        KeydownPage.prototype.handleDragging = function (dx, dy, dragging) {
            this.position.x += dx * this.scrollPower;
            this.position.y += dy * this.scrollPower;
            this.position.x = MathUtil_1.default.clamp(this.position.x, 0, this.frames - 1);
            this.position.y = MathUtil_1.default.clamp(this.position.y, 0, this.frames - 1);
            //var y = Math.ceil(this.position.y / this.framesPerBlock);
            //this.position.y = (this.position.y % this.framesPerBlock) * y;
        };
        return KeydownPage;
    })(Container_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = KeydownPage;
});
