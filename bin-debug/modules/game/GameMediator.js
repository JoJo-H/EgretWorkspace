var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameMutation = (function (_super) {
    __extends(GameMutation, _super);
    function GameMutation(viewComponet) {
        return _super.call(this, CommomMutation.NAME, viewComponet) || this;
    }
    GameMutation.prototype.listNotificationInterests = function () {
        _super.prototype.listNotificationInterests.call(this);
        return [GameDefine.OPEN_TURNTABLE];
    };
    GameMutation.prototype.handleNotification = function (notification) {
        _super.prototype.handleNotification.call(this, notification);
        switch (notification.getName()) {
            case GameDefine.OPEN_TURNTABLE:
                break;
        }
    };
    return GameMutation;
}(puremvc.Mediator));
GameMutation.NAME = "GameMutation";
__reflect(GameMutation.prototype, "GameMutation", ["puremvc.IMediator", "puremvc.INotifier"]);
