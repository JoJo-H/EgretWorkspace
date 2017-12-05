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
            //ascii表常用符号0~127
            if (charCode <= 0x7f) {
                codes = [charCode];
            } else if (charCode <= 0x7ff) {
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
            if (bytes[offset] < 128) {
                charCode = bytes[offset];
                offset += 1;
            } else if (bytes[offset] < 224) {
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

    public static encode(type, body):any {
        //设置头部字节，留四个字节表示body的长度
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

        return MsgUtil.messageDecode(body);
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


    public static messageDecode(data):any {
        var msg = MsgUtil.jsonDecode(data);
        var str = MsgUtil.strdecode(msg.body);
        msg.body = JSON.parse(str);
        msg.type = msg.body["type"];
        return msg;
    }
    public static jsonDecode(buffer):any {
        var bytes = new Uint8Array(buffer);
        var bytesLen = bytes.length || bytes.byteLength;
        var offset = 0;
        var id = 0;
        var route = null;

        // parse body
        var bodyLen = bytesLen - offset;
        var body = new Uint8Array(bodyLen);

        MsgUtil.copyArray(body, 0, bytes, offset, bodyLen);

        return {'body': body, 'type':1};
    }
}