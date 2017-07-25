

class Menu extends BaseComponent {

    public btn2048 : eui.Button;
    constructor(){
        super();
        this.skinName = "MenuSkin";
    }

    onEnter(args):void {
        super.onEnter(args);

        this.btn2048.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpen2048,this);
    }

    private onOpen2048(event:egret.TouchEvent):void {
        GlobalAPI.UI.addBox(Game2048View);
    }

    onExit():void {
        super.onExit();
        this.btn2048.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpen2048,this);
    }

}