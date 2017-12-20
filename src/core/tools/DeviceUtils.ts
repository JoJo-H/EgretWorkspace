/**
 * 设备信息
 */
class DeviceUtils {
 
    public constructor() {
    }

    /**
     * 获取浏览器名称
     */
    static getExplore() {
        var sys : any = {},
            ua = navigator.userAgent.toLowerCase(),
            s;
        (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
            (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
            (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
            (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
            (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
            (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
            (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
        // 根据关系进行判断
        if (sys.ie) return ('IE: ' + sys.ie)
        if (sys.edge) return ('EDGE: ' + sys.edge)
        if (sys.firefox) return ('Firefox: ' + sys.firefox)
        if (sys.chrome) return ('Chrome: ' + sys.chrome)
        if (sys.opera) return ('Opera: ' + sys.opera)
        if (sys.safari) return ('Safari: ' + sys.safari)
        return 'Unkonwn'
    }

    /**
     * 
     * @desc 获取操作系统类型
     * @return {String} 
     */
    static getOS() {
        var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
        var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
        var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

        if (/mac/i.test(appVersion)) return 'MacOSX'
        if (/win/i.test(appVersion)) return 'windows'
        if (/linux/i.test(appVersion)) return 'linux'
        if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
        if (/android/i.test(userAgent)) return 'android'
        if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
    }

    /**
     * @desc 判断浏览器是否支持webP格式图片
     * @return {Boolean} 
     */
    static isSupportWebP() {
        return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }

    /**
     * 当前是否Html5版本
     */
    public get IsHtml5():boolean {
        return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
    }

    /**
     * 当前是否是Native版本
     */
    public get IsNative():boolean {
        return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
    }

    /**
     * 是否是在手机上
     */
    public get IsMobile():boolean {
        return egret.Capabilities.isMobile;
    }

    /**
     * 是否是在PC上
     * @returns {boolean}
     */
    public get IsPC():boolean {
        return !egret.Capabilities.isMobile;
    }

    /**
     * 是否是QQ浏览器
     */
    public get IsQQBrowser():boolean {
        return this.IsHtml5 && navigator.userAgent.indexOf('MQQBrowser') != -1;
    }

    /**
     * 是否是IE浏览器
     */
    public get IsIEBrowser():boolean {
        return this.IsHtml5 && navigator.userAgent.indexOf("MSIE") != -1;
    }

    /**
     * 是否是Firefox浏览器
     */
    public get IsFirefoxBrowser():boolean {
        return this.IsHtml5 && navigator.userAgent.indexOf("Firefox") != -1;
    }

    /**
     * 是否是Chrome浏览器
     */
    public get IsChromeBrowser():boolean {
        return this.IsHtml5 && navigator.userAgent.indexOf("Chrome") != -1;
    }

    /**
     * 是否是Safari浏览器
     */
    public get IsSafariBrowser():boolean {
        return this.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
    }

    /**
     * 是否是Opera浏览器
     */
    public get IsOperaBrowser():boolean {
        return this.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
    }
}