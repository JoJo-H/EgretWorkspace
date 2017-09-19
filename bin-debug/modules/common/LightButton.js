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
        var _this = _super.call(this) || this;
        _this.playAnimation();
        return _this;
    }
    LightButton.prototype.playAnimation = function () {
        var mcSX = this.width / 235;
        var mcSY = this.height / 108;
        var movie = BaseFactory.create("assets/animation/fast/lightbutton2_ske.dbmv", MovieType.DBFAST);
        movie.touchEnabled = false;
        this.addChild(movie);
    };
    return LightButton;
}(BaseButton));
__reflect(LightButton.prototype, "LightButton");
