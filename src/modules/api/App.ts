

class App {


    /**
     * ProtoConfig
     * @type {null}
     */
    public static ProtoConfig:any = null;
    /**
     * ProtoFile
     * @type {null}
     */
    public static ProtoFile:any = null;
    /**
     * 全局配置数据
     * @type {null}
     */
    public static GlobalData:any = null;

    /**
     * Socket请求
     * @type {null}
     */
    public static get Socket():Socket {
        return Socket.getInstance();
    }

    constructor(){

    }
    
    public static Init():void {
        //全局配置数据
        App.GlobalData = Config.get('global_json');
        console.log('ssss');
        //实例化ProtoBuf和Socket请求
        App.ProtoFile = dcodeIO.ProtoBuf.loadProto(Config.get(App.GlobalData.ProtoFile));
        App.ProtoConfig = Config.get(App.GlobalData.ProtoConfig);
        App.Socket.initServer(App.GlobalData.SocketServer, App.GlobalData.SocketPort, new ByteArrayMsgByProtobuf());
    }
}