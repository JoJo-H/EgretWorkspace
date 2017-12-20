
class md5Test{

    constructor(){
        this._md5 = new md5();
    }
    private _md5 : md5;
    test():void {
        LogManager.trace(this._md5.hex_md5('hello world'));
    }
}