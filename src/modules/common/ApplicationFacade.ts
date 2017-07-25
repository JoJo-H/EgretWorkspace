

class ApplicationFacade extends puremvc.Facade implements puremvc.IFacade{
    public static KEY : string = "ApplicationFacade";
    constructor(){
        super();
    }

    public static getInstance():ApplicationFacade {
        if(!this.instance) {
            this.instance = new ApplicationFacade();
        }
        return <ApplicationFacade>this.instance;
    }

    initializeController():void {
        super.initializeController();
        
        this.registerCommand(NoticeDefine.START_UP,StartupCommmand);
    }

    initializeModel():void {
        super.initializeModel();
    }

    initializeView():void {
        super.initializeView();
    }

    startup(stage:any):void {
        //发出消息  游戏的开始，从控制器执行命令StartupCommand
        this.sendNotification(NoticeDefine.START_UP,stage);
    }
}