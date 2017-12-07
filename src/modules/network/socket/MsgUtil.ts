class MsgUtil {
    public static TYPE_HANDSHAKE = 1;
    public static TYPE_HANDSHAKE_ACK = 2;
    public static TYPE_HEARTBEAT = 3;
    public static TYPE_DATA = 4;
    public static TYPE_KICK = 5;

    public static strencode (str):Uint8Array {
        var byteArray = new Uint8Array(str.length * 3);
        var offset = 0;
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            var codes = null;
            //ascii表常用符号0~127,如果字节小于0x80，则把它当作单字节来处理
            if (charCode <= 0x7f) {
                codes = [charCode];
            }
            else if (charCode <= 0x7ff) {
                codes = [0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f)];
            } else {
                codes = [0xe0 | (charCode >> 12), 0x80 | ((charCode & 0xfc0) >> 6), 0x80 | (charCode & 0x3f)];
            }
            for (var j = 0; j < codes.length; j++) {
                byteArray[offset] = codes[j];
                ++offset;
            }
        }
        var _buffer = new Uint8Array(offset);
        MsgUtil.copyArray(_buffer, 0, byteArray, 0, offset);
        return _buffer;
    }

    /**
     * 支持稀有字符，四个字节：如𠮷；
     * @param str 
     */
    public static strencode2(str:string):Uint8Array {
        var byteArray = new Uint8Array(str.length * 3);
        var offset = 0;
        for (var i = 0; i < str.length; i++) {
            var charCode = str.codePointAt(i);
            var codes = null;
            //Unicode符号范围 | UTF-8编码方式 : 
            //(十六进制) | （二进制）
            //  一个字节    0000 0000-0000 007F | 0xxxxxxx
            if (charCode <= 0x7f) {
                codes = [charCode];
            }
            //  两个字节  0000 0080-0000 07FF | 110xxxxx 10xxxxxx
            else if (charCode <= 0x7ff) {
                codes = [0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f)];
            }
            //  三个字节    0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
            else if(charCode <= 0xffff) {
                codes = [0xe0 | (charCode >> 12), 0x80 | ((charCode & 0xfc0) >> 6), 0x80 | (charCode & 0x3f)];
            }
            //  四个字节    0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            else {
                codes = [0xf0 | (charCode >> 18),0xe0 | (charCode >> 12), 0x80 | ((charCode & 0xfc0) >> 6), 0x80 | (charCode & 0x3f)];
                i++;
            }
            for (var j = 0; j < codes.length; j++) {
                byteArray[offset] = codes[j];
                ++offset;
            }
        }
        var _buffer = new Uint8Array(offset);
        MsgUtil.copyArray(_buffer, 0, byteArray, 0, offset);
        return _buffer;
    }

    public static strdecode(buffer) {
        var bytes = new Uint8Array(buffer);
        var array = [];
        var offset = 0;
        var charCode = 0;
        var end = bytes.length;
        while (offset < end) {
            // 0xxxxxxx
            if (bytes[offset] < 128) {
                charCode = bytes[offset];
                offset += 1;
            } //
            else if (bytes[offset] < 224) {
                charCode = ((bytes[offset] & 0x3f) << 6) + (bytes[offset + 1] & 0x3f);
                offset += 2;
            } else {
                charCode = ((bytes[offset] & 0x0f) << 12) + ((bytes[offset + 1] & 0x3f) << 6) + (bytes[offset + 2] & 0x3f);
                offset += 3;
            }
            array.push(charCode);
        }
        return String.fromCharCode.apply(null, array);
    }

    /**
     * utf-8字节数组 转换成 unicode字符串
     * @param buffer 
     */
    public static utfBuffer2Uc(buffer) {
        var bytes = new Uint8Array(buffer);
        var array = [];
        var offset = 0;
        var charCode = 0;
        var end = bytes.length;
        //0xxxxxxx 
        //110xxxxx 10xxxxxx
        //1110xxxx 10xxxxxx 10xxxxxx
        //11110xxx 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
        //查看第一个字节在哪个范围就可以判断这个字符是几个字节
        while (offset < end) {
            //
            if( bytes[offset] < 0x80 ) {
                charCode = bytes[offset];
                offset += 1;
            }
            // 110xxxxx 10xxxxxx两个字节
            else if( bytes[offset] < 0xe0 ) {
                charCode = ((bytes[offset] & 0x1f) << 6) + (bytes[offset + 1] & 0x3f);
                offset += 2;
            }
            // 1110xxxx 三个字节
            else if( bytes[offset] < 0xf0 ) {
                charCode = ((bytes[offset] & 0xf) << 12) + ((bytes[offset + 1] & 0x3f) << 6) + (bytes[offset + 2] & 0x3f);
                offset += 3;
            }else {
                charCode = ((bytes[offset] & 0x7) << 18) + ((bytes[offset + 1] & 0x3f) << 12) + ((bytes[offset + 2] & 0x3f) << 6) + (bytes[offset + 3] & 0x3f);
                offset += 4;
            }
            array.push(charCode);
        }
        return String.fromCodePoint.apply(null, array);
    }

    public static encode(type, body):any {
        //设置头部字节，多四个字节，第一个字节表示type，后三个个字节表示body的长度
        var length = body ? body.length : 0;
        var buffer = new Uint8Array(4 + length);
        var index = 0;
        buffer[index++] = type & 0xff;
        buffer[index++] = (length >> 16) & 0xff;
        buffer[index++] = (length >> 8) & 0xff;
        buffer[index++] = length & 0xff;
        if (body) {
            MsgUtil.copyArray(buffer, index, body, 0, length);
        }
        return buffer;
    }

    public static decode(buffer):any {
        var bytes = new Uint8Array(buffer);
        var type = bytes[0];
        var index = 1;
        var length = ((bytes[index++]) << 16 | (bytes[index++]) << 8 | bytes[index++]) >>> 0;
        var body = length ? new Uint8Array(length) : null;
        MsgUtil.copyArray(body, 0, bytes, 4, length);

        return body ? {body:body,type:type} : null;
    }

    public static copyArray(dest, doffset, src, soffset, length) {
        if ('function' === typeof src.copy) {
            // Buffer
            src.copy(dest, doffset, soffset, soffset + length);
        } else {
            // Uint8Array
            for (var index = 0; index < length; index++) {
                dest[doffset++] = src[soffset++];
            }
        }
    }

    utf16to8(str) {
        var out, i, len, c;
    
        out = "";
        len = str.length;
        for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
        }
        return out;
    }

    utf8to16(str) {
        var out, i, len, c;
        var char2, char3;
    
        out = "";
        len = str.length;
        i = 0;
        while(i < len) {
        c = str.charCodeAt(i++);
        switch(c >> 4)
        { 
          case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxxxxxx
            out += str.charAt(i-1);
            break;
          case 12: case 13:
            // 110x xxxx   10xx xxxx
            char2 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
          case 14:
            // 1110 xxxx  10xx xxxx  10xx xxxx
            char2 = str.charCodeAt(i++);
            char3 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 0x0F) << 12) |
                           ((char2 & 0x3F) << 6) |
                           ((char3 & 0x3F) << 0));
            break;
        }
        }
    
        return out;
    }
}