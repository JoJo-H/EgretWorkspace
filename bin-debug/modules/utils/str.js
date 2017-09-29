var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PadDireciton;
(function (PadDireciton) {
    PadDireciton[PadDireciton["LEFT"] = 0] = "LEFT";
    PadDireciton[PadDireciton["MIDDLE"] = 1] = "MIDDLE";
    PadDireciton[PadDireciton["RIGHT"] = 2] = "RIGHT";
})(PadDireciton || (PadDireciton = {}));
var str = (function () {
    function str() {
    }
    str.pad = function (str, len, pad, dir) {
        if (len === void 0) { len = 0; }
        if (pad === void 0) { pad = ' '; }
        if (dir === void 0) { dir = PadDireciton.MIDDLE; }
        var padlen = 0;
        if (len + 1 >= str.length) {
            switch (dir) {
                case PadDireciton.LEFT: {
                    str = new Array(len + 1 - str.length).join(pad) + str;
                    break;
                }
                case PadDireciton.MIDDLE: {
                    var right = Math.ceil((padlen = len - str.length) / 2);
                    var left = padlen - right;
                    str = new Array(left + 1).join(pad) + str + new Array(right + 1).join(pad);
                    break;
                }
                default: {
                    str = str + new Array(len + 1 - str.length).join(pad);
                    break;
                }
            }
        }
        return str;
    };
    str.format = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args.length == 0) {
            return value;
        }
        return value.replace(this._formatRegexp, function (match, group) {
            var idx = parseInt(group, 10);
            return isNaN(idx) || idx < 0 || idx >= args.length ?
                match :
                args[idx];
        });
    };
    str.formatFromObject = function (value, param) {
        if (is.falsy(param) || is.empty(param)) {
            return value;
        }
        return value.replace(this._formatObjRegexp, function (match, group) {
            if (param.hasOwnProperty(group)) {
                return param[group];
            }
            return match;
        });
    };
    str.trim = function (haystack, needle) {
        if (needle === void 0) { needle = ' '; }
        var trimmed = this.ltrim(haystack, needle);
        return this.rtrim(trimmed, needle);
    };
    str.ltrim = function (haystack, needle) {
        if (!haystack || !needle) {
            return haystack;
        }
        var needleLen = needle.length;
        if (needleLen === 0 || haystack.length === 0) {
            return haystack;
        }
        var offset = 0, idx = -1;
        while ((idx = haystack.indexOf(needle, offset)) === offset) {
            offset = offset + needleLen;
        }
        return haystack.substring(offset);
    };
    str.rtrim = function (haystack, needle) {
        if (!haystack || !needle) {
            return haystack;
        }
        var needleLen = needle.length, haystackLen = haystack.length;
        if (needleLen === 0 || haystackLen === 0) {
            return haystack;
        }
        var offset = haystackLen, idx = -1;
        while (true) {
            idx = haystack.lastIndexOf(needle, offset - 1);
            if (idx === -1 || idx + needleLen !== offset) {
                break;
            }
            if (idx === 0) {
                return '';
            }
            offset = idx;
        }
        return haystack.substring(0, offset);
    };
    str.startsWith = function (haystack, needle) {
        if (haystack.length < needle.length) {
            return false;
        }
        for (var i = 0; i < needle.length; i++) {
            if (haystack[i] !== needle[i]) {
                return false;
            }
        }
        return true;
    };
    str.endsWith = function (haystack, needle) {
        var diff = haystack.length - needle.length;
        if (diff > 0) {
            return haystack.lastIndexOf(needle) === diff;
        }
        else if (diff === 0) {
            return haystack === needle;
        }
        else {
            return false;
        }
    };
    str.replaceAll = function (str, search, replacement) {
        var s = str.replace(new RegExp(search, 'g'), replacement);
        return s;
    };
    str.repeat = function (s, count) {
        var arr = new Array(count);
        for (var i = 0; i < count; i++) {
            arr[i] = s;
        }
        return arr.join('');
    };
    return str;
}());
str._formatRegexp = /{(\d+)}/g;
str._formatObjRegexp = /{([^\}]+)}/g;
__reflect(str.prototype, "str");
