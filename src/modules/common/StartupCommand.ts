

class StartupCommmand extends puremvc.SimpleCommand implements puremvc.ICommand{

    execute(notification:puremvc.Notification):void {
        super.execute(notification);

        // 注册proxy
        // GlobalAPI.facede.registerProxy(new GoldProxy());



        // 注册mediator
        puremvc.Facade.getInstance().registerMediator(new CommomMutation());


        puremvc.Facade.getInstance().sendNotification("TEST");
    }
}
