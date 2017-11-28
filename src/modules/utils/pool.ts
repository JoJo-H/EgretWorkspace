/**
 * 对象池
 */
class ObjectPool<T> {

    private _type : any;
    constructor(type){
        this._type = type;
    }
    //剩余的对象池
    private _leftArr : T[] = [];
    //使用中的对象池
    private _useArr : T[] = [];

    /**
     * 回收对象,当不需要使用对象池创建的对象时,使用该方法回收对象
     * @param instance
     */
    push(instance:T):void {
        var index = this._useArr.indexOf(instance);
        if(index!=-1) {
            var delObj : any = this._useArr[index];
            //释放--注意该对象是复用的，不能随便释放资源。
            if(is.fun(delObj.dispose)) {
                delObj.dispose();
            }
            this._useArr.splice(index,1);
        }
        if(this._leftArr.indexOf(instance)==-1) {
            this._leftArr.push(instance);
        }
    }

    /**
     * 拉取对象,如果对象池中不存在任何可供使用的对象,则会创建出新的对象
     * 如果对象有init函数，则执行该函数传入参数
     * @param args 初始化对象的参数列表
     * @returns {any}
     */
    pop(...args):T{
        if(this._leftArr.length == 0) {
            var inst = new this._type();
            this._leftArr.push(inst);
        }
        var instance : any = this._leftArr.shift();
        //初始化数据
        if(is.fun(instance.init)) {
            instance.init(args);
        }
        this._useArr.push(instance);
        return instance;
    }

    
}

class pool {
    constructor(){

    }

    private static _poolMap : Map<any,any> = new Map();
    static getPool<T>(type:T):ObjectPool<T>{
        var typeId = other.getTypeId(type);
        if( !this._poolMap.has(typeId) ) {
            this._poolMap.set(typeId,new ObjectPool(type));
        }
        return this._poolMap.get(typeId);
    }

    static getTypePool<T>(name:string,type:T):ObjectPool<T> {
        var typeId = name + other.getTypeId(type);
        if( !this._poolMap.has(typeId) ) {
            this._poolMap.set(typeId,new ObjectPool(type));
        }
        return this._poolMap.get(typeId);
    }
}