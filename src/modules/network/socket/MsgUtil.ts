class MsgUtil {
    public static TYPE_HANDSHAKE = 1;
    public static TYPE_HANDSHAKE_ACK = 2;
    public static TYPE_HEARTBEAT = 3;
    public static TYPE_DATA = 4;
    public static TYPE_KICK = 5;

    public static strencode (str):Uint8Array {
        //不支持超过码点0xffff的字符，长度为2，会被分开两个字符封装
        var byteArray = new Uint8Array(str.length * 3);
        var offset = 0;
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            var codes = null;
            //ascii表常用符号0~127,127:0xxxxxxx，2的7次方
            if (charCode <= 0x7f) {
                codes = [charCode];
            }
            //2047: 0xxx xxxxxxxx
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
        // return String.fromCodePoint.apply(null, array);
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

        return {body:body,type:type};
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