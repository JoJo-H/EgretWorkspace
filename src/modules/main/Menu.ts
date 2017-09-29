

class Menu extends BaseComponent {

    public btn2048 : eui.Button;
    public btn2 : eui.Button;
    public btn3 : eui.Button;
    public btn4 : BaseButton;
    constructor(){
        super();
        this.skinName = "MenuSkin";
    }

    onEnter():void {
        super.onEnter();

        this.btn2048.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpen2048,this);
        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtn2,this);
        this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtn3,this);
        this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtn4,this);
    }

    private onOpen2048(event:egret.TouchEvent):void {
        GlobalAPI.UI.addBox(Game2048View);
    }

    private onBtn2():void {
        GlobalAPI.UI.addBox(GameTurntableView);
    }

    private onBtn3():void {
        
    }

    private onBtn4():void {
        
    }

    onExit():void {
        super.onExit();
        this.btn2048.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpen2048,this);
        this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtn2,this);
        this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtn3,this);
        this.btn4.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtn4,this);
    }

}