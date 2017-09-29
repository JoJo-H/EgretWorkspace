

class StartupCommmand extends puremvc.SimpleCommand implements puremvc.ICommand{

    execute(notification:puremvc.Notification):void {
        super.execute(notification);
        Button.THROTTLE_TIME = 500;

        // 注册proxy
        // GlobalAPI.facede.registerProxy(new GoldProxy());



        // 注册mediator
        puremvc.Facade.getInstance().registerMediator(new CommomMediator());
        puremvc.Facade.getInstance().registerMediator(new GameMediator());


        puremvc.Facade.getInstance().sendNotification("TEST");
    }
}
