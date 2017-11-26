

class UserProxy extends puremvc.Proxy implements puremvc.IProxy {
    public static NAME:string = "UserProxy";
    constructor(){
        super(UserProxy.NAME);
    }

    private _data : UserData;
    getData():any {
        if(!this._data) {
            this._data = new UserData()
        }
        return this._data;
    }

    onRegister():void {
        super.onRegister();
    }

    onRemove():void {
        super.onRemove();
    }
}


class UserData extends egret.EventDispatcher{

    private _p : any;
    constructor(){
        super();
    }
    get p():any {
        return this._p;
    }

    
}