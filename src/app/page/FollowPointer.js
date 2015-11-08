var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../lib/easelts/behavior/AutoScaleBehavior", "../../lib/easelts/display/DisplayObject", "../../lib/easelts/geom/Point", "../../lib/easelts/display/Container", "../util/ListUtil", "../../lib/easelts/animation/ImageSequence", "../controls/Loader"], function (require, exports, AutoScaleBehavior_1, DisplayObject_1, Point_1, Container_1, ListUtil_1, ImageSequence_1, Loader_1) {
    var FollowPointer = (function (_super) {
        __extends(FollowPointer, _super);
        function FollowPointer() {
            var _this = this;
            _super.call(this, '100%', '100%');
            this.loader = new Loader_1.default('50%', '50%');
            this.frames = 0;
            this.position = new Point_1.default(0, 0);
            this.sequence = ImageSequence_1.default.createFromString(ListUtil_1.default.createList(500, function (index) {
                return 'data/sequence/piday/image/sequence/' + ListUtil_1.default.padLeft('' + index, 4, '0') + '.png';
            }), 24, 1280, 720);
            this.addChild(this.sequence);
            this.addChild(this.loader);
            this.sequence.load(this.loader.setProgress.bind(this.loader)).then(function () {
                _this.loader.visible = false;
                _this.sequence.play(-1);
                _this.frames = _this.sequence.getTotalFrames();
            });
            this.sequence.alpha = 1;
            this.sequence.setGeomTransform(1280, 720, '50%', '50%', '50%', '50%');
            this.sequence.addBehavior(new AutoScaleBehavior_1.default().setAlwaysCover(true));
        }
        FollowPointer.prototype.bindEvents = function () {
            var _this = this;
            var first = null;
            var dragging = false;
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
                    _this.handleDragging(x - first.x, y - first.y, dragging);
                    first.x = x;
                    first.y = y;
                }
            });
            this.addEventListener(DisplayObject_1.default.EVENT_PRESS_UP, function (e) {
                first = null;
                dragging = false;
                _this.handleDragging(first.x, first.y, dragging);
            });
        };
        FollowPointer.prototype.handleDragging = function (dx, dy, dragging) {
            this.position.x += dx;
            this.position.y += dy;
        };
        FollowPointer.prototype.onTick = function (delta) {
            _super.prototype.onTick.call(this, delta);
            var framePerPosition = 2;
        };
        return FollowPointer;
    })(Container_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = FollowPointer;
});
