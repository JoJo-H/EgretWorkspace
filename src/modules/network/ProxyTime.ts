
class ProxyTime {

    private static _instance : ProxyTime;
    private _tickMap : Map<string,number> = new Map();

    constructor(){
        this.refreshTick();
    }

    private _tickId : number = null;
    private refreshTick():void {
        if(!this._tickId) {
            this._tickId = egret.setInterval(this.tick,this,1000);
        }
    }
    private tick():void {
        this._tickMap.forEach((value,key)=>{
            var time : number = this._tickMap.get(key);
            this._tickMap.set(key,time--);
            if(time <= 0) {
                this._tickMap.delete(key);
            }
        })
        if(this._tickMap.size <= 0) {
            egret.clearInterval(this._tickId);
            this._tickId = null;
        }
    }

    static getInstance():ProxyTime{
        if(!this._instance) {
            this._instance = new ProxyTime();
        }
        return this._instance;
    }

    public getLeftime(key:any):any {
        if (this._tickMap.has(key)) {
            return this._tickMap[key];
        }
        return 0;
    }

    public push(key:any, time:number):void {
        this._tickMap.set(key,time);
        this.refreshTick();
    }
}