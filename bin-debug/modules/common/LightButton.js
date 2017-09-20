var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LightButton = (function (_super) {
    __extends(LightButton, _super);
    function LightButton() {
        return _super.call(this) || this;
        //因为皮肤被实例化的时候，相关的业务逻辑依赖并没有初始化完全，容易产生报错。
        //在这里调用playAnimation会报错，
    }
    LightButton.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        this.playAnimation();
    };
    LightButton.prototype.playAnimation = function () {
        var mcSX = this.width / 235;
        var mcSY = this.height / 108;
        BaseFactory.fast("lightbutton2_ske.dbmv", { container: this, onComplete: function () {
                console.log("添加动画成功!");
            } }, MovieType.DBFAST);
    };
    return LightButton;
}(BaseButton));
__reflect(LightButton.prototype, "LightButton");
