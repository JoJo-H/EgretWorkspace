

class StartupCommmand extends puremvc.SimpleCommand implements puremvc.ICommand{

    execute(notification:puremvc.Notification):void {
        super.execute(notification);
        Button.THROTTLE_TIME = 500;

        // 注册proxy
        let loginProxy = new LoginProxy();
        GlobalAPI.facede.registerProxy(loginProxy);
        loginProxy.request();
        
        GlobalAPI.facede.registerProxy(new UserProxy());



        // 注册mediator
        puremvc.Facade.getInstance().registerMediator(new ListenerMediator());
        puremvc.Facade.getInstance().registerMediator(new CommomMediator());
        puremvc.Facade.getInstance().registerMediator(new GameMediator());


        puremvc.Facade.getInstance().sendNotification("TEST");
    }
}
