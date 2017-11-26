

class SeverEventDispatcher extends egret.EventDispatcher {

    private static _instance : SeverEventDispatcher;
    constructor(target:egret.IEventDispatcher = null){
        super(target);
    }

    public static getInstance():SeverEventDispatcher {
        if(!this._instance) {
            this._instance = new SeverEventDispatcher();
        }
        return this._instance;
    }
}