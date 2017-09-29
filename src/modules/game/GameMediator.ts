class GameMutation extends puremvc.Mediator implements puremvc.IMediator{
    
        public static NAME:string = "GameMutation";
        constructor(viewComponet?:any){
            super(CommomMutation.NAME,viewComponet);
        }
    
        listNotificationInterests():any[] {
            super.listNotificationInterests();
            return [GameDefine.OPEN_TURNTABLE];
        }
    
        handleNotification(notification : puremvc.INotification) : void {
            super.handleNotification(notification);
                switch(notification.getName()){
                    case GameDefine.OPEN_TURNTABLE :
                    break;
                }
        }
    }