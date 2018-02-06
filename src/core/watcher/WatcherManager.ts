

class WatcherManager {

    public static listeners = '__listeners__';
    public static bindables = '__bindables__';
    public static bindableCount = 0;
    constructor(){

    }

    static getPropertyDescriptor(host:any,property:string):any {
        let description = Object.getOwnPropertyDescriptor(host,property);
        if(description){
            return description;
        }
        let prototype = Object.getPrototypeOf(host);
        if(prototype){
            return this.getPropertyDescriptor(prototype,property);
        }
        return null
    }
    /**
     * 检查属性是否可以绑定。若还未绑定，尝试添加绑定事件。若是只读或只写属性，返回false。
     */
    static checkBindable(host:any,property:string):boolean{
        let list : string[] = host[WatcherManager.bindables];
        //是否已绑定
        if(list && list.indexOf(property)!=-1){
            return true;
        }
        if(!host[WatcherManager.listeners]){
            host[WatcherManager.listeners] = [];
        }
        let descriptor : PropertyDescriptor = WatcherManager.getPropertyDescriptor(host,property);
        if(descriptor && descriptor.get && descriptor.set){
            // let orgSet = descriptor.set;
            descriptor.set = function(value:any){
                if(this[property] != value) {
                    // orgSet.call(this,value);
                    this[property] = value;
                    WatcherManager.notifyListener(this,property);
                }
            }
        }else if(!descriptor || (!descriptor.get && !descriptor.set)) {
            WatcherManager.bindableCount ++;
            //创建一个新变量，不能使用property,会造成无限循环
            let newProp = "_" + WatcherManager.bindableCount + property;
            host[newProp] = descriptor ? descriptor.value : null;
            descriptor = {configurable:true,enumerable:true,};
            descriptor.get = function():any{
                console.log('get',property,this[newProp]);
                return this[newProp];
            };
            descriptor.set = function(value){
                if(this[newProp] != value) {
                    this[newProp] = value;
                    WatcherManager.notifyListener(this,property);
                }
            }
        }else{
            return false;
        }
        Object.defineProperty(host,property,descriptor);
        //全局注册
        WatcherManager.registerBindable(host,property);
    }

    /**
     * 通知更新执行监听函数，遍历host的所有监听执行，通过监听函数去判断精确属性
     * @param host 
     * @param property 当前更新的属性
     */
    static notifyListener(host:any, property:string):void {
        let list : any[] = host[WatcherManager.listeners];
        let len = list.length;
        for(let i = 0 ; i < len ; i+=2) {
            let target = list[i+1];
            let func : Function = list[i];
            func.call(target,property);
        }
    }
    /**
     * 注册绑定的属性
     * @param instance 
     * @param property 
     */
    static registerBindable(instance:any,property:string):void{
        if(instance.hasOwnProperty(WatcherManager.bindables)){
            instance[WatcherManager.bindables].push(property);
        }
        else{
            let list = [property];
            if(instance[WatcherManager.bindables]){
                list = instance[WatcherManager.bindables].concat(list);
            }
            instance[WatcherManager.bindables] = list;
        }
    }
}

/**
 * Watcher 类能够监视可绑定属性的改变，您可以定义一个事件处理函数作为 Watcher 的回调方法，在每次可绑定属性的值改变时都执行此函数。
 * 一个watcher绑定一个属性
 * 一个对象可以有多个watcher
 * 创建对象的WatcherManager.listeners属性，存储该对象的watcher及更新函数
 * 创建对象的WatcherManager.bindables属性，存储该对象绑定的属性，避免多次赋值
 */
class Watcher {

    private host:any;
    private next:Watcher;
    private property:string;
    private handler:(value:any)=>void;
    private thisObject:any;
    private isExecuting:boolean = false;    // 兼容，是否在执行onPropertyChange函数中

    /**
     * 构造函数，非公开。只能从 watch() 方法中调用此方法。
     * */
    constructor(property:string, handler:(value:any)=>void, thisObject:any, next?:Watcher){
        this.property = property;
        this.handler = handler;
        this.next = next;
        this.thisObject = thisObject;
    }

    /**
     * 创建并启动 Watcher 实例。
     * @param host 用于承载要监视的属性或属性链的对象。
     * 创建Watcher实例后，您可以利用<code>reset()</code>方法更改<code>host</code>参数的值。
     * 当<code>prop</code>改变的时候，会使得host对应的一系列<code>handlers</code>被触发。
     * @param chain 用于指定要监视的属性链的值。例如，要监视属性 host.a.b.c，需按以下形式调用此方法：watch¬(host, ["a","b","c"], ...)。
     * @param handler 在监视的目标属性链中任何属性的值发生改变时调用的事件处理函数。
     * @param thisObject handler 方法绑定的this对象
     * @returns 如果已为 chain 参数至少指定了一个属性名称，则返回 Watcher 实例；否则返回 null。
     */
    public static watch(host:any, chain:string[], handler:(value:any)=>void, thisObject:any):Watcher {
        if( chain.length > 0 ){
            let property = chain.shift();
            //递归设置属性的监听链
            let next = Watcher.watch(null,chain,handler,thisObject);
            let watcher = new Watcher(property,handler,thisObject,next);
            //启动监听
            watcher.reset(host);
            return watcher;
        }
        return null;
    }

    /**
     * 重置此 Watcher 实例使用新的宿主对象。
     * 您可以通过该方法实现一个Watcher实例用于不同的宿主。
     * 为空时，移除host的属性property的绑定数据 watcher onPropertyChange函数
     * 不为空，更新
     * */
    public reset(newHost:egret.IEventDispatcher):void{
        console.log('reset:',newHost);
        let oldHost = this.host;
        //移除旧watch
        if(oldHost) {
            let list : any[] = oldHost[WatcherManager.listeners];
            let index = list.indexOf(this);
            list.splice(index-1,2);
        }

        this.host = newHost;
        if(newHost) {
            WatcherManager.checkBindable(newHost,this.property);
            let list : any[] = newHost[WatcherManager.listeners];
            list.push(this.onPropertyChange);
            list.push(this);
        }

        if(this.next){
            this.next.reset(this.getHostPropertyValue());
        }
    }
    /**
     * 属性值改变时的更新函数
     * @param property 
     */
    private onPropertyChange(property:string):void{
        // if (property == this.property && !this.isExecuting) {
        //     try {
        //         this.isExecuting = true;
        //         if (this.next)
        //             this.next.reset(this.getHostPropertyValue());
        //         this.handler.call(this.thisObject, this.getValue());
        //     }
        //     finally {
        //         this.isExecuting = false;
        //     }
        // }
        if(property == this.property) {
            console.log('onPropertyChange:',property);
            if(this.next){
                this.next.reset(this.getHostPropertyValue());
            }
            this.handler.call(this.thisObject,this.getValue());
        }
    }

    public setHandler(handler:(value)=>void,thisObject:any):void {
        this.handler = handler;
        this.thisObject = thisObject;
        if(this.next){
            this.next.setHandler(handler,thisObject);
        }
    }

    public unWatch():void {
        this.reset(null);
        this.handler = null;
        this.thisObject = null;
        this.isExecuting = false;
        if(this.next){
            this.unWatch();
        }
    }
    
    /**
     * 检索观察的属性或属性链的当前值，当宿主对象为空时此值为空。
     * */
    public getValue():any {
        if (this.next) {
            return this.next.getValue();
        }
        return this.getHostPropertyValue();
    }

    private getHostPropertyValue():any {
        return this.host ? this.host[this.property] : null;
    }

}