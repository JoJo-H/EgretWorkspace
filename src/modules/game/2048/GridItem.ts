
class GridItem {

    private _rect : eui.Rect;
    private _num : number;
    constructor(num:number,rect:eui.Rect){
        this._num = num;
        this._rect = rect;
    }

    public get rect():eui.Rect {
        return this._rect;
    }

    public get num():number {
        return this._num;
    }

    public moveTo(deltaX: number, deltaY: number, time: number, animateState) {
        animateState.increase();
        egret.Tween.get(this._rect).to({x:deltaX,y:deltaY},time).call(
            ()=>{
                animateState.descrese();
            }
        );
    }

    public change(delay: number, numInfo, animateState) { 
        animateState.increase();
        this._num = numInfo.num;
        egret.Tween.get(this._rect).wait(delay).call(()=>{
            let label = this._rect["label"];
            label.text = numInfo.num +"";
            label.size = numInfo.fontSize;
            label.textColor = numInfo.color;
            this._rect.fillColor = numInfo.backgroundColor;
			animateState.descrese();
        });
    }

    public moveToAndFadeOut(deltaX: number, deltaY: number, time: number, animateState, callBack:Function):any {
        animateState.increase();
        egret.Tween.get(this._rect).to({x:deltaX,y:deltaY,alpha:0.3},time).call(
            ()=>{
                animateState.descrese();
                callBack();;
            }
        );
    }

}