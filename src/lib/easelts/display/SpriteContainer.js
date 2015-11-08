/*
 * SpriteContainer
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Container"], function (require, exports, Container_1) {
    var SpriteContainer = (function (_super) {
        __extends(SpriteContainer, _super);
        function SpriteContainer(spriteSheet) {
            _super.call(this);
            this.spriteSheet = null;
            this.spriteSheet = spriteSheet;
        }
        SpriteContainer.prototype.addChild = function (child) {
            if (child == null) {
                return child;
            }
            if (arguments.length > 1) {
                return this.addChildAt.apply(this, Array.prototype.slice.call(arguments).concat([this.children.length]));
            }
            else {
                return this.addChildAt(child, this.children.length);
            }
        };
        SpriteContainer.prototype.addChildAt = function (child, index) {
            var l = arguments.length;
            var indx = arguments[l - 1];
            if (indx < 0 || indx > this.children.length) {
                return arguments[l - 2];
            }
            if (l > 2) {
                for (var i = 0; i < l - 1; i++) {
                    this.addChildAt(arguments[i], indx + i);
                }
                return arguments[l - 2];
            }
            if (child['_spritestage_compatibility'] >= 1) {
            }
            else {
                console && console.log("Error: You can only add children of type SpriteContainer, Sprite, BitmapText, or DOMElement [" + child.toString() + "]");
                return child;
            }
            if (child['_spritestage_compatibility'] <= 4) {
                var spriteSheet = child.spriteSheet;
                if ((!spriteSheet || !spriteSheet._images || spriteSheet._images.length > 1) || (this.spriteSheet && this.spriteSheet !== spriteSheet)) {
                    console && console.log("Error: A child's spriteSheet must be equal to its parent spriteSheet and only use one image. [" + child.toString() + "]");
                    return child;
                }
                this.spriteSheet = spriteSheet;
            }
            if (child.parent) {
                child.parent.removeChild(child);
            }
            child.parent = this;
            this.children.splice(index, 0, child);
            return child;
        };
        SpriteContainer.prototype.toString = function () {
            return "[SpriteContainer (name=" + this.name + ")]";
        };
        return SpriteContainer;
    })(Container_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = SpriteContainer;
});
