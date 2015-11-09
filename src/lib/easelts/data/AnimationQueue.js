var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./QueueList"], function (require, exports, QueueList_1) {
    var AnimationQueue = (function (_super) {
        __extends(AnimationQueue, _super);
        function AnimationQueue(fps) {
            _super.call(this);
            this._time = 0;
            this.frame = 0;
            this._fpms = 0;
            this._fpms = 1000 / fps;
        }
        AnimationQueue.prototype.onTick = function (delta) {
            this._time += delta;
            if (this.current != null || this.next() != null) {
                var times = this.current.times;
                var from = this.current.from;
                var to = this.current.to;
                var duration = this.current.duration;
                var frame = (duration * this._time / (duration * this._fpms));
                this.frame = from + (frame % duration);
                if (times > -1 && times - (frame / duration) < 0) {
                    this.next();
                }
            }
        };
        AnimationQueue.prototype.next = function () {
            this._time = this._time % this._fpms;
            return _super.prototype.next.call(this);
        };
        AnimationQueue.prototype.getFrame = function () {
            return this.frame | 0;
        };
        return AnimationQueue;
    })(QueueList_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = AnimationQueue;
});
