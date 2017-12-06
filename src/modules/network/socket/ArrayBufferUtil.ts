
class ArrayBufferUtil {

    //测试中，失败
    public static str2uint32(str:string):Uint32Array {
        let arr = [];
        let len : number = str.length;
        for (let i = 0; i < len; i++) {
            let code = str.codePointAt(i);
            if(code > 0xffff) {
                arr[i] = code;
                i++;
            }else{
                arr[i] = code;
            }
        }
        len = arr.length;
        var buff = new Uint32Array(len+4);
        for (let i = 0; i < len; i++) {
            buff[i+4] = arr[i];
        }
        return buff;
    }
    public static uint32ToStr(buffer):any {
        var bytes = new Uint32Array(buffer,4);
        var array = [];
        for (let i = 0,len=bytes.byteLength; i < len; i++) {
            array[i] = bytes[i];
        }
        return String.fromCodePoint.apply(null, array);
    }

    // public static str2u
}