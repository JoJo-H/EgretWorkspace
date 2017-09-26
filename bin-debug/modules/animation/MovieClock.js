var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MovieClock = (function () {
    function MovieClock() {
        this._lastTime = 0;
    }
    MovieClock.prototype.start = function () {
        this._lastTime = egret.getTimer();
        egret.startTick(this.tick, this);
    };
    MovieClock.prototype.tick = function (time) {
        var gap = time - this._lastTime;
        this._lastTime = time;
        dragonBones.WorldClock.clock.advanceTime(gap / 1000);
        return false;
    };
    MovieClock.prototype.stop = function () {
        egret.stopTick(this.tick, this);
    };
    return MovieClock;
}());
__reflect(MovieClock.prototype, "MovieClock");
