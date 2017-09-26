var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MovieEvent = (function (_super) {
    __extends(MovieEvent, _super);
    function MovieEvent(name, label) {
        if (label === void 0) { label = null; }
        var _this = _super.call(this, name) || this;
        _this._frameLabel = label;
        return _this;
    }
    Object.defineProperty(MovieEvent.prototype, "frameLabel", {
        get: function () {
            return this._frameLabel;
        },
        enumerable: true,
        configurable: true
    });
    return MovieEvent;
}(egret.Event));
MovieEvent.FRAME_LABEL = "Frame_Label";
MovieEvent.LOOP_COMPLETE = "Loop_Complete";
MovieEvent.COMPLETE = "Complete";
__reflect(MovieEvent.prototype, "MovieEvent");
