var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameDefine = (function () {
    function GameDefine() {
    }
    return GameDefine;
}());
GameDefine.REMOVE_BOX = "REMOVE_BOX";
GameDefine.CLICK_BUTTON = "CLICK_BUTTON";
GameDefine.OPEN_GAMNES_PANEL = "OPEN_GAMNES_PANEL";
GameDefine.GAME_OPEN_2048 = "GAME_OPEN_2048";
GameDefine.GAME_OPEN_TURNTABLE = "GAME_OPEN_TURNTABLE";
GameDefine.GAME_OPEN_LAOHUJI = "GAME_OPEN_LAOHUJI";
GameDefine.GAME_OPEN_LUCK_DRAW = "GAME_OPEN_LUCK_DRAW";
__reflect(GameDefine.prototype, "GameDefine");
