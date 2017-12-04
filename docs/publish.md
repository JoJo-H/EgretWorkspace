发布过程：

在项目的 egretProperties.json 中添加"resources": []
执行 egret publish --version version1 完成游戏 js 文件编译加密过程
执行 res publish . bin-release/web/version1 完成资源发布和 js 文件发布
将游戏资源上传至游戏远程服务器 / CDN 中，不要发布到另一个文件夹，



1、发布：将 自编的代码压缩成一个mina.min.js;libs库中只选取mni.
代码压缩
egret publish 

2、eui 发布. 会新增带有随机码（可能是crc）的文件（asset目录下的文件，其他目录不变）。原先的asset,ui,eui_skins,config文件夹都还在（莫名其妙的有一个resource目录，底下只有被变化过的）,需要自己手动删除
新增文件：manifest.json backup目录 js目录
资源压缩
res publish . bin-release/web/171203232431/

3、编译exml文件,编译成js代码
原先default.thm.json的包含各个skin的exml文件内容；编译后成gjs的js串；网上运行时不行重新编译
euibooster . $releasePath

4、压缩libs库，合并成一个js压缩文件
对main.min.js，default.thm.json，config_*.json进行重命名,加入CRC值

5、加载index不能用项目的index.html了，因为加载的文件都被我们改了，加入了CRC版本号。我们需要动态去加载
新建一个新的 publishIndex.html