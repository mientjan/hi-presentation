var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../lib/easelts/behavior/AutoScaleBehavior", "../../lib/easelts/display/DisplayObject", "../../lib/easelts/geom/Point", "../../lib/easelts/display/Container", "../util/ListUtil", "../../lib/easelts/animation/ImageSequence", "../controls/Loader", "../../lib/easelts/behavior/ButtonBehavior", "../../lib/easelts/component/RectangleColor", "../../lib/easelts/util/MathUtil", "../../lib/easelts/display/SpriteSheet", "../../lib/createts/util/Functional"], function (require, exports, AutoScaleBehavior_1, DisplayObject_1, Point_1, Container_1, ListUtil_1, ImageSequence_1, Loader_1, ButtonBehavior_1, RectangleColor_1, MathUtil_1, SpriteSheet_1, Functional) {
    var ScrollingPage = (function (_super) {
        __extends(ScrollingPage, _super);
        function ScrollingPage() {
            var _this = this;
            _super.call(this, '100%', '100%');
            this.loader = new Loader_1.default('50%', '50%');
            this.frames = 0;
            this.scrollPower = .1;
            this.framesPerBlock = 50;
            this.offset = 0;
            this.position = new Point_1.default(0, 0);
            this.positionLock = new Point_1.default(0, 0);
            this.positionTo = new Point_1.default(0, 0);
            this.tick = Functional.throttle(function (delta) {
                if (_this.sequence.isLoaded) {
                    if (_this.positionTo.y < (_this.positionLock.y | 0)) {
                        _this.positionTo.y++;
                    }
                    else if (_this.positionTo.y > (_this.positionLock.y | 0)) {
                        _this.positionTo.y--;
                    }
                    else {
                    }
                    _this.sequence.frame = _this.positionTo.y | 0;
                }
            }, 1000 / 24, this);
            this.hitArea = new RectangleColor_1.default('#000', '100%', '100%');
            this.addChild(this.hitArea);
            this.hitArea.visible = false;
            this.sequence = new ImageSequence_1.default(SpriteSheet_1.default.createFromString(ListUtil_1.default.createList(0, 499, function (index) {
                return 'data/sequence/piday/image/sequence/' + ListUtil_1.default.padLeft('' + index, 4, '0') + '.png';
            }), 1280, 720), 24, 1280, 720);
            this.addChild(this.sequence);
            this.addChild(this.loader);
            this.sequence.load(this.loader.setProgress.bind(this.loader)).then(function () {
                _this.loader.visible = false;
                _this.frames = _this.sequence.getTotalFrames();
            });
            this.sequence.alpha = 1;
            this.sequence.setGeomTransform(1280, 720, '50%', '50%', '50%', '50%');
            this.sequence.addBehavior(new AutoScaleBehavior_1.default().setAlwaysCover(true));
            this.enableMouseInteraction();
            this.addBehavior(new ButtonBehavior_1.default());
            this.bindEvents();
        }
        ScrollingPage.prototype.bindEvents = function () {
            var _this = this;
            var first = null;
            var dragging = false;
            var dx = 0;
            var dy = 0;
            this.addEventListener(DisplayObject_1.default.EVENT_MOUSE_DOWN, function (e) {
                if (e.nativeEvent) {
                    e.nativeEvent.stopPropagation();
                }
                dragging = true;
            });
            this.addEventListener(DisplayObject_1.default.EVENT_PRESS_MOVE, function (e) {
                if (e.nativeEvent) {
                    e.nativeEvent.stopPropagation();
                }
                var x = e.stageX;
                var y = e.stageY;
                if (!first) {
                    first = new Point_1.default(x, y);
                }
                else {
                    dx = x - first.x;
                    dy = y - first.y;
                    _this.handleDragging(dx, dy, dragging);
                    first.x = x;
                    first.y = y;
                }
            });
            this.addEventListener(DisplayObject_1.default.EVENT_PRESS_UP, function (e) {
                dragging = false;
                first = null;
            });
        };
        ScrollingPage.prototype.handleDragging = function (dx, dy, dragging) {
            this.position.x += dx * this.scrollPower;
            this.position.y += dy * this.scrollPower;
            this.position.x = MathUtil_1.default.clamp(this.position.x, 0, this.frames - 1);
            this.position.y = MathUtil_1.default.clamp(this.position.y, 0, this.frames - 1);
            var y = Math.round(this.position.y / this.framesPerBlock);
            this.positionLock.y = this.offset + (this.framesPerBlock * y);
        };
        ScrollingPage.prototype.onTick = function (delta) {
            _super.prototype.onTick.call(this, delta);
            this.tick(delta);
        };
        return ScrollingPage;
    })(Container_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ScrollingPage;
});
