var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameTurntableView = (function (_super) {
    __extends(GameTurntableView, _super);
    function GameTurntableView() {
        var _this = _super.call(this) || this;
        _this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        _this._startTime = 0;
        _this._startAngle = 0;
        _this.skinName = "GameTurntableSkin";
        return _this;
    }
    GameTurntableView.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
    };
    GameTurntableView.prototype.onStart = function () {
        var index = Math.floor(Math.random() * this.items.length);
        var angle = index * (360 / this.items.length) + (360 / this.items.length / 2);
        this.stopRotate();
        this.rotate({
            angle: 0,
            animateTo: angle + 1800,
            duration: 8000,
            easing: function (x, t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b; },
            callback: function () {
                console.log(index);
            }
        });
    };
    GameTurntableView.prototype.rotate = function (obj) {
        this._angle = obj.angle;
        this._params = obj;
        if (this._angle == obj.animateTo) {
            this.doRotate(this._angle);
        }
        else {
            this.animateStart();
        }
    };
    GameTurntableView.prototype.animateStart = function () {
        this.stopRotate();
        this._startTime = +new Date;
        this._startAngle = this._angle;
        this.animate();
    };
    GameTurntableView.prototype.animate = function () {
        var _this = this;
        var actualTime = +new Date;
        var checkEnd = actualTime - this._startTime > this._params.duration;
        if (checkEnd) {
            this.stopRotate();
        }
        else {
            var angle = this._params.easing(0, actualTime - this._startTime, this._startAngle, this._params.animateTo - this._startAngle, this._params.duration);
            this.doRotate((~~(angle * 10) / 10));
            this._timeId = egret.setTimeout(function () {
                _this.animate();
            }, this, 10);
        }
        if (this._params.callback && checkEnd) {
            this._angle = this._params.animateTo;
            this.doRotate(this._angle);
            this._params.callback();
        }
    };
    GameTurntableView.prototype.doRotate = function (angle) {
        this._angle = angle;
        this.imgStart.rotation = angle;
    };
    GameTurntableView.prototype.stopRotate = function () {
        egret.clearTimeout(this._timeId);
    };
    GameTurntableView.prototype.onEixt = function () {
        _super.prototype.onExit.call(this);
        this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
    };
    return GameTurntableView;
}(BaseComponent));
__reflect(GameTurntableView.prototype, "GameTurntableView");
