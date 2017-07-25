var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NoticeDefine = (function () {
    function NoticeDefine() {
    }
    return NoticeDefine;
}());
NoticeDefine.START_UP = "START_UP";
__reflect(NoticeDefine.prototype, "NoticeDefine");
