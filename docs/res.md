资源加载模块可以参考个人笔记。

4.0版本之后的资源管理使用步骤：

https://github.com/egret-labs/resourcemanager
docs文件夹下的文档

如何使用：
在命令行中执行 npm install egret-resource-manager -g 安装命令行工具
执行 res upgrade { your-project } 将旧版 res 模块升级为新版本，升级过程会完成下述操作    
将 egret-resource-manager 中包含的新版本资源管理系统的源代码复制到项目文件夹中
将 egretProperties.json 中的 res 字段修改为 resourcemanager
当游戏资源发生变化后，执行res build { your_project }，更新资源配置

更新版本时可能会报错：因为文件格式的原因有时会导致我们的unix程序,或者shell程序出现错误,那么需要把这些dos文件格式转换成unix格式
1、比如缺少dos2unix命令工具 -- brew install dos2unix
安装成功后需要转换 cli.js文件
cd /usr/local/lib/node_modules/egret-resource-manager/script/out
sudo dos2unix cli.js
会提示dos2unix:converting file cli.js to unix format...
完成后就可以进行 res upgrade



资源的缓存机制
resources节点下配置的每个资源加载项，在第一次加载成功时会用name属性作为key缓存下来。以后再请求它时，都直接从缓存里取。如果有两个组都含有一个资源，第二个组再加载这个资源时，也会直接从缓存里得到结果，不会重复发起加载请求。通过RES.getResByUrl()获取的资源，使用url作为name缓存下来。



白鹭资源管理框架采用 ES2015 的装饰器语法进行配置。
@RES.mapConfig("config.json", () => "resource", path => {
    var ext = path.substr(path.lastIndexOf(".") + 1);
    var typeMap = {
        "jpg": "image",
        "png": "image",
        "json": "json",
        "fnt": "font",
        "mp3": "sound"
    }
    return typeMap[ext];
})
存在一个全局唯一的资源配置文件，并通过 res build 命令自动生成，生成的文件名为RES.mapConfig的第一个参数所对应的文件名
每当资源文件发生变化时，需要重新执行res build
当 res build 命令执行后，会遍历 resource文件夹，并将其中的每一个文件执行 RES.mapConfig的第三个参数所指向的函数，如果该文件返回 undefined ，则此文件不会被加入到资源配置文件中。




内置处理器
var _map = {
        "image": ImageProcessor,
        "json": JsonProcessor,
        "text": TextProcessor,
        "xml": XMLProcessor,
        "sheet": SheetProcessor,
        "font": FontProcessor,
        "bin": BinaryProcessor,
        "commonjs": CommonJSProcessor,
        "sound": SoundProcessor,
        "movieclip": MovieClipProcessor,
        "pvr": PVRProcessor,
        "mergeJson": MergeJSONProcessor,
        "resourceConfig": ResourceConfigProcessor
    }





自定义处理器
开发者如想自定义处理器，首先需要遵循以下接口

var customProcessor:RES.processor.Processor = {

    async onLoadStart(host,resource) {
        let text = host.load(resource,RES.processor.TextProcessor);
        let data = my_parser.parse(text);
        return text;
    },

    async onRemoveStart(host,resource) {
        let data = host.get(resource);
        data.dispose();
    },

    getData(host, resource, key, subkey) => { //可选函数

    }

}
编写完自定义处理器后，需要针对类型进行映射

RES.processor.map("customType",customProcessor);
并在 RES.mapConfig的第三个参数 TypeSelector 中，将特定文件的类型设置为 customType,参考代码如下:

RES.mapConfig("config.json",()=>"resource",(path)=>{
    if (path == "a/custom/file/type.bin") {
        return "customType";
    }
})