

class LoginProxy extends puremvc.Proxy {

    public static NAME:string = "LoginProxy";
    constructor(){
        super(LoginProxy.NAME);
    }

    request():void {
        network.multiRequest(PUser.getInfo(true))
        .then(()=>{
            GlobalAPI.UI.runScene(Home);
            GlobalAPI.UI.setMenu(Menu);
            App.Init();
        });
    }
}