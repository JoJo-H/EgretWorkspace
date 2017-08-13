

class GlobalAPI {

    private static _UI : UI;
    private static _stage : egret.Stage;
    public static facede : puremvc.IFacade;

    private _event : egret.EventDispatcher;
    constructor(){

    }

    get event():egret.EventDispatcher {
        if(!this._event){
            this._event = new egret.EventDispatcher();
        }
        return this._event;
    }

    public static get UI():UI {
        if(!this._UI){
            this._UI = new UI();
        }
        return this._UI;
        //
    }

    public static setStage(s:egret.Stage):void {
        this._stage = s;
    }

    public static get stage(){
        return this._stage;
    }
}