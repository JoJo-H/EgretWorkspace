
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
}