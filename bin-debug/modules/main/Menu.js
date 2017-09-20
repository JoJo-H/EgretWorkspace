var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super.call(this) || this;
        _this.skinName = "MenuSkin";
        return _this;
    }
    Menu.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        this.btn2048.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpen2048, this);
    };
    Menu.prototype.onOpen2048 = function (event) {
        GlobalAPI.UI.addBox(Game2048View);
    };
    Menu.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
        this.btn2048.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpen2048, this);
    };
    return Menu;
}(BaseComponent));
__reflect(Menu.prototype, "Menu");
