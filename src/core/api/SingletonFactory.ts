class SingletonFactory {

    constructor(){
    }

    private static _singletonMap:any = {};
    
    /**
     * 返回指定类型的单例
     * @includeExample singleton.ts
     * @param type 需要单例化的类型
     * @returns {any} 类型的单例
     */
    public static singleton<T>(type:{ new(): T ;}):T {
        var typeId = other.getTypeId(type);
        if (!this._singletonMap.hasOwnProperty(typeId)) {
            this._singletonMap[typeId] = new (<any>type)();
        }
        return <T>this._singletonMap[typeId];
    }

    /**
     * 返回指定分类的类型单例
     * @param name 分类名称
     * @param type 单例化的类型
     * @includeExample typesingleton.ts
     * @returns {any} 单例对象
     */
    public static typeSingleton<T>(name:string, type:{ new(): T; }):T {
        var typeId = name + other.getTypeId(type);
        if (!this._singletonMap.hasOwnProperty(typeId)) {
            this._singletonMap[typeId] = new (<any>type)();
        }
        return <any>this._singletonMap[typeId];
    }
}