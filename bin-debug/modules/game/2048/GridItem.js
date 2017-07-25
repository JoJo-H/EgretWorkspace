var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GridItem = (function () {
    function GridItem(num, rect) {
        this._num = num;
        this._rect = rect;
    }
    Object.defineProperty(GridItem.prototype, "rect", {
        get: function () {
            return this._rect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridItem.prototype, "num", {
        get: function () {
            return this._num;
        },
        enumerable: true,
        configurable: true
    });
    GridItem.prototype.moveTo = function (deltaX, deltaY, time, animateState) {
        animateState.increase();
        egret.Tween.get(this._rect).to({ x: deltaX, y: deltaY }, time).call(function () {
            animateState.descrese();
        });
    };
    GridItem.prototype.change = function (delay, numInfo, animateState) {
        var _this = this;
        animateState.increase();
        this._num = numInfo.num;
        egret.Tween.get(this._rect).wait(delay).call(function () {
            var label = _this._rect["label"];
            label.text = numInfo.num + "";
            label.size = numInfo.fontSize;
            label.textColor = numInfo.color;
            _this._rect.fillColor = numInfo.backgroundColor;
            animateState.descrese();
        });
    };
    GridItem.prototype.moveToAndFadeOut = function (deltaX, deltaY, time, animateState, callBack) {
        animateState.increase();
        egret.Tween.get(this._rect).to({ x: deltaX, y: deltaY, alpha: 0.3 }, time).call(function () {
            animateState.descrese();
            callBack();
            ;
        });
    };
    return GridItem;
}());
__reflect(GridItem.prototype, "GridItem");
