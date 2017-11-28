

class LoginProxy extends puremvc.Proxy {

    public static NAME:string = "LoginProxy";
    constructor(){
        super(LoginProxy.NAME);
    }

    request():void {
        network.request(PUser.getInfo(true))
        .then(()=>{
            GlobalAPI.UI.runScene(Home);
            GlobalAPI.UI.setMenu(Menu);
        });
    }
}