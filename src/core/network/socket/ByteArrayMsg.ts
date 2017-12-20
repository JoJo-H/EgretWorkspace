

class ByteArrayMsg implements BaseMsg {

    public constructor() {
    }

    /**
     * 接收消息处理
     * @param msg
     */
    public receive(socket:egret.WebSocket):void {
        var byte = new egret.ByteArray();
        socket.readBytes(byte);
        var obj : any = this.decode(byte.buffer);
        if (obj) {
            App.Facade.sendNotification(SocketMediator.SOCKET_DATA_CODE, obj);
        }
    }

    /**
     * 发送消息处理
     * @param msg
     */
    public send(socket:egret.WebSocket, msg:any):void {
        var buff = this.encode(msg);
        console.log('Uint8Array:(包含头部字节)',obj);
        if (buff) {
            socket.writeBytes(buff);
        }
    }

    /**
     * 消息解析
     * @param msg
     */
    public decode(buffer:any):any {
        var msg = MsgUtil.decode(buffer);
        console.log('接收数据：');
        if(msg) {
            console.log('Uint8Array:(去除头部字节)',new Uint8Array(msg.body));
            var str = MsgUtil.utfBuffer2Uc(msg.body);
            msg.body = JSON.parse(str);
        }
        return msg;
    }

    /**
     * 消息封装
     * @param msg
     */
    public encode(msg:any):any {
        // 发送数据msg的包装
        var obj:Uint8Array = MsgUtil.strencode2(msg);
        // 需要加上头部信息
        var buff = MsgUtil.encode(MsgUtil.TYPE_DATA,obj);
        return buff;
    }

}