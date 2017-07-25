

class Game2048OverView extends BaseComponent {

    public btnNewGame : eui.Button;
    constructor(){
        super();
        this.skinName = "GameOverSkin";
    }

    onEnter(args):void {
        super.onEnter(args);

        this.btnNewGame.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onONewGame,this);
    }

    private onONewGame(event:egret.TouchEvent):void {
        GlobalAPI.UI.remove(this);
    }

    onExit():void {
        super.onExit();
        this.btnNewGame.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onONewGame,this);
    }

}