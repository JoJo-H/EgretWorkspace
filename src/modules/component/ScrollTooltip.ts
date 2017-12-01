
interface IScrollTooltipInfo {
    text?: string;
    vaule:number;
    skinName?:string;
    offsetY?:number;
    offsetX?:number;
    size?: number;
    color?: number;
    delay?: number;
}

class ScrollTooltip extends BaseComponent {
    public data:IScrollTooltipInfo;
    public label : eui.BitmapLabel;
    private _value : number = 0;
    constructor(info:any){
        super();
        this.data = info;
        this.skinName = this.data.skinName ? this.data.skinName : "ShenjiaTooltipSkin";
        this.touchEnabled = this.touchChildren = false;
    }

    onEnter():void {
        super.onEnter();
        this.value = this.data.vaule;
    }

    set value(val:number){
        this.data.vaule = val;
        this._value = this.data.vaule;
        if (this.label) {
            this.label.text = this.data.text+numeral(this.data.vaule).format('0,0');
        }
    }

    get value():number {
        return this._value;
    }

    onExit():void {
        super.onExit();
    }
}