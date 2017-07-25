var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CommomMutation = (function (_super) {
    __extends(CommomMutation, _super);
    function CommomMutation(viewComponet) {
        return _super.call(this, CommomMutation.NAME, viewComponet) || this;
    }
    CommomMutation.prototype.listNotificationInterests = function () {
        _super.prototype.listNotificationInterests.call(this);
        return ["TEST"];
    };
    CommomMutation.prototype.handleNotification = function (notification) {
        _super.prototype.handleNotification.call(this, notification);
        switch (notification.getName()) {
            case "TEST":
                console.log("测试测试测试通过!");
                break;
        }
    };
    return CommomMutation;
}(puremvc.Mediator));
CommomMutation.NAME = "CommomMutation";
__reflect(CommomMutation.prototype, "CommomMutation", ["puremvc.IMediator", "puremvc.INotifier"]);
