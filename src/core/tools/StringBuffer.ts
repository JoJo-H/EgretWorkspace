/**
 * StringBuffer类
 */
class StringBuffer {
    private _strings:Array<string>;

    public constructor(...args) {
        this._strings = args;
    }

    /**
     * 追加一个字符串
     * @param str
     */
    public append(str:string):void {
        this._strings.push(str);
    }

    /**
     * 转换为字符串
     * @returns {string}
     */
    public toString():string {
        return this._strings.join("");
    }

    /**
     * 清空
     */
    public clear():void {
        this._strings.length = 0;
    }
}
