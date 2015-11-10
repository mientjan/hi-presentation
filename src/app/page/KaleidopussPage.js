var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../lib/easelts/geom/Point", "../../lib/easelts/display/Container", "../util/ListUtil", "../../lib/easelts/animation/ImageSequence", "../controls/Loader", "../../lib/easelts/component/RectangleColor", "../../lib/easelts/util/MathUtil", "../../lib/easelts/display/SpriteSheet", "../../lib/createts/util/HttpRequest"], function (require, exports, Point_1, Container_1, ListUtil_1, ImageSequence_1, Loader_1, RectangleColor_1, MathUtil_1, SpriteSheet_1, HttpRequest_1) {
    var KaleidopussPage = (function (_super) {
        __extends(KaleidopussPage, _super);
        function KaleidopussPage() {
            var _this = this;
            _super.call(this, 1280, 720, '50%', '50%', '50%', '50%');
            this.bg = new ImageSequence_1.default(SpriteSheet_1.default.createFromString(ListUtil_1.default.createList(0, 499, function (index) {
                return 'data/sequence/piday/image/sequence/' + ListUtil_1.default.padLeft('' + index, 4, '0') + '.png';
            }), 1280, 720), 24, 1280, 720);
            this.maskContainer = new Container_1.default('100%', '100%').setRenderIsolation(true);
            this.loader = new Loader_1.default('50%', '50%');
            this._mask = new RectangleColor_1.default('#000', 1280, 720);
            this.flashLite = new ImageSequence_1.default(SpriteSheet_1.default.createFromString(ListUtil_1.default.createList(0, 96, function (index) {
                return 'data/sequence/piday/image/preloader/preloader_' + ListUtil_1.default.padLeft('' + index, 2, '0') + '.png';
            }), 200, 200), 24, 200, 200);
            this.flashLite1 = new RectangleColor_1.default('#000', 100, 100);
            this.position = new Point_1.default(0, 0);
            this.positionTo = new Point_1.default(0, 0);
            this._mask.alpha = .5;
            this.hitArea = new RectangleColor_1.default('#000', '100%', '100%');
            this.hitArea.visible = false;
            this.addChild(this.hitArea);
            this.addChild(this.bg);
            this.addChild(this.maskContainer);
            this.maskContainer.addChild(this._mask);
            this.maskContainer.addChild(this.flashLite);
            this.addChild(this.loader);
            HttpRequest_1.default.waitForLoadable([this.bg, this.flashLite], this.loader.setProgress.bind(this.loader)).then(function () {
                _this.loader.visible = false;
                _this.bg.play(-1);
                _this.flashLite.play(-1);
            });
            this.flashLite.setGeomTransform(200, 200, '50%', '50%', '50%', '50%');
            this.flashLite.compositeOperation = ImageSequence_1.default.COMPOSITE_OPERATION_DESTINATION_OUT;
            this.enableMouseInteraction();
        }
        KaleidopussPage.prototype.draw = function (ctx, ignore) {
            if (_super.prototype.draw.call(this, ctx, ignore)) {
                return true;
            }
        };
        KaleidopussPage.prototype.setStage = function (stage) {
            var _this = this;
            _super.prototype.setStage.call(this, stage);
            stage.addEventListener('stagemousemove', function (e) {
                if (e.nativeEvent) {
                }
                var point = _this.maskContainer.globalToLocal(e.rawX, e.rawY);
                _this.position.x = point.x;
                _this.position.y = point.y;
            });
        };
        KaleidopussPage.prototype.onTick = function (delta) {
            _super.prototype.onTick.call(this, delta);
            var x = (this.width / 2);
            var y = (this.height / 2);
            MathUtil_1.default.lerpVector2(this.flashLite, this.position, .1);
        };
        return KaleidopussPage;
    })(Container_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = KaleidopussPage;
});
