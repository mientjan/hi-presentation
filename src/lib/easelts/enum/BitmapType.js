define(["require", "exports"], function (require, exports) {
    /**
     * @enum BitmapType
     */
    var BitmapType;
    (function (BitmapType) {
        BitmapType[BitmapType["UNKNOWN"] = 0] = "UNKNOWN";
        BitmapType[BitmapType["IMAGE"] = 1] = "IMAGE";
        BitmapType[BitmapType["VIDEO"] = 2] = "VIDEO";
        BitmapType[BitmapType["CANVAS"] = 3] = "CANVAS";
    })(BitmapType || (BitmapType = {}));
});
