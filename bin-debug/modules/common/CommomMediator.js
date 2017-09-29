var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CommomMediator = (function (_super) {
    __extends(CommomMediator, _super);
    function CommomMediator(viewComponet) {
        return _super.call(this, CommomMediator.NAME, viewComponet) || this;
    }
    CommomMediator.prototype.listNotificationInterests = function () {
        _super.prototype.listNotificationInterests.call(this);
        return ["TEST", GameDefine.OPEN_GAMNES_PANEL, GameDefine.REMOVE_BOX];
    };
    CommomMediator.prototype.handleNotification = function (notification) {
        var data = notification.getBody();
        _super.prototype.handleNotification.call(this, notification);
        switch (notification.getName()) {
            case GameDefine.OPEN_GAMNES_PANEL:
                GlobalAPI.UI.addBox(PanelGames);
                break;
            case GameDefine.REMOVE_BOX:
                this.removeBox(data);
                break;
        }
    };
    CommomMediator.prototype.removeBox = function (data) {
        if (!data || !data.host)
            return;
        GlobalAPI.UI.remove(data.host);
    };
    return CommomMediator;
}(puremvc.Mediator));
CommomMediator.NAME = "CommomMutation";
__reflect(CommomMediator.prototype, "CommomMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
