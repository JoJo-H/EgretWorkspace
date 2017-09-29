
class CommomMediator extends puremvc.Mediator implements puremvc.IMediator{

    public static NAME:string = "CommomMutation";
    constructor(viewComponet?:any){
        super(CommomMediator.NAME,viewComponet);
    }

    listNotificationInterests():any[] {
        super.listNotificationInterests();
        return ["TEST",GameDefine.OPEN_GAMNES_PANEL,GameDefine.REMOVE_BOX];
    }

    handleNotification(notification : puremvc.INotification) : void {
        var data : any = notification.getBody();
        super.handleNotification(notification);
			switch(notification.getName()){
                case GameDefine.OPEN_GAMNES_PANEL :
                    GlobalAPI.UI.addBox(PanelGames);
                    break;
                case GameDefine.REMOVE_BOX :
                    this.removeBox(data);
                    break;
			}
    }

    private removeBox(data:any):void {
        if(!data || !data.host) return;
        GlobalAPI.UI.remove(data.host);
    }
}