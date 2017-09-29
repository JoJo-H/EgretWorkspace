enum PadDireciton {
    LEFT,
    MIDDLE,
    RIGHT
}
class str {
    static pad(str, len = 0, pad = ' ', dir:PadDireciton = PadDireciton.MIDDLE):string {
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
    }

    private static _formatRegexp = /{(\d+)}/g;

    static format(value:string, ...args:any[]):string {
        if (args.length == 0) {
            return value;
        }
        return value.replace(this._formatRegexp, (match, group) => {
            let idx = parseInt(group, 10);
            return isNaN(idx) || idx < 0 || idx >= args.length ?
                match :
                args[idx];
        });
    }

    private static _formatObjRegexp = /{([^\}]+)}/g;
    static formatFromObject(value:string, param:any):string {
        if (is.falsy(param) || is.empty(param)) {
            return value;
        }

        return value.replace(this._formatObjRegexp, (match, group) => {
            if (param.hasOwnProperty(group)) {
                return param[group];
            }
            return match;
        });
    }

    static trim(haystack:string, needle:string = ' '):string {
        let trimmed = this.ltrim(haystack, needle);
        return this.rtrim(trimmed, needle);
    }

    static ltrim(haystack?:string, needle?:string):string {
        if (!haystack || !needle) {
            return haystack;
        }
        let needleLen = needle.length;
        if (needleLen === 0 || haystack.length === 0) {
            return haystack;
        }

        let offset = 0,
            idx = -1;

        while ((idx = haystack.indexOf(needle, offset)) === offset) {
            offset = offset + needleLen;
        }

        return haystack.substring(offset);
    }

    static rtrim(haystack?:string, needle?:string):string {
        if (!haystack || !needle) {
            return haystack;
        }

        let needleLen = needle.length,
            haystackLen = haystack.length;

        if (needleLen === 0 || haystackLen === 0) {
            return haystack;
        }

        let offset = haystackLen,
            idx = -1;

        while (true) {
            idx = haystack.lastIndexOf(needle, offset -1);
            if (idx === -1 || idx + needleLen !== offset) {
                break;
            }
            if (idx === 0) {
                return '';
            }
            offset = idx;
        }
        return haystack.substring(0, offset);
    }

    static startsWith(haystack:string, needle:string):boolean {
        if (haystack.length < needle.length) {
            return false;
        }
        for (let i = 0 ; i < needle.length; i ++) {
            if (haystack[i] !== needle[i]) {
                return false;
            }
        }

        return true;
    }

    static endsWith(haystack:string, needle:string):boolean {
        let diff = haystack.length - needle.length;
        if (diff > 0) {
            return haystack.lastIndexOf(needle) === diff;
        } else if (diff === 0) {
            return haystack === needle;
        } else {
            return false;
        }
    }

    static replaceAll(str:string, search:string, replacement:string):string {
        var s = str.replace(new RegExp(search, 'g'), replacement);
        return s;
    }

    static repeat(s:string, count:number):string {
        var arr = new Array(count);
        for (var i = 0; i < count; i ++) {
            arr[i] = s;
        }
        return arr.join('');
    }
}