

1、连接socket，监听连接是否成功
    php开启socket服务，前端使用websocket连接 ip和端口 的socket

2、发送数据，两种格式，默认字符串utf8格式，字节流需要设置类型egret.WebSocket.TYPE_BINARY


3、例子：字节流发送Uint8Array，不支持稀有字体（超过0xffff）
（1）MsgUtil.strencode方法：发送数据msg进行包装，使用ArrayBuffer的DataView试图Uint8Array进行存储，对字符的不同码点进行解析，需要分配多少字节存储
（2）MsgUtil.encode方法：头部预留四个字节，写入长度
（3）发送
（4）接收数据，同种json字符串格式
（5）MsgUtil.decode(buffer)：去除头部信息四个字节
（6）MsgUtil.strdecode(msg.body)：解析成字符串，用到String.fromCharCode()，然后JSON.parse(str)就得到json了

4、数据分析
（1）发送
var msg :any = {a:'我abc'};
App.Socket.send(JSON.stringify(msg));
（2）接收
原始数据27个字节：Uint8Array(27) [0,0,0,23,34, 123, 92, 34, 97, 92, 34, 58, 92, 34, 92, 117, 54, 50, 49, 49, 97, 98, 99, 92, 34, 125, 34]
消息部分：去除头部长度信息四个字节
Uint8Array(23) [34, 123, 92, 34, 97, 92, 34, 58, 92, 34, 92, 117, 54, 50, 49, 49, 97, 98, 99, 92, 34, 125, 34]
解析成字符串:String.fromCharCode()，可以看出发送过来的'我'字已经被解析成Unicode表示法
"{\"a\":\"\u6211abc\"}"
最后就可以使用JSON.parse(str)解析。


5、问题：不理解strencode与strdecode方法。。。