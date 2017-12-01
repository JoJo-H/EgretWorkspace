

class UTFMsg implements BaseMsg {

    public constructor() {

    }

    /**
     * 接收消息处理
     * @param msg
     */
    public receive(socket:egret.WebSocket):void {
        var msg:string = socket.readUTF();
        var obj:any = this.decode(msg);
        if (obj) {
            App.Facade.sendNotification(obj.key, obj.body);
        }
    }

    /**
     * 发送消息处理
     * @param msg
     */
    public send(socket:egret.WebSocket, msg:any):void {
        var obj:any = this.encode(msg);
        if (obj) {
            socket.type = egret.WebSocket.TYPE_STRING;
            socket.writeUTF(obj);
        }
    }

    /**
     * 消息解析
     * @param msg
     */
    public decode(msg:any):any {
        // console.log("decode需要子类重写，根据项目的协议结构解析");
        console.log(msg);
        return msg;
    }

    /**
     * 消息封装
     * @param msg
     */
    public encode(msg:any):any {
        // console.log("encode需要子类重写，根据项目的协议结构解析");
        return msg;
    }
}