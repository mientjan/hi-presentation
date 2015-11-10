var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../lib/easelts/geom/Point", "../../lib/easelts/display/Container", "../util/ListUtil", "../../lib/easelts/animation/ImageSequence", "../controls/Loader", "../../lib/easelts/component/RectangleColor", "../../lib/easelts/util/MathUtil", "../../lib/easelts/display/SpriteSheet", "../../lib/createts/util/Functional", "../../lib/easelts/display/Bitmap"], function (require, exports, Point_1, Container_1, ListUtil_1, ImageSequence_1, Loader_1, RectangleColor_1, MathUtil_1, SpriteSheet_1, Functional, Bitmap_1) {
    var FollowPointer = (function (_super) {
        __extends(FollowPointer, _super);
        function FollowPointer() {
            var _this = this;
            _super.call(this, '100%', '100%');
            this.loader = new Loader_1.default('50%', '50%');
            this.frames = 0;
            this.scrollPower = .1;
            this.framesPerBlock = 50;
            this.offset = 0;
            this.buffer = document.createElement('canvas');
            this.sw = 1;
            this.sh = 1;
            this.changeScale = Functional.throttle(function () {
                _this.sw = .5;
                _this.sh = .5;
                console.log('change');
            }, 1000, this);
            this.position = new Point_1.default(0, 0);
            this.positionTo = new Point_1.default(0, 0);
            this.buffer.width = 100;
            this.buffer.height = 100;
            var bitmap = new Bitmap_1.default(this.buffer, '100%', '100%');
            this.hitArea = new RectangleColor_1.default('#000', '100%', '100%');
            this.addChild(this.hitArea);
            this.hitArea.compositeOperation = FollowPointer.COMPOSITE_OPERATION_DARKER;
            this.sequence = new ImageSequence_1.default(SpriteSheet_1.default.createFromString(ListUtil_1.default.createList(0, 96, function (index) {
                return 'data/sequence/piday/image/preloader/preloader_' + ListUtil_1.default.padLeft('' + index, 2, '0') + '.png';
            }), 200, 200), 24, 200, 200);
            this.addChild(bitmap);
            this.addChild(this.sequence);
            this.addChild(this.loader);
            this.sequence.load(this.loader.setProgress.bind(this.loader)).then(function () {
                _this.loader.visible = false;
                _this.frames = _this.sequence.getTotalFrames();
                _this.sequence.play(-1);
            });
            this.sequence.alpha = 1;
            this.sequence.setGeomTransform(400, 400, '50%', '50%', '50%', '50%');
            this.enableMouseInteraction();
            this.bindEvents();
        }
        FollowPointer.prototype.draw = function (ctx, ignore) {
            var canvas = ctx.canvas;
            var x = 0, y = 0, w = this.width * this.sw, h = this.height * this.sw;
            x = (this.width - w) / 2;
            y = (this.height - h) / 2;
            var bctx = this.buffer.getContext('2d');
            bctx.fillStyle = 'rgba(0,0,0,0.01';
            bctx.fillRect(0, 0, this.width, this.height);
            bctx.globalAlpha = 1;
            bctx.drawImage(canvas, 0, 0, this.width, this.height, x, y, w, h);
            ctx.drawImage(this.buffer, 0, 0, this.width, this.height);
            this.changeScale();
            if (_super.prototype.draw.call(this, ctx, ignore)) {
                return true;
            }
        };
        FollowPointer.prototype.setStage = function (stage) {
            var _this = this;
            _super.prototype.setStage.call(this, stage);
            stage.addEventListener('stagemousemove', function (e) {
                if (e.nativeEvent) {
                }
                _this.position.x = e.getLocalX();
                _this.position.y = e.getLocalY();
                console.log(_this.position);
            });
        };
        FollowPointer.prototype.bindEvents = function () {
            var first = null;
            var dragging = false;
            var dx = 0;
            var dy = 0;
        };
        FollowPointer.prototype.onTick = function (delta) {
            _super.prototype.onTick.call(this, delta);
            var x = (this.width / 2);
            var y = (this.height / 2);
            MathUtil_1.default.lerpVector2(this.sequence, this.position, .1);
            this.sequence.rotation = Math.atan2(this.sequence.x, this.sequence.y) * 360;
        };
        FollowPointer.prototype.onResize = function (w, h) {
            _super.prototype.onResize.call(this, w, h);
            this.buffer.width = w;
            this.buffer.height = h;
        };
        return FollowPointer;
    })(Container_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = FollowPointer;
});
