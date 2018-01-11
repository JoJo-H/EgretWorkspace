


class ListenerManager {
    public CLASS_NAME : string = "ListenerManager";
    private _dispatcher : egret.EventDispatcher ;

    public constructor() {
        // console.log(10001,"不可以实例化" + this.CLASS_NAME + "类,请实例Lcp." + this.CLASS_NAME + ".getInstance()开始");
        if (this._dispatcher == null){
            this._dispatcher = new egret.EventDispatcher();
        }
    }

    /**
     * 注册全局侦听
     * @param type
     * @param listener
     * @param thisObject
     * @param useCapture
     * @param priority
     */
    public addEventListener(type:string, listener:Function, thisObject:any, useCapture:boolean = false, priority:number = 0):void {
        this._dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
    }

    /**
     * 移除全局侦听
     * @param type
     * @param listener
     * @param thisObject
     * @param useCapture
     */
    public removeEventListener(type:string, listener:Function, thisObject:any, useCapture:boolean = false):void {
        this._dispatcher.removeEventListener(type, listener, thisObject, useCapture);
    }
    /**
     * 派发全局事件
     * @param event
     * @returns {boolean}
     */
    public dispatchEvent(event:MyEvent):boolean {
        return this._dispatcher.dispatchEvent(event);
    }

    /**
     * 判断是否有全局侦听
     * @param type
     * @returns {boolean}
     */
    public hasEventListener(type:string):boolean {
        return this._dispatcher.hasEventListener(type);
    }

        
}