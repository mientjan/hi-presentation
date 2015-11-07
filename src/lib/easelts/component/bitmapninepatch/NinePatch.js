define(["require", "exports", "../../display/Bitmap", "../../geom/Rectangle", "./NinePatchCoordinates"], function (require, exports, Bitmap_1, Rectangle_1, NinePatchCoordinates_1) {
    /**
     *
     */
    var NinePatch = (function () {
        /**
         *
         * @param imageOrString
         * @param rectangle
         */
        function NinePatch(imageOrString, rectangle) {
            this.bitmap = new Bitmap_1.default(imageOrString);
            if (!(rectangle instanceof Rectangle_1.default)) {
                this.rectangle = new Rectangle_1.default(rectangle[0], rectangle[1], rectangle[2], rectangle[3]);
            }
            else {
                this.rectangle = rectangle;
            }
        }
        /**
         *
         * @param width
         * @param height
         * @returns {NinePatchCoordinates}
         */
        NinePatch.prototype.getCoordinates = function (width, height) {
            var image = this.bitmap.getImageSize();
            var iw = image.width;
            var ih = image.height;
            var rx = this.rectangle.x;
            var ry = this.rectangle.y;
            var rw = this.rectangle.width;
            var rh = this.rectangle.height;
            var sourceRow = [
                0, ry, ry + rh, ih
            ];
            var sourceColumn = [
                0, rx, rx + rw, iw
            ];
            var destRow = [
                0, ry, height - (sourceRow[3] - sourceRow[2]), height
            ];
            var destColumn = [
                0, rx, width - (sourceColumn[3] - sourceColumn[2]), width
            ];
            return new NinePatchCoordinates_1.default(sourceRow, sourceColumn, destRow, destColumn);
        };
        return NinePatch;
    })();
    exports.default = NinePatch;
});
