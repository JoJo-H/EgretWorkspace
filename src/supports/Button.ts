

class Button extends eui.Button{

    constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
    }

    private onAddToStage(e:egret.Event):void {
        this.onEnter();
    }

    private onRemoveFromStage(e:egret.Event):void {
        this.onExit();
    }

    protected onEnter():void {
        
    }

    protected onExit():void {

    }

    dispose():void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
    }

}