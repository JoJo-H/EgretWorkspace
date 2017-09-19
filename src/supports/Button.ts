

class Button extends eui.Component {

    constructor(){
        super();
        this.touchChildren = false;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onEnter, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
    }
    

    onExit():void {
        
    }

    onEnter():void {
        
    }

    protected onTouchBegin(event:egret.TouchEvent):void {

    }


}