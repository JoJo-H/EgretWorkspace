var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game2048OverView = (function (_super) {
    __extends(Game2048OverView, _super);
    function Game2048OverView() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameOverSkin";
        return _this;
    }
    Game2048OverView.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        this.btnNewGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onONewGame, this);
    };
    Game2048OverView.prototype.onONewGame = function (event) {
        GlobalAPI.UI.remove(this);
    };
    Game2048OverView.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
        this.btnNewGame.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onONewGame, this);
    };
    return Game2048OverView;
}(BaseComponent));
__reflect(Game2048OverView.prototype, "Game2048OverView");
