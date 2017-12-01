

class StartupCommmand extends puremvc.SimpleCommand implements puremvc.ICommand{

    execute(notification:puremvc.Notification):void {
        super.execute(notification);
        Button.THROTTLE_TIME = 500;

        // 注册proxy
        let loginProxy = new LoginProxy();
        App.Facade.registerProxy(loginProxy);
        loginProxy.request();
        
        App.Facade.registerProxy(new UserProxy());



        // 注册mediator
        App.Facade.registerMediator(new ListenerMediator());
        App.Facade.registerMediator(new SocketMediator());
        App.Facade.registerMediator(new CommomMediator());
        App.Facade.registerMediator(new GameMediator());


        App.Facade.sendNotification("TEST");
    }
}
