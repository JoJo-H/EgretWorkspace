var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super.call(this) || this;
        _this.touchChildren = false;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onEnter, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onExit, _this);
        return _this;
    }
    Button.prototype.onExit = function () {
    };
    Button.prototype.onEnter = function () {
    };
    Button.prototype.onTouchBegin = function (event) {
    };
    return Button;
}(eui.Component));
__reflect(Button.prototype, "Button");
