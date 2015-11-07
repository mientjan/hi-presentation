/// <reference path="./Filter.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./Filter"], function (require, exports, Filter_1) {
    /**
     * Applies the alpha from the mask image (or canvas) to the target, such that the alpha channel of the result will
     * be derived from the mask, and the RGB channels will be copied from the target. This can be used, for example, to
     * apply an alpha mask to a display object. This can also be used to combine a JPG compressed RGB image with a PNG32
     * alpha mask, which can result in a much smaller file size than a single PNG32 containing ARGB.
     *
     * <b>IMPORTANT NOTE: This filter currently does not support the targetCtx, or targetX/Y parameters correctly.</b>
     *
     * <h4>Example</h4>
     * This example draws a gradient box, then caches it and uses the "cacheCanvas" as the alpha mask on a 100x100 image.
     *
     *      var box = new createjs.Shape();
     *      box.graphics.beginLinearGradientFill(["#000000", "rgba(0, 0, 0, 0)"], [0, 1], 0, 0, 100, 100)
     *      box.graphics.drawRect(0, 0, 100, 100);
     *      box.cache(0, 0, 100, 100);
     *
     *      var bmp = new createjs.Bitmap("path/to/image.jpg");
     *      bmp.filters = [
     *          new createjs.AlphaMaskFilter(box.cacheCanvas)
     *      ];
     *      bmp.cache(0, 0, 100, 100);
     *
     * See {{#crossLink "Filter"}}{{/crossLink}} for more information on applying filters.
     * @class AlphaMaskFilter
     * @extends Filter
     * @constructor
     * @param {Image} mask
     **/
    var AlphaMaskFilter = (function (_super) {
        __extends(AlphaMaskFilter, _super);
        // constructor:
        function AlphaMaskFilter(mask) {
            _super.call(this);
            // public properties:
            /**
             * The image (or canvas) to use as the mask.
             * @property mask
             * @type Image
             **/
            this.mask = null;
            this.mask = mask;
        }
        // public methods:
        /**
         * Applies the filter to the specified context.
         *
         * <strong>IMPORTANT NOTE: This filter currently does not support the targetCtx, or targetX/Y parameters
         * correctly.</strong>
         * @method applyFilter
         * @param {CanvasRenderingContext2D} ctx The 2D context to use as the source.
         * @param {Number} x The x position to use for the source rect.
         * @param {Number} y The y position to use for the source rect.
         * @param {Number} width The width to use for the source rect.
         * @param {Number} height The height to use for the source rect.
         * @param {CanvasRenderingContext2D} [targetCtx] The 2D context to draw the result to. Defaults to the context passed to ctx.
         * @param {Number} [targetX] The x position to draw the result to. Defaults to the value passed to x.
         * @param {Number} [targetY] The y position to draw the result to. Defaults to the value passed to y.
         * @return {Boolean} If the filter was applied successfully.
         **/
        AlphaMaskFilter.prototype.applyFilter = function (ctx, x, y, width, height, targetCtx, targetX, targetY) {
            if (!this.mask) {
                return true;
            }
            targetCtx = targetCtx || ctx;
            if (targetX == null) {
                targetX = x;
            }
            if (targetY == null) {
                targetY = y;
            }
            targetCtx.save();
            if (ctx != targetCtx) {
            }
            targetCtx.globalCompositeOperation = "destination-in";
            targetCtx.drawImage(this.mask, targetX, targetY);
            targetCtx.restore();
            return true;
        };
        /**
         * Returns a clone of this object.
         * @method clone
         * @return {AlphaMaskFilter}
         **/
        AlphaMaskFilter.prototype.clone = function () {
            return new AlphaMaskFilter(this.mask);
        };
        AlphaMaskFilter.prototype.toString = function () {
            return "[AlphaMaskFilter]";
        };
        return AlphaMaskFilter;
    })(Filter_1.default);
    exports.default = AlphaMaskFilter;
});
