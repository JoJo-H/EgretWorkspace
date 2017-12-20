

class ByteArrayMsgByProtobuf extends ByteArrayMsg {
    private msgClass:any = null;
    private protoConfig:any = null;
    private protoConfigSymmetry:any = null;


    public constructor() {
        super();
        this.msgClass = {};
        this.protoConfig = App.ProtoConfig;
        this.protoConfigSymmetry = {};
        var keys = Object.keys(this.protoConfig);
        for (var i:number = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var value = this.protoConfig[key];
            this.protoConfigSymmetry[value] = key;
        }
    }

    /**
     * 获取msgID对应的类
     * @param key 对应simple.proto
     * @returns {any}
     */
    private getMsgClass(key:string):any {
        var cls:any = this.msgClass[key];
        if (cls == null) {
            cls = App.ProtoMessage.build(key);
            this.msgClass[key] = cls;
        }
        return cls;
    }

    /**
     * 获取msgID
     * @param key
     * @returns {any}
     */
    private getMsgID(key:string):number {
        return parseInt(this.protoConfigSymmetry[key]);
    }

    /**
     * 获取msgKey
     * @param msgId
     * @returns {any}
     */
    private getMsgKey(msgId:number) {
        return this.protoConfig[msgId];
    }

    /**
     * 接收消息处理
     * @param msg
     */
    public receive(socket:egret.WebSocket):void {
        var byte = new egret.ByteArray();
        socket.readBytes(byte);

        var obj:any = this.decode(byte);
        if (obj) {
            App.Facade.sendNotification(SocketMediator.SOCKET_DATA_CODE, obj);
        }
    }

    /**
     * 消息解析
     * @param msg
     */
    public decode(msg:egret.ByteArray):any {
        msg.position = 0;
        msg.readShort();
        //包含msgId的长度
        var len = msg.readShort();
        var msgID = msg.readShort();
        //body的长度
        len = msg.bytesAvailable;
        if (msg.bytesAvailable >= 0) {
            var bytes:egret.ByteArray = new egret.ByteArray();
            msg.readBytes(bytes, 0, len);

            var obj:any = {};
            obj.key = this.getMsgKey(msgID);
            console.log('接收数据protobuf:',new Uint8Array(bytes.buffer));
            obj.body = this.getMsgClass(obj.key).decode(bytes.buffer);
            return obj;
        }
        return null;
    }

    /**
     * 发送消息处理
     * @param msg
     */
    public send(socket:egret.WebSocket, msg:any):void {
        var bytes:any = this.encode(msg);
        if (bytes) {
            bytes.position = 0;
            socket.writeBytes(bytes, 0, bytes.bytesAvailable);
        }
    }

    /**
     * 消息封装
     * @param msg
     */
    public encode(msg:any):any {
        var msgID = this.getMsgID(msg.key);
        var msgBody = new (this.getMsgClass(msg.key))(msg.body);

        //序列化数据
        var buffer = msgBody.toArrayBuffer();
        var bodyBytes:egret.ByteArray = new egret.ByteArray(buffer);

        var sendMsg:egret.ByteArray = new egret.ByteArray();
        //预留消息长度的位置,四个字节
        sendMsg.writeShort(0);
        sendMsg.writeShort(0);
        sendMsg.writeShort(msgID);
        sendMsg.writeBytes(bodyBytes);
        //长度信息插到第3、4个字节
        sendMsg.position = 2;
        sendMsg.writeShort(sendMsg.length);
        console.log('发送protobuf：',new Uint8Array(sendMsg.buffer));
        return sendMsg;
    }
}