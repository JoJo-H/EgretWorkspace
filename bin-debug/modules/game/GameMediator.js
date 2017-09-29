var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameMediator = (function (_super) {
    __extends(GameMediator, _super);
    function GameMediator(viewComponet) {
        return _super.call(this, GameMediator.NAME, viewComponet) || this;
    }
    GameMediator.prototype.listNotificationInterests = function () {
        _super.prototype.listNotificationInterests.call(this);
        return [GameDefine.GAME_OPEN_2048, GameDefine.GAME_OPEN_TURNTABLE
        ];
    };
    GameMediator.prototype.handleNotification = function (notification) {
        _super.prototype.handleNotification.call(this, notification);
        switch (notification.getName()) {
            case GameDefine.GAME_OPEN_2048:
                GlobalAPI.UI.addBox(Game2048View);
                break;
            case GameDefine.GAME_OPEN_TURNTABLE:
                GlobalAPI.UI.addBox(GameTurntableView);
                break;
        }
    };
    return GameMediator;
}(puremvc.Mediator));
GameMediator.NAME = "GameMutation";
__reflect(GameMediator.prototype, "GameMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
