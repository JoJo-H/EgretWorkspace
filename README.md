
-->2017.09.24至2017.09.26
    创建项目
    引入第三方库  is,numeral,moment,puremvc等
    resourceManager 引入,使用4.0版本资源配置

--> 2017.09.26 04：23 PM
    龙骨构建代码
    bug：动画事件派发失败；
    警告：dragonBones.js:9230 Same name data. Robot

--> 2017.09.26 05：14 PM
    修复 警告：dragonBones.js:9230 Same name data. Robot

--> 2017.09.26 06：47 PM
    修复 动画事件派发失败；

--> 2017.09.27 01：21 AM
    MovieClip构建code

--> 2017.09.29 11：33 AM
    实现转盘code：GameTurntableView.ts

--> 2017.09.29 03：04 PM
    button基类调整，支持notice配置；新增fun、str工具类

--> 2017.09.29 11：49 PM
    Button支持notice配置，增加转盘效果类

-->2017.11.06 01:38
    ecma6的测试数据与http请求代码初步构建code

-->2017.11.17 01:07
    工具库扩展 str,obj,num,Regexp,other,array,device,time,url,Keycode,fun

-->2017.11.27 00:09
    增加登录请求LoginProxy，连通php服务器，请求并接受服务器响应的数据。
    下一步：对服务器数据进行解析 缓存数据，需要一个解析架构；需要增加多个请求；

-->2017.11.27 12:21
    增加multiRequest,合并多个请求成一个。
    下一步：对服务器数据进行解析 缓存数据，需要一个解析架构；

-->2017.11.27 15.53
    增加对json配置的读取与存储，还有引入库jszip，对json的zip进行解压。当json数量过多时可以进行压缩。

-->2017.11.28 12:00
    增加对象池及部分工具类调整。