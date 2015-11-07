var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../display/DisplayObject', './FlumpKeyframeData', './FlumpTexture', './FlumpLabelData'], function (require, exports, DisplayObject_1, FlumpKeyframeData_1, FlumpTexture_1, FlumpLabelData_1) {
    var FlumpMovieLayer = (function (_super) {
        __extends(FlumpMovieLayer, _super);
        function FlumpMovieLayer(flumpMove, flumpLayerData) {
            _super.call(this);
            this.name = '';
            this._frame = 0;
            this._symbols = {};
            this._symbolName = null;
            this._storedMtx = {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                tx: 0,
                ty: 0
            };
            this.flumpLayerData = flumpLayerData;
            this.name = flumpLayerData.name;
            var flumpLibrary = flumpMove.flumpLibrary;
            for (var i = 0; i < flumpLayerData.flumpKeyframeDatas.length; i++) {
                var keyframe = flumpLayerData.flumpKeyframeDatas[i];
                if (keyframe.label) {
                    flumpMove['_labels'][keyframe.label] = new FlumpLabelData_1.default(keyframe.label, keyframe.index, keyframe.duration);
                }
                if ((keyframe.ref != -1 && keyframe.ref != null) && (keyframe.ref in this._symbols) == false) {
                    this._symbols[keyframe.ref] = flumpMove.flumpLibrary.createSymbol(keyframe.ref, false);
                }
            }
            this.setFrame(0);
        }
        //Matrix get transformationMatrix => _transformationMatrix;
        FlumpMovieLayer.prototype.onTick = function (delta) {
            if (this._symbol != null && !(this._symbol instanceof FlumpTexture_1.default)) {
                this._symbol.onTick(delta);
            }
        };
        FlumpMovieLayer.prototype.setFrame = function (frame) {
            var keyframe = this.flumpLayerData.getKeyframeForFrame(frame | 0);
            if (!(keyframe instanceof FlumpKeyframeData_1.default)) {
                this._symbol = null;
                return;
            }
            if (keyframe.ref != -1 && keyframe.ref != null) {
                if (this._symbol != this._symbols[keyframe.ref]) {
                    this._symbol = this._symbols[keyframe.ref];
                    this._symbol.reset();
                }
            }
            else {
                this._symbol = null;
                return;
            }
            var x = keyframe.x;
            var y = keyframe.y;
            var scaleX = keyframe.scaleX;
            var scaleY = keyframe.scaleY;
            var skewX = keyframe.skewX;
            var skewY = keyframe.skewY;
            var pivotX = keyframe.pivotX;
            var pivotY = keyframe.pivotY;
            var alpha = keyframe.alpha;
            var sinX = 0.0;
            var cosX = 1.0;
            var sinY = 0.0;
            var cosY = 1.0;
            if (keyframe.index != (frame | 0) && keyframe.tweened) {
                var nextKeyframe = this.flumpLayerData.getKeyframeAfter(keyframe);
                if (nextKeyframe instanceof FlumpKeyframeData_1.default) {
                    var interped = (frame - keyframe.index) / keyframe.duration;
                    var ease = keyframe.ease;
                    if (ease != 0) {
                        var t = 0.0;
                        if (ease < 0) {
                            var inv = 1 - interped;
                            t = 1 - inv * inv;
                            ease = 0 - ease;
                        }
                        else {
                            t = interped * interped;
                        }
                        interped = ease * t + (1 - ease) * interped;
                    }
                    x = x + (nextKeyframe.x - x) * interped;
                    y = y + (nextKeyframe.y - y) * interped;
                    scaleX = scaleX + (nextKeyframe.scaleX - scaleX) * interped;
                    scaleY = scaleY + (nextKeyframe.scaleY - scaleY) * interped;
                    skewX = skewX + (nextKeyframe.skewX - skewX) * interped;
                    skewY = skewY + (nextKeyframe.skewY - skewY) * interped;
                    alpha = alpha + (nextKeyframe.alpha - alpha) * interped;
                }
            }
            if (skewX != 0) {
                sinX = Math.sin(skewX);
                cosX = Math.cos(skewX);
            }
            if (skewY != 0) {
                sinY = Math.sin(skewY);
                cosY = Math.cos(skewY);
            }
            this._storedMtx.a = scaleX * cosY;
            this._storedMtx.b = scaleX * sinY;
            this._storedMtx.c = -scaleY * sinX;
            this._storedMtx.d = scaleY * cosX;
            this._storedMtx.tx = x - (pivotX * this._storedMtx.a + pivotY * this._storedMtx.c);
            this._storedMtx.ty = y - (pivotX * this._storedMtx.b + pivotY * this._storedMtx.d);
            this.alpha = alpha;
            this.visible = keyframe.visible;
            this._frame = frame;
        };
        FlumpMovieLayer.prototype.reset = function () {
            if (this._symbol)
                this._symbol.reset();
        };
        FlumpMovieLayer.prototype.draw = function (ctx, ignoreCache) {
            if (this._symbol != null && this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0) {
                this._symbol.draw(ctx);
            }
            return true;
        };
        return FlumpMovieLayer;
    })(DisplayObject_1.default);
    exports.default = FlumpMovieLayer;
});
