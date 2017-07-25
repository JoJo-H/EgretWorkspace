

class GlobalAPI {

    private static _UI : UI;
    private static _stage : egret.Stage;
    public static facede : puremvc.IFacade;

    constructor(){

    }

    public static get UI():UI {
        if(!this._UI){
            this._UI = new UI();
        }
        return this._UI;
    }

    public static setStage(s:egret.Stage):void {
        this._stage = s;
    }

    public static get stage(){
        return this._stage;
    }
}