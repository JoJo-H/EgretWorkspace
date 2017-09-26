var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        var _this = _super.call(this) || this;
        _this.skinName = "HomeSkin";
        return _this;
    }
    Home.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        BaseFactory.playAnim({ container: this, actionName: "Walk", scaleX: 0.5, scaleY: 0.5, offsetX: 100, onComplete: function () {
                console.log("添加机器人Walk成功!");
            } }, "robot", "robot");
        BaseFactory.playAnim({ container: this, actionName: "Run", scaleX: 0.5, scaleY: 0.5, offsetX: -100, onComplete: function () {
                console.log("添加机器人Run成功!");
            } }, "robot", "robot");
        BaseFactory.playAnim({ playTimes: 2, container: this, actionName: "Standby", scaleX: 0.5, scaleY: 0.5, offsetY: -100, onComplete: function () {
                console.log("添加机器人Standby成功!");
            } }, "robot", "robot");
    };
    Home.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return Home;
}(BaseComponent));
__reflect(Home.prototype, "Home");
