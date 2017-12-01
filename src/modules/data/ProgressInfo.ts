enum ProgressType {
    TOTAL = 1, //  整份
    TWO_EQUAL = 2 , // 二等分
    THREE_EUQAL = 3// 三等分
}

class ProgressItemInfo {

    public state : string = "dark";
    private _type : ProgressType;
    private _num : number ;
    constructor(type:ProgressType){
        this._type = type;
    }

    public set num(val:number){
        this._num = val;
        switch(this._type){
            case ProgressType.TOTAL:
                this.state = (val == 0 ? "zero" : "all");
                break;
            case ProgressType.TWO_EQUAL:
                this.state = (val == 0 ? "zero" : (val == 2 ? "all" : "a_half"));
                break;
            case ProgressType.THREE_EUQAL:
                this.state = (val == 0 ? "zero" : (val == 3 ? "all" : (val == 1 ? "one_third" : "two_third")));
                break;
        }
    }

}

interface IProgressInfo {
    max : number;
    cur ?: number;
    gap ?: number;
    type ?: ProgressType;
    needInit ?: boolean;
}

class ProgressInfo extends egret.EventDispatcher{
    private _max : number ;
    private  _cur : number ;
    private _gap : number ;
    private _type : ProgressType;

    private _list : eui.ArrayCollection;
    constructor(info:IProgressInfo){
        super();
        this._max = info.max;
        this._type = info.type && info.type !== void 0 ? info.type : ProgressType.TOTAL;
        this._cur = info.cur ? info.cur : 0;
        this._gap = info.gap ? info.gap : 6;
        if(info.needInit) {
            this.init();
        }
    }

    init():void {
        this.list.removeAll();
        for(var i : number = 0 ; i < this.max ; i++) {
            this.list.addItem( new ProgressItemInfo(this._type) );
        }
        this.setCur(this._cur);
    }

    get list():eui.ArrayCollection {
        if(!this._list) {
            this._list = new eui.ArrayCollection();
        }
        return this._list;
    }

    setType(type:ProgressType):void {
        this._type = type;
    }

    setMax(val:number){
        if( val < 0 || this.list.source.length == val) return;
        this._max = val;
        this.list.removeAll();
        for(var i : number = 0 ; i < val ; i++) {
            var item : ProgressItemInfo = new ProgressItemInfo(this._type);
            this.setItemNum(item,val,i);
            this.list.addItem(item);
        }
    }

    updateCur():void {
        this.setCur(this._cur);
    }

    setCur(val:number){
        this._cur = val;
        for(var i : number = 0 ; i < this.list.length ; i++) {
            var item : ProgressItemInfo = this.list.getItemAt(i);
            this.setItemNum(item,val,i);
        }
    }

    private setItemNum(item:ProgressItemInfo,val:number,i:number):void {
        switch(this._type){
            case ProgressType.TOTAL:
                item.num = val > i ? 1 : 0;
                break;
            case ProgressType.TWO_EQUAL:
                var divisor : number = Math.floor(val / 2);
                var remainder : number = val % 2;
                item.num = divisor > i ? 2 : ( divisor < i ? 0 : remainder);
                break;
            case ProgressType.THREE_EUQAL:
                var divisor : number = Math.floor(val / 3);
                var remainder : number = val % 3;
                item.num = divisor > i ? 3 : ( divisor < i ? 0 : remainder);
                break;
        }
    }

    get cur():number {
        return this._cur;
    }
    get max():number {
        return this._max;
    }
    get type():number {
        return this._type;
    }
}