var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StartupCommmand = (function (_super) {
    __extends(StartupCommmand, _super);
    function StartupCommmand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartupCommmand.prototype.execute = function (notification) {
        _super.prototype.execute.call(this, notification);
        // 注册proxy
        // GlobalAPI.facede.registerProxy(new GoldProxy());
        // 注册mediator
        // GlobalAPI.facede.registerMediator(new CommomMutation());
        puremvc.Facade.getInstance().registerMediator(new CommomMutation());
        // GlobalAPI.facede.sendNotification("TEST");
        puremvc.Facade.getInstance().sendNotification("TEST");
    };
    return StartupCommmand;
}(puremvc.SimpleCommand));
__reflect(StartupCommmand.prototype, "StartupCommmand", ["puremvc.ICommand", "puremvc.INotifier"]);
