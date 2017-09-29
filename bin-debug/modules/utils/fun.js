var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fun = (function () {
    function fun() {
    }
    fun.throttle = function (fn, delay, immediate, debounce) {
        if (immediate === void 0) { immediate = false; }
        var curr = +new Date(), //当前事件
        last_call = 0, last_exec = 0, timer = null, diff, //时间差
        context, //上下文
        args, exec = function () {
            last_exec = curr;
            fn.apply(context, args);
        };
        return function () {
            curr = +new Date();
            context = this,
                args = arguments,
                diff = curr - (debounce ? last_call : last_exec) - delay;
            clearTimeout(timer);
            if (debounce) {
                if (immediate) {
                    timer = setTimeout(exec, this, delay);
                }
                else if (diff >= 0) {
                    exec();
                }
            }
            else {
                if (diff >= 0) {
                    exec();
                }
                else if (immediate) {
                    timer = setTimeout(exec, this, -diff);
                }
            }
            last_call = curr;
        };
    };
    ;
    return fun;
}());
__reflect(fun.prototype, "fun");
