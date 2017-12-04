
class ParameterData {


    static getResVersion():string {
        var resVer = egret.getOption("resVer");
        var arr = resVer.split('.');
        return arr[0];
    }

    static getThemeVersion():string {
        var resVer = egret.getOption("resVer");
        var arr = resVer.split('.');
        return arr[1];
    }

    //isSimple==1走的是publishSimpleIndex.html,不需要版本号
    static isSimple():boolean {
        return egret.getOption("isSimple") == "1";
    }
}