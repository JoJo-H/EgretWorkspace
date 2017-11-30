class GameMediator extends puremvc.Mediator implements puremvc.IMediator{
    
        public static NAME:string = "GameMutation";
        constructor(viewComponet?:any){
            super(GameMediator.NAME,viewComponet);
        }
    
        listNotificationInterests():any[] {
            super.listNotificationInterests();
            return [  GameDefine.GAME_OPEN_2048,GameDefine.GAME_OPEN_TURNTABLE
            ];
        }
    
        handleNotification(notification : puremvc.INotification) : void {
            super.handleNotification(notification);
                switch(notification.getName()){
                    case GameDefine.GAME_OPEN_2048 :
                        GlobalAPI.UI.addBox(Game2048View);
                        App.SoundManager.playEffect('beiji_wav');
                        break;
                    case GameDefine.GAME_OPEN_TURNTABLE :
                        GlobalAPI.UI.addBox(GameTurntableView);
                        App.SoundManager.playEffect('bossAttack_mp3');
                        break;
                }
        }
    }