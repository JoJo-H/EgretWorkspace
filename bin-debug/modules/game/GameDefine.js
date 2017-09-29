var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameDefine = (function () {
    function GameDefine() {
    }
    return GameDefine;
}());
GameDefine.CLICK_BUTTON = "CLICK_BUTTON";
GameDefine.OPEN_TURNTABLE = "OPEN_TURNTABLE";
__reflect(GameDefine.prototype, "GameDefine");
