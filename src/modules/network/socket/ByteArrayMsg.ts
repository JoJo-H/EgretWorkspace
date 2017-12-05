

class ByteArrayMsg implements BaseMsg {
    private _msgBuffer:egret.ByteArray;

    public constructor() {
        this._msgBuffer = new egret.ByteArray();
    }

    /**
     * 接收消息处理
     * @param msg
     */
    public receive(socket:egret.WebSocket):void {

        var byte = new egret.ByteArray();
        socket.readBytes(byte);
        var obj : any = MsgUtil.decode(byte.buffer);
        if (obj) {
            App.Facade.sendNotification(obj.key, obj.body);
        }

        //TODO double bytearray clear
        if (this._msgBuffer.bytesAvailable == 0) {
            this._msgBuffer.clear();
        }
    }

    /**
     * 发送消息处理
     * @param msg
     */
    public send(socket:egret.WebSocket, msg:any):void {
        //发送数据msg的包装
        var obj:Uint8Array = MsgUtil.strencode(msg);
        // 需要加上头部信息
        var objEncode = MsgUtil.encode(MsgUtil.TYPE_DATA,obj);
        if (objEncode) {
            socket.writeBytes(objEncode);
        }
    }

    /**
     * 消息解析
     * @param msg
     */
    public decode(msg:any):any {
        return MsgUtil.decode(msg);
    }

    /**
     * 消息封装
     * @param msg
     */
    public encode(msg:any):any {
        return MsgUtil.encode(4,msg);
    }

}