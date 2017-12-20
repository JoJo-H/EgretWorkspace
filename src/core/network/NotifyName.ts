
class NotifyName {

    /**
     * 缓存请求数据
     * @type {string}
     */
    public static CacheChange:string = "CacheChange";
    
    /**
     * 返回特定接口缓存更新的通知事件名
     * @param moddo 接口名称
     * @returns {string} 更新通知事件名
     * @constructor
     */
    public static Change(moddo:string|ProxyInfo):any {
        return `Change.${NotifyName.getModDo(moddo)}`;
    }

    /**
     * 返回特定接口缓存数据的通知事件名
     * @param moddo 接口名称
     * @returns {string} 缓存通知事件名
     * @constructor
     */
    public static Cache(moddo:string|ProxyInfo):any {
        return `Cache.${NotifyName.getModDo(moddo)}`;
    }

    /**
     * 缓存请求数据前
     * @param moddo
     * @returns {string}
     * @constructor
     */
    static BeforeChange(moddo:string|ProxyInfo):any {
        return `BeforeChange.${NotifyName.getModDo(moddo)}`;
    }

    static AfterChange(moddo:string|ProxyInfo):any {
        return `AfterChange.${NotifyName.getModDo(moddo)}`;
    }

    /**
     * 通用缓存通知事件名
     * @param moddo 接口名称
     * @returns {string} 通用通知事件名
     * @constructor
     */
    public static All(moddo:string|ProxyInfo):any {
        return `All.${NotifyName.getModDo(moddo)}`;
    }

    static getModDo(moddo:string|ProxyInfo):any {
        if (is.string(moddo)) {
            return moddo;
        }
        if (moddo && (<any>moddo).moddo) {
            return (<any>moddo).moddo;
        }
        return null;
    }
}