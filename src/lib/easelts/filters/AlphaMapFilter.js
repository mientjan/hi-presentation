/// <reference path="./Filter.ts" />
/// <reference path="../util/Methods.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../util/Methods", "./Filter"], function (require, exports, Methods, Filter_1) {
    /**
     * Applies a greyscale alpha map image (or canvas) to the target, such that the alpha channel of the result will
     * be copied from the red channel of the map, and the RGB channels will be copied from the target.
     *
     * Generally, it is recommended that you use {{#crossLink "AlphaMaskFilter"}}{{/crossLink}}, because it has much
     * better performance.
     *
     * <h4>Example</h4>
     * This example draws a red->blue box, caches it, and then uses the cache canvas as an alpha map on a 100x100 image.
     *
     *       var box = new Shape();
     *       box.graphics.beginLinearGradientFill(["#ff0000", "#0000ff"], [0, 1], 0, 0, 0, 100)
     *       box.graphics.drawRect(0, 0, 100, 100);
     *       box.cache(0, 0, 100, 100);
     *
     *       var bmp = new Bitmap("path/to/image.jpg");
     *       bmp.filters = [
     *           new AlphaMapFilter(box.cacheCanvas)
     *       ];
     *       bmp.cache(0, 0, 100, 100);
     *       stage.addChild(bmp);
     *
     * See {{#crossLink "Filter"}}{{/crossLink}} for more information on applying filters.
     * @class AlphaMapFilter
     * @extends Filter
     * @constructor
     * @param {Image|HTMLCanvasElement} alphaMap The greyscale image (or canvas) to use as the alpha value for the
     * result. This should be exactly the same dimensions as the target.
     **/
    var AlphaMapFilter = (function (_super) {
        __extends(AlphaMapFilter, _super);
        // constructor:
        function AlphaMapFilter(alphaMap) {
            _super.call(this);
            // public properties:
            /**
             * The greyscale image (or canvas) to use as the alpha value for the result. This should be exactly the same
             * dimensions as the target.
             * @property alphaMap
             * @type Image|HTMLCanvasElement
             **/
            this.alphaMap = null;
            // private properties:
            this._alphaMap = null;
            this._mapData = null;
            this.alphaMap = alphaMap;
        }
        // public methods:
        AlphaMapFilter.prototype.applyFilter = function (ctx, x, y, width, height, targetCtx, targetX, targetY) {
            if (!this.alphaMap) {
                return true;
            }
            if (!this._prepAlphaMap()) {
                return false;
            }
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
            var map = this._mapData;
            var l = data.length;
            for (var i = 0; i < l; i += 4) {
                data[i + 3] = map[i] || 0;
            }
            targetCtx.putImageData(imageData, targetX, targetY);
            return true;
        };
        /**
         * Returns a clone of this object.
         * @method clone
         * @return {AlphaMapFilter} A clone of the current AlphaMapFilter instance.
         **/
        AlphaMapFilter.prototype.clone = function () {
            return new AlphaMapFilter(this.alphaMap);
        };
        AlphaMapFilter.prototype.toString = function () {
            return "[AlphaMapFilter]";
        };
        // private methods:
        AlphaMapFilter.prototype._prepAlphaMap = function () {
            if (!this.alphaMap) {
                return false;
            }
            if (this.alphaMap == this._alphaMap && this._mapData) {
                return true;
            }
            this._mapData = null;
            var map = this._alphaMap;
            var canvas = map;
            var ctx;
            if (map instanceof HTMLCanvasElement) {
                ctx = canvas.getContext("2d");
            }
            else {
                canvas = Methods.createCanvas ? Methods.createCanvas() : document.createElement("canvas");
                canvas.width = map.width;
                canvas.height = map.height;
                ctx = canvas.getContext("2d");
                ctx.drawImage(map, 0, 0);
            }
            try {
                var imgData = ctx.getImageData(0, 0, map.width, map.height);
                this._mapData = imgData.data;
                return true;
            }
            catch (e) {
                //if (!this.suppressCrossDomainErrors) throw new Error("unable to access local image data: " + e);
                return false;
            }
        };
        return AlphaMapFilter;
    })(Filter_1.default);
    exports.default = AlphaMapFilter;
});
