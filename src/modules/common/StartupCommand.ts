

class StartupCommmand extends puremvc.SimpleCommand implements puremvc.ICommand{

    execute(notification:puremvc.Notification):void {
        super.execute(notification);

        // 注册proxy
        // GlobalAPI.facede.registerProxy(new GoldProxy());



        // 注册mediator
        // GlobalAPI.facede.registerMediator(new CommomMutation());
        puremvc.Facade.getInstance().registerMediator(new CommomMutation());


        // GlobalAPI.facede.sendNotification("TEST");
        puremvc.Facade.getInstance().sendNotification("TEST");
    }
}
