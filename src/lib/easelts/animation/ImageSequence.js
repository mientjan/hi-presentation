var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../display/DisplayObject", "../../createts/util/Promise", "./QueueList", "../data/Queue"], function (require, exports, DisplayObject_1, Promise_1, QueueList_1, Queue_1) {
    var ImageSequence = (function (_super) {
        __extends(ImageSequence, _super);
        function ImageSequence(spriteSheet, fps, width, height, x, y, regX, regY) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            _super.call(this, width, height, x, y, regX, regY);
            this.type = 8;
            this._queueList = new QueueList_1.default();
            this.time = 0;
            this.timeDuration = 0;
            this.frames = 0;
            this.paused = true;
            this.spriteSheet = null;
            this.frameTime = 0;
            this.currentFrame = 0;
            this.isLoaded = false;
            this.spriteSheet = spriteSheet;
            this.fps = fps;
        }
        ImageSequence.prototype.parseLoad = function () {
            var animations = this.spriteSheet.getAnimations();
            if (animations.length > 1) {
                throw new Error('SpriteSheet not compatible with ImageSequence, has multiple animations. Only supports one');
            }
            this.frames = this.spriteSheet.getNumFrames();
            this.frameTime = 1000 / this.fps;
            this.timeDuration = this.frames * this.frameTime;
        };
        ImageSequence.prototype.load = function (onProgress) {
            var _this = this;
            if (this.isLoaded) {
                if (onProgress)
                    onProgress(1);
                return new Promise_1.default(function (resolve, reject) {
                    resolve(_this);
                });
            }
            return this.spriteSheet.load(onProgress).then(function (spriteSheet) {
                _this.isLoaded = true;
                _this.parseLoad();
                return _this;
            }).catch(function () {
                throw new Error('could not load library');
            });
        };
        ImageSequence.prototype.draw = function (ctx, ignoreCache) {
            var frame = this.currentFrame;
            var width = this.width;
            var height = this.height;
            if (this.currentFrame > -1 && this.isLoaded) {
                var frameObject = this.spriteSheet.getFrame(frame);
                if (!frameObject) {
                    return false;
                }
                var rect = frameObject.rect;
                if (rect.width && rect.height) {
                    ctx.drawImage(frameObject.image, rect.x, rect.y, rect.width, rect.height, 0, 0, width, height);
                }
            }
            return true;
        };
        ImageSequence.prototype.play = function (times, label, complete) {
            if (times === void 0) { times = 1; }
            if (label === void 0) { label = null; }
            if (this.spriteSheet.isLoaded && !this.isLoaded) {
                this.isLoaded = true;
                this.parseLoad();
            }
            this.visible = true;
            if (label instanceof Array) {
                if (label.length == 1) {
                    var queue = new Queue_1.default(null, label[0], this.getTotalFrames(), times, 0);
                }
                else {
                    var queue = new Queue_1.default(null, label[0], label[1], times, 0);
                }
            }
            else if (label == null) {
                var queue = new Queue_1.default(null, 0, this.getTotalFrames(), times, 0);
            }
            if (complete) {
                queue.then(complete);
            }
            this._queueList.add(queue);
            if (!this._queueList.current) {
                this._queueList.next();
            }
            this.paused = false;
            return this;
        };
        ImageSequence.prototype.resume = function () {
            this.paused = false;
            return this;
        };
        ImageSequence.prototype.pause = function () {
            this.paused = true;
            return this;
        };
        ImageSequence.prototype.end = function (all) {
            if (all === void 0) { all = false; }
            this._queueList.end(all);
            return this;
        };
        ImageSequence.prototype.stop = function () {
            this.paused = true;
            this._queueList.kill();
            return this;
        };
        ImageSequence.prototype.next = function () {
            this.time = this.time & this.frameTime;
            return this._queueList.next();
        };
        ImageSequence.prototype.onTick = function (delta) {
            _super.prototype.onTick.call(this, delta);
            if (this.paused == false) {
                this.time += delta;
                var label = this._queueList.current;
                var toFrame = this.currentFrame;
                if (label) {
                    toFrame = this.frames * this.time / this.timeDuration;
                    if (label.times != -1) {
                        if (label.times - Math.ceil(toFrame / (label.to - label.from)) < 0) {
                            if (!this.next()) {
                                this.stop();
                                return;
                            }
                        }
                    }
                    toFrame = label.from + (toFrame % (label.to - label.from));
                }
                this.currentFrame = toFrame | 0;
            }
        };
        ImageSequence.prototype.getTotalFrames = function () {
            return this.frames;
        };
        return ImageSequence;
    })(DisplayObject_1.default);
    exports.default = ImageSequence;
});
