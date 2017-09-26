var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SequnceMovie = (function (_super) {
    __extends(SequnceMovie, _super);
    function SequnceMovie() {
        var _this = _super.call(this) || this;
        _this._curIndex = 0;
        _this.isCache = false;
        _this._atLast = false;
        _this._frameRate = 0;
        _this._frameIntervalTime = 0;
        _this.frameRate = 24;
        return _this;
    }
    SequnceMovie.prototype.setPath = function (template) {
        this._template = template;
        this.$renderNode = new egret.sys.BitmapNode();
    };
    SequnceMovie.prototype.gotoAndStop = function (name, frame) {
        throw new Error("未实现");
    };
    SequnceMovie.prototype.gotoAndPlay = function (name, frame, playTimes) {
        if (playTimes === void 0) { playTimes = 0; }
        throw new Error("未实现");
    };
    Object.defineProperty(SequnceMovie.prototype, "atLast", {
        get: function () {
            return this._atLast;
        },
        set: function (val) {
            this._atLast = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SequnceMovie.prototype, "frameRate", {
        get: function () {
            return this._frameRate;
        },
        set: function (val) {
            this._frameRate = val;
            this._frameIntervalTime = 1000 / val;
        },
        enumerable: true,
        configurable: true
    });
    SequnceMovie.prototype.play = function (name, playTimes) {
        if (playTimes === void 0) { playTimes = 0; }
    };
    SequnceMovie.prototype.dispose = function () {
    };
    return SequnceMovie;
}(egret.DisplayObjectContainer));
__reflect(SequnceMovie.prototype, "SequnceMovie", ["IMovie", "egret.DisplayObject"]);
