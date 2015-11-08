define(["require", "exports"], function (require, exports) {
    var FluidMeasurementsUnit = (function () {
        function FluidMeasurementsUnit(value, unit) {
            this.value = value;
            this.unit = unit;
        }
        return FluidMeasurementsUnit;
    })();
    exports.default = FluidMeasurementsUnit;
});
