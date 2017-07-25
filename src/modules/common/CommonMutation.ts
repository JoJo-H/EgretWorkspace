
class CommomMutation extends puremvc.Mediator implements puremvc.IMediator{

    public static NAME:string = "CommomMutation";
    constructor(viewComponet?:any){
        super(CommomMutation.NAME,viewComponet);
    }

    listNotificationInterests():any[] {
        super.listNotificationInterests();
        return ["TEST"];
    }

    handleNotification(notification : puremvc.INotification) : void {
        super.handleNotification(notification);
			switch(notification.getName()){
                case "TEST" :
                console.log("测试测试测试通过!");
                break;
			}
    }
}