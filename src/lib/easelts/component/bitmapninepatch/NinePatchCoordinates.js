define(["require", "exports"], function (require, exports) {
    var NinePatchCoordinates = (function () {
        function NinePatchCoordinates(sourceRow, sourceColumn, destRow, destColumn) {
            this.sourceRow = sourceRow;
            this.sourceColumn = sourceColumn;
            this.destRow = destRow;
            this.destColumn = destColumn;
        }
        return NinePatchCoordinates;
    })();
    exports.default = NinePatchCoordinates;
});
