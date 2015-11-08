define(["require", "exports", "./FluidMeasurementsUnit", "../enum/MeasurementUnitType"], function (require, exports, FluidMeasurementsUnit_1, MeasurementUnitType_1) {
    /**
     * @todo add more unit types
     * @class FluidCalculation
     * @author Mient-jan Stelling
     */
    var FluidCalculation = (function () {
        function FluidCalculation() {
        }
        /**
         *
         * @method dissolveCalcElements
         * @param {string[]} statement
         * @returns {Array}
         */
        FluidCalculation.dissolveCalcElements = function (statement) {
            statement = statement.replace('*', ' * ').replace('/', ' / ');
            var arr = statement.split(FluidCalculation._spaceSplit);
            var calculationElements = [];
            for (var i = 0; i < arr.length; i++) {
                var d = FluidCalculation.dissolveElement(arr[i]);
                calculationElements.push(d);
            }
            return calculationElements;
        };
        /**
         * @method dissolveElement
         * @param {String} val
         * @return ( FluidMeasurementsUnit | CalculationUnitType )
         * @public
         * @static
         */
        FluidCalculation.dissolveElement = function (val) {
            var index = FluidCalculation._calculationUnitypeString.indexOf(val);
            if (index >= 0) {
                return FluidCalculation._calculationUnitType[index];
            }
            var unit;
            var match = FluidCalculation._valueUnitDisolvement.exec(val);
            var mesUnitTypeString = match.length >= 3 ? match[2] : MeasurementUnitType_1.default[MeasurementUnitType_1.default.PIXEL];
            var mesUnitType = FluidCalculation._measurementUnitTypeString.indexOf(mesUnitTypeString);
            if (match) {
                var v = match.length >= 2 ? match[1] : match[0];
                unit = new FluidMeasurementsUnit_1.default(FluidCalculation.toFloat(v), mesUnitType);
            }
            else {
                unit = new FluidMeasurementsUnit_1.default(FluidCalculation.toFloat(val), mesUnitType);
            }
            return unit;
        };
        /**
         * @method calcUnit
         * @param size
         * @param data
         * @returns {number}
         */
        FluidCalculation.calcUnit = function (size, data) {
            var sizea = FluidCalculation.getCalcUnitSize(size, data[0]);
            for (var i = 2, l = data.length; i < l; i = i + 2) {
                sizea = FluidCalculation.getCalcUnit(sizea, data[i - 1], FluidCalculation.getCalcUnitSize(size, data[i]));
            }
            return sizea;
        };
        /**
         * Calculates arithmetic on 2 units.
         *
         * @author Mient-jan Stelling
         * @param unit1
         * @param math
         * @param unit2
         * @returns number;
         */
        FluidCalculation.getCalcUnit = function (unit1, math, unit2) {
            switch (math) {
                case 0 /* ADDITION */:
                    {
                        return unit1 + unit2;
                        break;
                    }
                case 1 /* SUBSTRACTION */:
                    {
                        return unit1 - unit2;
                        break;
                    }
                case 2 /* MULTIPLICATION */:
                    {
                        return unit1 * unit2;
                        break;
                    }
                case 3 /* DIVISION */:
                    {
                        return unit1 / unit2;
                        break;
                    }
                default:
                    {
                        return 0;
                        break;
                    }
            }
        };
        /**
         * @author Mient-jan Stelling
         * @method getCalculationTypeByValue
         * @param value {number|string}
         * @returns {CalculationType}
         * @public
         * @static
         */
        FluidCalculation.getCalculationTypeByValue = function (value) {
            if (typeof (value) == 'string') {
                if (value.substr(-1) == '%') {
                    return 1 /* PERCENT */;
                }
                else {
                    return 3 /* CALC */;
                }
            }
            return 2 /* STATIC */;
        };
        /**
         * @author Mient-jan Stelling
         * @method getCalculationTypeByValue
         * @param value {number|string}
         * @returns {CalculationType}
         * @public
         * @static
         */
        FluidCalculation.getPercentageParcedValue = function (value) {
            return parseFloat(value.substr(0, value.length - 1)) / 100;
        };
        /**
         *
         * @todo add support for more unit types.
         *
         * @author Mient-jan Stelling
         * @method getCalcUnitSize
         * @param size
         * @param data
         * @returns {number}
         * @public
         * @static
         */
        FluidCalculation.getCalcUnitSize = function (size, data) {
            switch (data.unit) {
                case MeasurementUnitType_1.default.PROCENT:
                    {
                        return size * (data.value / 100);
                        break;
                    }
                default:
                    {
                        return data.value;
                        break;
                    }
            }
        };
        FluidCalculation.toFloat = function (value) {
            return parseFloat(value) || 0.0;
        };
        /**
         *
         */
        FluidCalculation._calculationUnitType = [
            0 /* ADDITION */,
            1 /* SUBSTRACTION */,
            2 /* MULTIPLICATION */,
            3 /* DIVISION */
        ];
        /**
         * @property _measurementUnitTypeString
         **/
        FluidCalculation._measurementUnitTypeString = [
            '%', 'px', 'pt', 'in', 'cm', 'mm', 'vw', 'vh'
        ];
        FluidCalculation._calculationUnitypeString = '+-*/';
        FluidCalculation._valueUnitDisolvement = /([\+\-]?[0-9\.]+)(%|px|pt|in|cm|mm|vw|vh)?/;
        FluidCalculation._spaceSplit = /\s+/;
        return FluidCalculation;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = FluidCalculation;
});
