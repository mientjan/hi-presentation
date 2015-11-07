define(["require", "exports"], function (require, exports) {
    /**
     * AbstractBehaviour
     *
     * @namespace easelts.behavior
     * @method AbstractBehavior
     * @author Mient-jan Stelling <mientjan.stelling@gmail.com>
     */
    var AbstractBehavior = (function () {
        function AbstractBehavior() {
            /**
             * @property owner
             */
            this.owner = null;
        }
        /**
         * @method initialize
         * @param {DisplayObject} owner
         */
        AbstractBehavior.prototype.initialize = function (owner) {
            if (this.owner) {
                throw new Error('behavior already has a owner');
            }
            this.owner = owner;
        };
        AbstractBehavior.prototype.destruct = function () {
            this.owner = null;
        };
        return AbstractBehavior;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = AbstractBehavior;
});
