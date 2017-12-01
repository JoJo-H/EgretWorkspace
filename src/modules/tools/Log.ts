


class Log {

    public static _isOpen : boolean = true;
    public static trace(...optionalParams:any[]):void {
        if (this.isDebug) {
            optionalParams[0] = "[DebugLog]" + optionalParams[0];
            console.log.apply(console, optionalParams);
        }
    }

    /**
     * 设置调试是否开启
     * @param flag
     *
     */
    public static isOpen(flag:boolean):void {
        this._isOpen = flag;
    }

    /**
     * 是否是调试模式
     * @returns {boolean}
     */
    public static get isDebug():boolean {
        return this._isOpen;
    }
}