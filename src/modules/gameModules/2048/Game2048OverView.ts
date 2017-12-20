

class Game2048OverView extends BaseComponent {

    public btnNewGame : eui.Button;
    constructor(){
        super();
        this.skinName = "GameOverSkin";
    }

    onEnter():void {
        super.onEnter();

        this.btnNewGame.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onONewGame,this);
    }

    private onONewGame(event:egret.TouchEvent):void {
        App.UI.remove(this);
    }

    onExit():void {
        super.onExit();
        this.btnNewGame.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onONewGame,this);
    }

}