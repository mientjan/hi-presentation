define(["require", "exports"], function (require, exports) {
    /**
     * @class MathUtil
     */
    var MathUtil = (function () {
        function MathUtil() {
        }
        //
        /**
         * Clamp value to range <a, b>
         * @method clamp
         * @param {number} x
         * @param {number} a
         * @param {number} b
         * @returns {number}
         */
        MathUtil.clamp = function (x, a, b) {
            return (x < a) ? a : ((x > b) ? b : x);
        };
        /**
         * Clamp value to range <a, inf)
         * @method clampBottom
         * @param {number} x
         * @param {number} a
         * @returns {number}
         */
        MathUtil.clampBottom = function (x, a) {
            return x < a ? a : x;
        };
        MathUtil.contains = function (value, index, margin) {
            var bool = false;
            if (index - margin < value && index + margin > value) {
                bool = true;
            }
            return bool;
        };
        MathUtil.containsVector2 = function (value, index, margin) {
            var bool = false;
            if (MathUtil.contains(value.x, index.x, margin.x)
                && MathUtil.contains(value.y, index.y, margin.y)) {
                bool = true;
            }
            return bool;
        };
        MathUtil.containsVector3 = function (value, index, margin) {
            var bool = false;
            if (MathUtil.contains(value.x, index.x, margin.x)
                && MathUtil.contains(value.y, index.y, margin.y)
                && MathUtil.contains(value.z, index.z, margin.z)) {
                bool = true;
            }
            return bool;
        };
        /**
         * Linear mapping from range <a1, a2> to range <b1, b2>
         * @method mapLinear
         * @param {number} x
         * @param {number} a1
         * @param {number} a2
         * @param {number} b1
         * @param {number} b2
         * @returns {number}
         */
        MathUtil.mapLinear = function (x, a1, a2, b1, b2) {
            return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
        };
        /**
         * @method smoothStep
         * @param {number} x
         * @param {number} min
         * @param {number} max
         * @returns {number}
         * @see http://en.wikipedia.org/wiki/Smoothstep
         */
        MathUtil.smoothStep = function (x, min, max) {
            if (x <= min) {
                return 0;
            }
            if (x >= max) {
                return 1;
            }
            x = (x - min) / (max - min);
            return x * x * (3 - 2 * x);
        };
        /**
         * @method smootherStep
         * @param {number} x
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        MathUtil.smootherStep = function (x, min, max) {
            if (x <= min) {
                return 0;
            }
            if (x >= max) {
                return 1;
            }
            x = (x - min) / (max - min);
            return x * x * x * (x * (x * 6 - 15) + 10);
        };
        MathUtil.lerp = function (fromValue, toValue, alpha) {
            fromValue += (toValue - fromValue) * alpha;
            return fromValue;
        };
        /**
         *    Random float from <0, 1> with 16 bits of randomness
         *    (standard Math.random() creates repetitive patterns when applied over larger space)
         *
         * @method random16
         * @returns {number}
         */
        MathUtil.random16 = function () {
            return (65280 * Math.random() + 255 * Math.random()) / 65535;
        };
        /**
         * Random integer from <low, high> interval
         * @param {number} low
         * @param {number} high
         * @returns {number}
         */
        MathUtil.randInt = function (low, high) {
            return low + Math.floor(Math.random() * (high - low + 1));
        };
        /**
         * Random float from <low, high> interval
         * @method randFloat
         * @param {number} low
         * @param {number} high
         * @returns {number}
         */
        MathUtil.randFloat = function (low, high) {
            return low + Math.random() * (high - low);
        };
        /**
         * Random float from <-range/2, range/2> interval
         * @method randFloatSpread
         * @param {number} range
         * @returns {number}
         */
        MathUtil.randFloatSpread = function (range) {
            return range * (0.5 - Math.random());
        };
        /**
         * @method degToRad
         * @param {number} degrees
         * @returns {number}
         */
        MathUtil.degToRad = function (degrees) {
            return degrees * MathUtil.degreeToRadiansFactor;
        };
        /**
         * @method radToDeg
         * @param {number} radians
         * @returns {number}
         */
        MathUtil.radToDeg = function (radians) {
            return radians * MathUtil.radianToDegreesFactor;
        };
        /**
         * @method isPowerOfTwo
         * @param {number} value
         * @returns {boolean}
         */
        MathUtil.isPowerOfTwo = function (value) {
            return (value & (value - 1)) === 0 && value !== 0;
        };
        MathUtil.getDistance = function (point0, point1) {
            var dx = point1.x - point0.x, dy = point1.y - point0.y;
            return Math.abs(Math.sqrt(dx * dx + dy * dy));
        };
        MathUtil.getDistanceFast = function (point0, point1) {
            var dx = point1.x - point0.x, dy = point1.y - point0.y;
            return Math.abs(dx * dx + dy * dy);
        };
        MathUtil.getClosestPoint = function (value, points, minimumDistance) {
            if (minimumDistance === void 0) { minimumDistance = -1; }
            var prevDist = 99999999999;
            var point = null;
            if (minimumDistance > -1) {
                prevDist = minimumDistance;
            }
            for (var i = 0; i < points.length; i++) {
                if (minimumDistance == -1) {
                    var dist = MathUtil.getDistanceFast(value, points[i]);
                }
                else {
                    var dist = MathUtil.getDistance(value, points[i]);
                }
                if (dist < prevDist) {
                    prevDist = dist;
                    point = points[i];
                }
            }
            return point;
        };
        MathUtil.mod = function (n, m) {
            return ((n % m) + m) % m;
        };
        MathUtil.degreeToRadiansFactor = Math.PI / 180;
        MathUtil.radianToDegreesFactor = 180 / Math.PI;
        return MathUtil;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MathUtil;
});
