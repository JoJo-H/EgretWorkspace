var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalAPI = (function () {
    function GlobalAPI() {
    }
    Object.defineProperty(GlobalAPI, "UI", {
        get: function () {
            if (!this._UI) {
                this._UI = new UI();
            }
            return this._UI;
        },
        enumerable: true,
        configurable: true
    });
    GlobalAPI.setStage = function (s) {
        this._stage = s;
    };
    Object.defineProperty(GlobalAPI, "stage", {
        get: function () {
            return this._stage;
        },
        enumerable: true,
        configurable: true
    });
    return GlobalAPI;
}());
__reflect(GlobalAPI.prototype, "GlobalAPI");
