

class LoginProxy extends puremvc.Proxy {

    public static NAME:string = "LoginProxy";
    constructor(){
        super(LoginProxy.NAME);
    }

    request():void {
        //全局配置数据
        App.GlobalData = Config.get('global_json');
        
        network.multiRequest(PUser.getInfo(true))
        .then(()=>{
            GlobalAPI.UI.runScene(Home);
            GlobalAPI.UI.setMenu(Menu);
            App.Init();
        });
    }
}