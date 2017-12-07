class SocketMediator extends puremvc.Mediator implements puremvc.IMediator{
    
        public static NAME:string = "SocketMediator";
        public static SOCKET_CLOSE : string = "SOCKET_CLOSE";
        public static SOCKET_NOCONNECT : string = "SOCKET_NOCONNECT";
        public static SOCKET_DEBUG_INFO : string = "SOCKET_DEBUG_INFO";
        public static SOCKET_RECONNECT : string = "SOCKET_RECONNECT";
        public static SOCKET_CONNECT : string = "SOCKET_CONNECT";
        public static SOCKET_START_RECONNECT : string = "SOCKET_START_RECONNECT";

        public static SOCKET_DATA_CODE : string = "SOCKET_DATA_CODE";
        constructor(viewComponet?:any){
            super(SocketMediator.NAME,viewComponet);
        }
    
        listNotificationInterests():any[] {
            super.listNotificationInterests();
            return [SocketMediator.SOCKET_CONNECT,SocketMediator.SOCKET_CLOSE,SocketMediator.SOCKET_DEBUG_INFO,
                SocketMediator.SOCKET_NOCONNECT,SocketMediator.SOCKET_RECONNECT,
                SocketMediator.SOCKET_START_RECONNECT,SocketMediator.SOCKET_DATA_CODE];
        }
    
        handleNotification(notification : puremvc.INotification) : void {
            var notiData : any = notification.getBody();
            super.handleNotification(notification);
                switch(notification.getName()){
                    case SocketMediator.SOCKET_CONNECT :
                        console.log("与服务器连接上");
                        this.send();
                        break;
                    case SocketMediator.SOCKET_START_RECONNECT :
                        console.log("开始与服务器重新连接");
                        this.send();
                        break;
                    case SocketMediator.SOCKET_RECONNECT :
                        console.log("与服务器重新连接上");
                        break;
                    case SocketMediator.SOCKET_NOCONNECT :
                        console.log("服务器连接不上");
                        break;
                    case SocketMediator.SOCKET_CLOSE :
                        console.log("与服务器断开连接");
                        break;
                    case SocketMediator.SOCKET_DATA_CODE:
                        console.log("接收服务器数据：",notiData);
                        break;
                    case SocketMediator.SOCKET_DEBUG_INFO :
                        console.log("SOCKET_DEBUG_INFO：",notiData);
                        break;
                }
        }

        //发送一条消息到服务器,𠮷
        public send():void{
            //protobuf
            var msg:any = {};
            msg.key = "MyMsg";
            msg.body = {"address" : "我𠮷huangguoyong","password" : "123456"};
            App.Socket.send(msg);

            // var msg : any = "hello world";
            // var msg :any = {address:'我𠮷huangguoyong',password:'123456'};
            // App.Socket.send(JSON.stringify(msg));
        }
}

// 查看socket.md记录文档