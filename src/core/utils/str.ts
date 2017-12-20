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

    static replaceAll(str:string, search:string, replacement:string):string {
        var s = str.replace(new RegExp(search, 'g'), replacement);
        return s;
    }

    /**
     * 
     * @desc   现金额转大写
     * @param  {Number} n 
     * @return {String}
     */
    static digitUppercase(n) {
        var fraction = ['角', '分'];
        var digit = [
            '零', '壹', '贰', '叁', '肆',
            '伍', '陆', '柒', '捌', '玖'
        ];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠' : '';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整');
    };

    
    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    public trimSpace(str:string):string {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    }

    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    public getStringLength(str:string):number {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            } else {
                length += 1;
            }
        }
        return length;
    }

    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    public isChinese(str:string):boolean {
        var reg = /^.*[\u4E00-\u9FA5]+.*$/;
        return reg.test(str);
    }
}