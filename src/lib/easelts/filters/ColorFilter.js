var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./Filter"], function (require, exports, Filter_1) {
    /**
     * Applies a color transform to DisplayObjects.
     *
     * <h4>Example</h4>
     * This example draws a red circle, and then transforms it to Blue. This is accomplished by multiplying all the channels
     * to 0 (except alpha, which is set to 1), and then adding 255 to the blue channel.
     *
     *      var shape = new createjs.Shape().set({x:100,y:100});
     *      shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
     *
     *      shape.filters = [
     *          new createjs.ColorFilter(0,0,0,1, 0,0,255,0)
     *      ];
     *      shape.cache(-50, -50, 100, 100);
     *
     * See {{#crossLink "Filter"}}{{/crossLink}} for an more information on applying filters.
     * @class ColorFilter
     * @param {Number} [redMultiplier=1] The amount to multiply against the red channel. This is a range between 0 and 1.
     * @param {Number} [greenMultiplier=1] The amount to multiply against the green channel. This is a range between 0 and 1.
     * @param {Number} [blueMultiplier=1] The amount to multiply against the blue channel. This is a range between 0 and 1.
     * @param {Number} [alphaMultiplier=1] The amount to multiply against the alpha channel. This is a range between 0 and 1.
     * @param {Number} [redOffset=0] The amount to add to the red channel after it has been multiplied. This is a range
     * between -255 and 255.
     * @param {Number} [greenOffset=0] The amount to add to the green channel after it has been multiplied. This is a range
     * between -255 and 255.
     * @param {Number} [blueOffset=0] The amount to add to the blue channel after it has been multiplied. This is a range
     * between -255 and 255.
     * @param {Number} [alphaOffset=0] The amount to add to the alpha channel after it has been multiplied. This is a range
     * between -255 and 255.
     * @constructor
     * @extends Filter
     **/
    var ColorFilter = (function (_super) {
        __extends(ColorFilter, _super);
        // constructor:
        /**
         * Initialization method.
         * @method initialize
         * @param {Number} [redMultiplier=1] The amount to multiply against the red channel. This is a range between 0 and 1.
         * @param {Number} [greenMultiplier=1] The amount to multiply against the green channel. This is a range between 0 and 1.
         * @param {Number} [blueMultiplier=1] The amount to multiply against the blue channel. This is a range between 0 and 1.
         * @param {Number} [alphaMultiplier=1] The amount to multiply against the alpha channel. This is a range between 0 and 1.
         * @param {Number} [redOffset=0] The amount to add to the red channel after it has been multiplied. This is a range
         * between -255 and 255.
         * @param {Number} [greenOffset=0] The amount to add to the green channel after it has been multiplied. This is a range
         * between -255 and 255.
         * @param {Number} [blueOffset=0] The amount to add to the blue channel after it has been multiplied. This is a range
         * between -255 and 255.
         * @param {Number} [alphaOffset=0] The amount to add to the alpha channel after it has been multiplied. This is a range
         * between -255 and 255.
         * @protected
         **/
        function ColorFilter(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
            _super.call(this);
            // public properties:
            /**
             * Red channel multiplier.
             * @property redMultiplier
             * @type Number
             **/
            this.redMultiplier = 1;
            /**
             * Green channel multiplier.
             * @property greenMultiplier
             * @type Number
             **/
            this.greenMultiplier = 1;
            /**
             * Blue channel multiplier.
             * @property blueMultiplier
             * @type Number
             **/
            this.blueMultiplier = 1;
            /**
             * Alpha channel multiplier.
             * @property alphaMultiplier
             * @type Number
             **/
            this.alphaMultiplier = 1;
            /**
             * Red channel offset (added to value).
             * @property redOffset
             * @type Number
             **/
            this.redOffset = 0;
            /**
             * Green channel offset (added to value).
             * @property greenOffset
             * @type Number
             **/
            this.greenOffset = 0;
            /**
             * Blue channel offset (added to value).
             * @property blueOffset
             * @type Number
             **/
            this.blueOffset = 0;
            /**
             * Alpha channel offset (added to value).
             * @property alphaOffset
             * @type Number
             **/
            this.alphaOffset = 0;
            this.redMultiplier = redMultiplier != null ? redMultiplier : 1;
            this.greenMultiplier = greenMultiplier != null ? greenMultiplier : 1;
            this.blueMultiplier = blueMultiplier != null ? blueMultiplier : 1;
            this.alphaMultiplier = alphaMultiplier != null ? alphaMultiplier : 1;
            this.redOffset = redOffset || 0;
            this.greenOffset = greenOffset || 0;
            this.blueOffset = blueOffset || 0;
            this.alphaOffset = alphaOffset || 0;
        }
        // public methods:
        ColorFilter.prototype.applyFilter = function (ctx, x, y, width, height, targetCtx, targetX, targetY) {
            targetCtx = targetCtx || ctx;
            if (targetX == null) {
                targetX = x;
            }
            if (targetY == null) {
                targetY = y;
            }
            try {
                var imageData = ctx.getImageData(x, y, width, height);
            }
            catch (e) {
                //if (!this.suppressCrossDomainErrors) throw new Error("unable to access local image data: " + e);
                return false;
            }
            var data = imageData.data;
            var l = data.length;
            for (var i = 0; i < l; i += 4) {
                data[i] = data[i] * this.redMultiplier + this.redOffset;
                data[i + 1] = data[i + 1] * this.greenMultiplier + this.greenOffset;
                data[i + 2] = data[i + 2] * this.blueMultiplier + this.blueOffset;
                data[i + 3] = data[i + 3] * this.alphaMultiplier + this.alphaOffset;
            }
            targetCtx.putImageData(imageData, targetX, targetY);
            return true;
        };
        ColorFilter.prototype.toString = function () {
            return "[ColorFilter]";
        };
        /**
         * Returns a clone of this ColorFilter instance.
         * @method clone
         * @return {ColorFilter} A clone of the current ColorFilter instance.
         **/
        ColorFilter.prototype.clone = function () {
            return new ColorFilter(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset);
        };
        return ColorFilter;
    })(Filter_1.default);
    exports.default = ColorFilter;
});
