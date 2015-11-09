define(["require", "exports"], function (require, exports) {
    var QueueList = (function () {
        function QueueList() {
            this._list = [];
            this.current = null;
        }
        QueueList.prototype.add = function (item) {
            this._list.push(item);
            return this;
        };
        QueueList.prototype.next = function () {
            this.kill();
            if (this._list.length > 0) {
                this.current = this._list.shift();
            }
            else {
                this.current = null;
            }
            return this.current;
        };
        QueueList.prototype.end = function (all) {
            if (all === void 0) { all = false; }
            if (all) {
                this._list.length = 0;
            }
            if (this.current) {
                this.current.times = 1;
            }
            return this;
        };
        QueueList.prototype.kill = function (all) {
            if (all === void 0) { all = false; }
            if (all) {
                this._list.length = 0;
            }
            if (this.current) {
                this.current.finish();
                this.current.destruct();
            }
            return this;
        };
        return QueueList;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = QueueList;
});
