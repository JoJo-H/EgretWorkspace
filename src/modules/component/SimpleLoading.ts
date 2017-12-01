
interface ISimpleLoading {
    show(): void;
    hide(): void;
}

class SimpleLoading extends BaseComponent implements ISimpleLoading {
    constructor() {
        super();
        this.skinName = 'SimpleLoadingSkin';
    }

    private _showCount:number = 0;
    public loadingShape : eui.Image;

    show():void {
        if (this._showCount == 0) {
            this.visible = true;
            egret.Tween.get(this.loadingShape,{loop:true}).to({rotation:360},5000);
        }
        this._showCount ++;
    }

    hide():void {
        this._showCount--;
        if (this._showCount == 0) {
            egret.Tween.removeTweens(this.loadingShape);
            this.visible = false;
        }
    }
}