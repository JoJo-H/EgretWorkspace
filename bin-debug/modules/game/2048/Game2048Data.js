var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game2048Data = (function (_super) {
    __extends(Game2048Data, _super);
    function Game2048Data() {
        var _this = _super.call(this) || this;
        _this.bestScore = 0;
        _this.curScore = 0;
        var value = localStorage.getItem("Game2048Data.bestScore") ? localStorage.getItem("Game2048Data.bestScore") : "0";
        _this.bestScore = parseInt(value);
        return _this;
    }
    Game2048Data.getInstance = function () {
        if (!this._instance) {
            this._instance = new Game2048Data();
        }
        return this._instance;
    };
    Object.defineProperty(Game2048Data.prototype, "desc", {
        get: function () {
            return "合并数字直到出现2048甚至更高";
        },
        enumerable: true,
        configurable: true
    });
    return Game2048Data;
}(egret.EventDispatcher));
__reflect(Game2048Data.prototype, "Game2048Data");
