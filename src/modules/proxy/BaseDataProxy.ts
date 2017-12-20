


class BaseDataProxy extends puremvc.Proxy implements puremvc.IProxy {
    public static NAME:string = "BaseDataProxy";
    constructor(name){
        super(name);
    }

    onRegister():void {
        super.onRegister();
    }

    onRemove():void {
        super.onRemove();
    }
}