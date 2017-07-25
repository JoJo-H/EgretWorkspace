var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ApplicationFacade = (function (_super) {
    __extends(ApplicationFacade, _super);
    function ApplicationFacade() {
        return _super.call(this) || this;
    }
    ApplicationFacade.getInstance = function () {
        if (!this.instance) {
            this.instance = new ApplicationFacade();
        }
        return this.instance;
    };
    ApplicationFacade.prototype.initializeController = function () {
        _super.prototype.initializeController.call(this);
        this.registerCommand(NoticeDefine.START_UP, StartupCommmand);
    };
    ApplicationFacade.prototype.initializeModel = function () {
        _super.prototype.initializeModel.call(this);
    };
    ApplicationFacade.prototype.initializeView = function () {
        _super.prototype.initializeView.call(this);
    };
    ApplicationFacade.prototype.startup = function (stage) {
        //发出消息  游戏的开始，从控制器执行命令StartupCommand
        this.sendNotification(NoticeDefine.START_UP, stage);
    };
    return ApplicationFacade;
}(puremvc.Facade));
ApplicationFacade.KEY = "ApplicationFacade";
__reflect(ApplicationFacade.prototype, "ApplicationFacade", ["puremvc.IFacade", "puremvc.INotifier"]);
