/// <reference path="../display/DisplayObject.ts" />
define(["require", "exports", "./Point"], function (require, exports, Point_1) {
    /**
     * Represents an affine transformation matrix, and provides tools for constructing and concatenating matrixes.
     * @class Matrix2D
     * @param {Number} [a=1] Specifies the a property for the new matrix.
     * @param {Number} [b=0] Specifies the b property for the new matrix.
     * @param {Number} [c=0] Specifies the c property for the new matrix.
     * @param {Number} [d=1] Specifies the d property for the new matrix.
     * @param {Number} [tx=0] Specifies the tx property for the new matrix.
     * @param {Number} [ty=0] Specifies the ty property for the new matrix.
     * @constructor
     **/
    var Matrix2 = (function () {
        // constructor:
        /**
         * @constructor
         * @param {Number} [a=1] Specifies the a property for the new matrix.
         * @param {Number} [b=0] Specifies the b property for the new matrix.
         * @param {Number} [c=0] Specifies the c property for the new matrix.
         * @param {Number} [d=1] Specifies the d property for the new matrix.
         * @param {Number} [tx=0] Specifies the tx property for the new matrix.
         * @param {Number} [ty=0] Specifies the ty property for the new matrix.
         */
        function Matrix2(a, b, c, d, tx, ty) {
            // public properties:
            /**
             * Position (0, 0) in a 3x3 affine transformation matrix.
             * @property a
             * @type Number
             **/
            this.a = 1;
            /**
             * Position (0, 1) in a 3x3 affine transformation matrix.
             * @property b
             * @type Number
             **/
            this.b = 0;
            /**
             * Position (1, 0) in a 3x3 affine transformation matrix.
             * @property c
             * @type Number
             **/
            this.c = 0;
            /**
             * Position (1, 1) in a 3x3 affine transformation matrix.
             * @property d
             * @type Number
             **/
            this.d = 1;
            /**
             * Position (2, 0) in a 3x3 affine transformation matrix.
             * @property tx
             * @type Number
             **/
            this.tx = 0;
            /**
             * Position (2, 1) in a 3x3 affine transformation matrix.
             * @property ty
             * @type Number
             **/
            this.ty = 0;
            /**
             * Property representing the alpha that will be applied to a display object. This is not part of matrix
             * operations, but is used for operations like getConcatenatedMatrix to provide concatenated alpha values.
             * @property alpha
             * @type Number
             **/
            this.alpha = 1;
            /**
             * Property representing the shadow that will be applied to a display object. This is not part of matrix
             * operations, but is used for operations like getConcatenatedMatrix to provide concatenated shadow values.
             * @property shadow
             * @type Shadow
             **/
            this.shadow = null;
            /**
             * Property representing the compositeOperation that will be applied to a display object. This is not part of
             * matrix operations, but is used for operations like getConcatenatedMatrix to provide concatenated
             * compositeOperation values. You can find a list of valid composite operations at:
             * <a href="https://developer.mozilla.org/en/Canvas_tutorial/Compositing">https://developer.mozilla.org/en/Canvas_tutorial/Compositing</a>
             * @property compositeOperation
             * @type String
             **/
            this.compositeOperation = null;
            /**
             * Property representing the value for visible that will be applied to a display object. This is not part of matrix
             * operations, but is used for operations like getConcatenatedMatrix to provide concatenated visible values.
             * @property visible
             * @type Boolean
             **/
            this.visible = true;
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
        Matrix2.prototype._initialize = function (a, b, c, d, tx, ty) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        };
        /**
         * Concatenates the specified matrix properties with this matrix. All parameters are required.
         * @method prepend
         * @param {Number} a
         * @param {Number} b
         * @param {Number} c
         * @param {Number} d
         * @param {Number} tx
         * @param {Number} ty
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         **/
        Matrix2.prototype.prepend = function (a, b, c, d, tx, ty) {
            var tx1 = this.tx;
            if (a != 1 || b != 0 || c != 0 || d != 1) {
                var a1 = this.a;
                var c1 = this.c;
                this.a = a1 * a + this.b * c;
                this.b = a1 * b + this.b * d;
                this.c = c1 * a + this.d * c;
                this.d = c1 * b + this.d * d;
            }
            this.tx = tx1 * a + this.ty * c + tx;
            this.ty = tx1 * b + this.ty * d + ty;
            return this;
        };
        /**
         * Appends the specified matrix properties with this matrix. All parameters are required.
         * @method append
         * @param {Number} a
         * @param {Number} b
         * @param {Number} c
         * @param {Number} d
         * @param {Number} tx
         * @param {Number} ty
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         **/
        Matrix2.prototype.append = function (a, b, c, d, tx, ty) {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            this.a = a * a1 + b * c1;
            this.b = a * b1 + b * d1;
            this.c = c * a1 + d * c1;
            this.d = c * b1 + d * d1;
            this.tx = tx * a1 + ty * c1 + this.tx;
            this.ty = tx * b1 + ty * d1 + this.ty;
            return this;
        };
        /**
         * Prepends the specified matrix with this matrix.
         * @method prependMatrix
         * @param {Matrix2D} matrix
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         **/
        Matrix2.prototype.prependMatrix = function (matrix) {
            this.prepend(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            this.prependProperties(matrix.alpha, matrix.shadow, matrix.compositeOperation, matrix.visible);
            return this;
        };
        /**
         * Appends the specified matrix with this matrix.
         * @method appendMatrix
         * @param {Matrix2D} matrix
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         **/
        Matrix2.prototype.appendMatrix = function (matrix) {
            this.append(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            this.appendProperties(matrix.alpha, matrix.shadow, matrix.compositeOperation, matrix.visible);
            return this;
        };
        /**
         * Generates matrix properties from the specified display object transform properties, and prepends them with this matrix.
         * For example, you can use this to generate a matrix from a display object: var mtx = new Matrix2D();
         * mtx.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
         * @method prependTransform
         * @param {Number} x
         * @param {Number} y
         * @param {Number} scaleX
         * @param {Number} scaleY
         * @param {Number} rotation
         * @param {Number} skewX
         * @param {Number} skewY
         * @param {Number} regX Optional.
         * @param {Number} regY Optional.
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         **/
        Matrix2.prototype.prependTransform = function (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
            if (rotation % 360) {
                var r = rotation * Matrix2.DEG_TO_RAD;
                var cos = Math.cos(r);
                var sin = Math.sin(r);
            }
            else {
                cos = 1;
                sin = 0;
            }
            if (regX || regY) {
                // append the registration offset:
                this.tx -= regX;
                this.ty -= regY;
            }
            if (skewX || skewY) {
                // TODO: can this be combined into a single prepend operation?
                skewX *= Matrix2.DEG_TO_RAD;
                skewY *= Matrix2.DEG_TO_RAD;
                this.prepend(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
                this.prepend(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
            }
            else {
                this.prepend(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
            }
            return this;
        };
        /**
         * Generates matrix properties from the specified display object transform properties, and appends them with this matrix.
         * For example, you can use this to generate a matrix from a display object: var mtx = new Matrix2D();
         * mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
         * @method appendTransform
         * @param {Number} x
         * @param {Number} y
         * @param {Number} scaleX
         * @param {Number} scaleY
         * @param {Number} rotation
         * @param {Number} skewX
         * @param {Number} skewY
         * @param {Number} regX Optional.
         * @param {Number} regY Optional.
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         **/
        Matrix2.prototype.appendTransform = function (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
            if (rotation % 360) {
                var r = rotation * Matrix2.DEG_TO_RAD;
                var cos = Math.cos(r);
                var sin = Math.sin(r);
            }
            else {
                cos = 1;
                sin = 0;
            }
            if (skewX || skewY) {
                // TODO: can this be combined into a single append?
                skewX *= Matrix2.DEG_TO_RAD;
                skewY *= Matrix2.DEG_TO_RAD;
                this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
                this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
            }
            else {
                this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
            }
            if (regX || regY) {
                // prepend the registration offset:
                this.tx -= regX * this.a + regY * this.c;
                this.ty -= regX * this.b + regY * this.d;
            }
            return this;
        };
        /**
         * Applies a rotation transformation to the matrix.
         * @method rotate
         * @param {Number} angle The angle in radians. To use degrees, multiply by <code>Math.PI/180</code>.
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         **/
        Matrix2.prototype.rotate = function (angle) {
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            var a1 = this.a;
            var c1 = this.c;
            var tx1 = this.tx;
            this.a = a1 * cos - this.b * sin;
            this.b = a1 * sin + this.b * cos;
            this.c = c1 * cos - this.d * sin;
            this.d = c1 * sin + this.d * cos;
            this.tx = tx1 * cos - this.ty * sin;
            this.ty = tx1 * sin + this.ty * cos;
            return this;
        };
        /**
         * Applies a skew transformation to the matrix.
         * @method skew
         * @param {Number} skewX The amount to skew horizontally in degrees.
         * @param {Number} skewY The amount to skew vertically in degrees.
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         */
        Matrix2.prototype.skew = function (skewX, skewY) {
            skewX = skewX * Matrix2.DEG_TO_RAD;
            skewY = skewY * Matrix2.DEG_TO_RAD;
            this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), 0, 0);
            return this;
        };
        /**
         * Applies a scale transformation to the matrix.
         * @method scale
         * @param {Number} x The amount to scale horizontally
         * @param {Number} y The amount to scale vertically
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         **/
        Matrix2.prototype.scale = function (x, y) {
            this.a *= x;
            this.d *= y;
            this.c *= x;
            this.b *= y;
            this.tx *= x;
            this.ty *= y;
            return this;
        };
        /**
         * Translates the matrix on the x and y axes.
         * @method translate
         * @param {Number} x
         * @param {Number} y
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         **/
        Matrix2.prototype.translate = function (x, y) {
            this.tx += x;
            this.ty += y;
            return this;
        };
        /**
         * Sets the properties of the matrix to those of an identity matrix (one that applies a null transformation).
         * @method identity
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         **/
        Matrix2.prototype.identity = function () {
            this.alpha = this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
            this.shadow = this.compositeOperation = null;
            this.visible = true;
            return this;
        };
        /**
         * Inverts the matrix, causing it to perform the opposite transformation.
         * @method invert
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         **/
        Matrix2.prototype.invert = function () {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            var tx1 = this.tx;
            var n = a1 * d1 - b1 * c1;
            this.a = d1 / n;
            this.b = -b1 / n;
            this.c = -c1 / n;
            this.d = a1 / n;
            this.tx = (c1 * this.ty - d1 * tx1) / n;
            this.ty = -(a1 * this.ty - b1 * tx1) / n;
            return this;
        };
        /**
         * Returns true if the matrix is an identity matrix.
         * @method isIdentity
         * @return {Boolean}
         **/
        Matrix2.prototype.isIdentity = function () {
            return this.tx == 0 && this.ty == 0 && this.a == 1 && this.b == 0 && this.c == 0 && this.d == 1;
        };
        /**
         * Transforms a point according to this matrix.
         * @method transformPoint
         * @param {Number} x The x component of the point to transform.
         * @param {Number} y The y component of the point to transform.
         * @param {Point | Object} [pt] An object to copy the result into. If omitted a generic object with x/y properties will be returned.
         * @return {Point} This matrix. Useful for chaining method calls.
         **/
        Matrix2.prototype.transformPoint = function (x, y, pt) {
            if (pt === void 0) { pt = new Point_1.default(0, 0); }
            pt.x = x * this.a + y * this.c + this.tx;
            pt.y = x * this.b + y * this.d + this.ty;
            return pt;
        };
        /**
         * Decomposes the matrix into transform properties (x, y, scaleX, scaleY, and rotation). Note that this these values
         * may not match the transform properties you used to generate the matrix, though they will produce the same visual
         * results.
         * @method decompose
         * @param {Object} target The object to apply the transform properties to. If null, then a new object will be returned.
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         */
        Matrix2.prototype.decompose = function (target) {
            // TODO: it would be nice to be able to solve for whether the matrix can be decomposed into only scale/rotation
            // even when scale is negative
            if (target == null) {
                target = {};
            }
            target.x = this.tx;
            target.y = this.ty;
            // @todo make with less overhead.
            target.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
            target.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
            var skewX = Math.atan2(-this.c, this.d);
            var skewY = Math.atan2(this.b, this.a);
            if (skewX == skewY) {
                target.rotation = skewY / Matrix2.DEG_TO_RAD;
                if (this.a < 0 && this.d >= 0) {
                    target.rotation += (target.rotation <= 0) ? 180 : -180;
                }
                target.skewX = target.skewY = 0;
            }
            else {
                target.skewX = skewX / Matrix2.DEG_TO_RAD;
                target.skewY = skewY / Matrix2.DEG_TO_RAD;
            }
            return target;
        };
        /**
         * Reinitializes all matrix properties to those specified.
         * @method reinitialize
         * @param {Number} [a=1] Specifies the a property for the new matrix.
         * @param {Number} [b=0] Specifies the b property for the new matrix.
         * @param {Number} [c=0] Specifies the c property for the new matrix.
         * @param {Number} [d=1] Specifies the d property for the new matrix.
         * @param {Number} [tx=0] Specifies the tx property for the new matrix.
         * @param {Number} [ty=0] Specifies the ty property for the new matrix.
         * @param {Number} [alpha=1] desired alpha value
         * @param {Shadow} [shadow=null] desired shadow value
         * @param {String} [compositeOperation=null] desired composite operation value
         * @param {Boolean} [visible=true] desired visible value
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         */
        Matrix2.prototype.reinitialize = function (a, b, c, d, tx, ty, alpha, shadow, compositeOperation, visible) {
            this._initialize(a, b, c, d, tx, ty);
            this.alpha = alpha == null ? 1 : alpha;
            this.shadow = shadow;
            this.compositeOperation = compositeOperation;
            this.visible = visible == null ? true : visible;
            return this;
        };
        /**
         * Copies all properties from the specified matrix to this matrix.
         * @method copy
         * @param {Matrix2D} matrix The matrix to copy properties from.
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         */
        Matrix2.prototype.copy = function (matrix) {
            return this.reinitialize(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty, matrix.alpha, matrix.shadow, matrix.compositeOperation, matrix.visible);
        };
        /**
         * Appends the specified visual properties to the current matrix.
         * @method appendProperties
         * @param {Number} alpha desired alpha value
         * @param {Shadow} shadow desired shadow value
         * @param {String} compositeOperation desired composite operation value
         * @param {Boolean} visible desired visible value
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         */
        Matrix2.prototype.appendProperties = function (alpha, shadow, compositeOperation, visible) {
            this.alpha *= alpha;
            this.shadow = shadow || this.shadow;
            this.compositeOperation = compositeOperation || this.compositeOperation;
            this.visible = this.visible && visible;
            return this;
        };
        /**
         * Prepends the specified visual properties to the current matrix.
         * @method prependProperties
         * @param {Number} alpha desired alpha value
         * @param {Shadow} shadow desired shadow value
         * @param {String} compositeOperation desired composite operation value
         * @param {Boolean} visible desired visible value
         * @return {Matrix2D} This matrix. Useful for chaining method calls.
         */
        Matrix2.prototype.prependProperties = function (alpha, shadow, compositeOperation, visible) {
            this.alpha *= alpha;
            this.shadow = this.shadow || shadow;
            this.compositeOperation = this.compositeOperation || compositeOperation;
            this.visible = this.visible && visible;
            return this;
        };
        /**
         * Returns a clone of the Matrix2D instance.
         * @method clone
         * @return {Matrix2D} a clone of the Matrix2D instance.
         **/
        Matrix2.prototype.clone = function () {
            var m = new Matrix2(this.a, this.b, this.c, this.d, this.tx, this.ty);
            m.alpha = this.alpha;
            m.shadow = this.shadow;
            m.compositeOperation = this.compositeOperation;
            m.visible = this.visible;
            return m;
        };
        /**
         * Returns a string representation of this object.
         * @method toString
         * @return {String} a string representation of the instance.
         **/
        Matrix2.prototype.toString = function () {
            return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]";
        };
        /**
         * An identity matrix, representing a null transformation.
         * @property identity
         * @static
         * @type Matrix2D
         * @readonly
         **/
        Matrix2.identity = null; // set at bottom of class definition.
        /**
         * Multiplier for converting degrees to radians. Used internally by Matrix2D.
         * @property DEG_TO_RAD
         * @static
         * @final
         * @type Number
         * @readonly
         **/
        Matrix2.DEG_TO_RAD = Math.PI / 180;
        return Matrix2;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Matrix2;
});
