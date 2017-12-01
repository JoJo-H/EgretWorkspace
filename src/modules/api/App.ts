

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
     */
    public static get Socket():Socket {
        return SingletonFactory.singleton(Socket);
    }

    /**
     * 配置类
     */
    public static get Config():Config {
        return SingletonFactory.singleton(Config);
    }
    /**
     * 音频管理
     */
    public static get SoundManager():SoundManager {
        return SingletonFactory.singleton(SoundManager);
    }

    public static get Facade():ApplicationFacade {
        return ApplicationFacade.getInstance();
    }
    /**
     * 自定义事件管理
     */
    public static get CustomEventManage():CustomEventManage {
        return SingletonFactory.singleton(CustomEventManage);
    }
    /**
     * UI管理类
     */
    public static get UI():UI{
        return SingletonFactory.singleton(UI);
    }

    constructor(){

    }
    
    public static Init():void {
        //实例化ProtoBuf和Socket请求
        App.ProtoFile = dcodeIO.ProtoBuf.loadProto(Config.get(App.GlobalData.ProtoFile));
        App.ProtoConfig = Config.get(App.GlobalData.ProtoConfig);
        // App.Socket.initServer(App.GlobalData.SocketServer, App.GlobalData.SocketPort, new ByteArrayMsgByProtobuf());
        App.Socket.initServer(App.GlobalData.SocketServer, App.GlobalData.SocketPort, new UTFMsg());
        App.Socket.connect();
    }

    private static _stage : egret.Stage;
    public static setStage(s:egret.Stage):void {
        this._stage = s;
    }

    public static get stage(){
        return this._stage;
    }
}