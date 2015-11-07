define(["require", "exports"], function (require, exports) {
    var Flag = (function () {
        function Flag() {
            this.value = 0;
        }
        Flag.prototype.isPowerOfTwo = function (n) {
            return n !== 0 && (n & (n - 1)) === 0;
        };
        Flag.prototype.contains = function (val) {
            var n = val;
            return (this.value & val) === val;
        };
        Flag.prototype.add = function (val) {
            this.value |= val;
            return this.contains(val);
        };
        Flag.prototype.remove = function (val) {
            this.value = (this.value ^ val) & this.value;
            return !this.contains(val);
        };
        Flag.prototype.intersect = function (val) {
            var final = 0;
            for (var i = 1; i < max; i = (i << 1)) {
                if ((this.value & i) !== 0 && (val & i) !== 0) {
                    final += i;
                }
            }
            return final;
        };
        Flag.prototype.equals = function (val) {
            return this.value === (val + 0);
        };
        Flag.prototype.valueOf = function () {
            return this.value;
        };
        return Flag;
    })();
});
