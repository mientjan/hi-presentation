var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../display/Bitmap", "../display/DisplayObject"], function (require, exports, Bitmap_1, DisplayObject_1) {
    var BitmapNinePatch = (function (_super) {
        __extends(BitmapNinePatch, _super);
        function BitmapNinePatch(ninePatch, width, height, x, y, regX, regY) {
            if (width === void 0) { width = '100%'; }
            if (height === void 0) { height = '100%'; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            _super.call(this, width, height, x, y, regX, regY);
            this.type = 8;
            this.loaded = false;
            this._patch = ninePatch;
            if (!this._patch.bitmap.loaded) {
                this._patch.bitmap.addEventListener(Bitmap_1.default.EVENT_LOAD, this.onLoad.bind(this));
            }
            else {
                this.onLoad();
            }
        }
        BitmapNinePatch.prototype.onLoad = function () {
            this.loaded = true;
        };
        BitmapNinePatch.prototype.setContentSize = function (width, height) {
            var imageSize = this._patch.bitmap.getImageSize();
            this.setWidth(this._patch.rectangle.x
                + Math.max(this._patch.rectangle.width, width)
                + imageSize.width - (this._patch.rectangle.x + this._patch.rectangle.width));
            this.setHeight(this._patch.rectangle.y
                + Math.max(this._patch.rectangle.height, height)
                + imageSize.height - (this._patch.rectangle.y + this._patch.rectangle.height));
            return this;
        };
        BitmapNinePatch.prototype.getRectangle = function () {
            return this._patch.rectangle;
        };
        BitmapNinePatch.prototype.draw = function (ctx, ignoreCache) {
            if (!this.loaded) {
                return false;
            }
            if (_super.prototype.draw.call(this, ctx, ignoreCache)) {
                return true;
            }
            var image = this._patch.bitmap.image;
            var coordinates = this._patch.getCoordinates(this.width, this.height);
            var sourceColumn = coordinates.sourceColumn;
            var sourceRow = coordinates.sourceRow;
            var destColumn = coordinates.destColumn;
            var destRow = coordinates.destRow;
            ctx.save();
            ctx.drawImage(image, sourceColumn[0], sourceRow[0], sourceColumn[1], sourceRow[1], destColumn[0], destRow[0], destColumn[1], destRow[1]);
            ctx.drawImage(image, sourceColumn[1], sourceRow[0], sourceColumn[2] - sourceColumn[1], sourceRow[1], destColumn[1], destRow[0], destColumn[2] - destColumn[1], destRow[1]);
            ctx.drawImage(image, sourceColumn[2], sourceRow[0], sourceColumn[3] - sourceColumn[2], sourceRow[1], destColumn[2], destRow[0], destColumn[3] - destColumn[2], destRow[1]);
            ctx.drawImage(image, sourceColumn[0], sourceRow[1], sourceColumn[1], sourceRow[2] - sourceRow[1], destColumn[0], destRow[1], destColumn[1], destRow[2] - destRow[1]);
            ctx.drawImage(image, sourceColumn[1], sourceRow[1], sourceColumn[2] - sourceColumn[1], sourceRow[2] - sourceRow[1], destColumn[1], destRow[1], destColumn[2] - destColumn[1], destRow[2] - destRow[1]);
            ctx.drawImage(image, sourceColumn[2], sourceRow[1], sourceColumn[3] - sourceColumn[2], sourceRow[2] - sourceRow[1], destColumn[2], destRow[1], destColumn[3] - destColumn[2], destRow[2] - destRow[1]);
            ctx.drawImage(image, sourceColumn[0], sourceRow[2], sourceColumn[1], sourceRow[3] - sourceRow[2], destColumn[0], destRow[2], destColumn[1], destRow[3] - destRow[2]);
            ctx.drawImage(image, sourceColumn[1], sourceRow[2], sourceColumn[2] - sourceColumn[1], sourceRow[3] - sourceRow[2], destColumn[1], destRow[2], destColumn[2] - destColumn[1], destRow[3] - destRow[2]);
            ctx.drawImage(image, sourceColumn[2], sourceRow[2], sourceColumn[3] - sourceColumn[2], sourceRow[3] - sourceRow[2], destColumn[2], destRow[2], destColumn[3] - destColumn[2], destRow[3] - destRow[2]);
            ctx.restore();
            return true;
        };
        return BitmapNinePatch;
    })(DisplayObject_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = BitmapNinePatch;
});
