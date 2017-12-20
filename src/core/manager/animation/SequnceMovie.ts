
class SequnceMovie extends egret.DisplayObjectContainer implements IMovie {
    private _template: string;
    private _start: number;
    private _end: number;


    private _curIndex: number = 0;
    private _bitmapData: egret.Texture;

    public isCache = false;

    constructor() {
        super();

        this.frameRate = 24;
    }

    public setPath(template: string):void
    {
        this._template = template;
        this.$renderNode = new egret.sys.BitmapNode();
    }

    gotoAndStop(name:string, frame:number) {
        throw new Error("未实现");
    }

    gotoAndPlay(name:string, frame:number, playTimes:number = 0) {
        throw new Error("未实现");
    }

    private _atLast: boolean = false;
    get atLast(): boolean {
        return this._atLast;
    }
    set atLast(val: boolean) {
        this._atLast = val;
    }

    private _frameRate: number = 0;
    private _frameIntervalTime: number = 0;
    get frameRate(): number {
        return this._frameRate;
    }
    set frameRate(val: number) {
        this._frameRate = val;
        this._frameIntervalTime = 1000 / val;
    }

    play(name: string, playTimes: number = 0) {

    }

    dispose():void {
        
    }
}