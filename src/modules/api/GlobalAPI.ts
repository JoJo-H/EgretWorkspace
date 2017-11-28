

class GlobalAPI {

    public static facede : puremvc.IFacade;
    constructor(){

    }

    private static _event : egret.EventDispatcher;
    static get event():egret.EventDispatcher {
        if(!this._event){
            this._event = new egret.EventDispatcher();
        }
        return this._event;
    }

    private static _UI : UI;
    public static get UI():UI {
        if(!this._UI){
            this._UI = new UI();
        }
        return this._UI;
    }

    private static _stage : egret.Stage;
    public static setStage(s:egret.Stage):void {
        this._stage = s;
    }

    public static get stage(){
        return this._stage;
    }
}