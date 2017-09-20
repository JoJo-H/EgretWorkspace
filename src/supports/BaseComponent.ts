

class BaseComponent extends eui.Component {

    private _data : any;
    private _dataMapArr:any = [];
    private _args:any[] = [];
    private _componentName:string;

    constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
    }

    getArgs():any {
        return this._args;
    }

    setArgs(args):void {
        this._args = args;
    }

    public set data(value:any) {
        this._data = value;
        if (value != null) {
            this.addDataMap('data');
        }
        this.dataChanged();
    }

    public get data(){
        return this._data;
    }

    private addDataMap(name) {
        if (this._dataMapArr.indexOf(name) == -1) {
            this._dataMapArr.push(name);
        }
    }

    setData(data:any, type:string = 'data'):BaseComponent {
        if (type == 'data') {
            this.data = data;
            if (data != null) {
                this.addDataMap('data');
                Global.propertyChange(this,"data");
            }
            
        } else {
            this[type] = data;
            if (data != null) {
                this.addDataMap(type);
            }
        }
        return this;
    }

    protected dataChanged():void {
    }

    setCompName(name:string):this {
        this.componentName = name;
        return this;
    }

    get componentName():string {
        return this._componentName;
    }

    set componentName(value:string) {
        this._componentName = value;
    }

    private onAddToStage(e:egret.Event):void {
        this.onEnter();
    }

    private onRemoveFromStage(e:egret.Event):void {
        this.onExit();
    }

    protected onEnter():void {
        
    }

    protected onExit():void {

    }

    destoryData():void {
        while (this._dataMapArr.length) {
            this[this._dataMapArr.shift()] = null;
        }
        this._args = [];
        this._data = null;
        this.componentName = "";
        this.onExit();
        Display.destoryChildren(this);
    }

    dispose():void {
        this.destoryData();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
    }
}