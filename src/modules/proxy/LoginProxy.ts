

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
            App.UI.runScene(Home);
            App.UI.setMenu(Menu);
            App.Init();
        });
    }
}