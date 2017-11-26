//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////


// 资源配置，您可以访问
// https://github.com/egret-labs/resourcemanager/tree/master/docs
// 了解更多细节
//避免图集重复加载
RES.FEATURE_FLAG.LOADING_STATE = 1;

@RES.mapConfig("config.json",()=>"resource",path => {
    var ext = path.substr(path.lastIndexOf(".") + 1);
    var typeMap = {
        "jpg": "image",
        "png": "image",
        "webp": "image",
        "json": "json",
        "dbmv": "dbmv",
        "fnt": "font",
        "pvr": "pvr",
        "mp3": "sound",
        "aa":"sound"
    }
    // if (path == "a/custom/file/type.bin") {
    //     return "customType";
    // }
    var type = typeMap[ext];
    if (type == "json") {
        if (path.indexOf("sheet") >= 0) {
            type = "sheet";
        } else if (path.indexOf("movieclip") >= 0) {
            type = "movieclip";
        };
    }
    return type;
})
class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {

        // RES.processor.map("sheet",{
        //     async onLoadStart(host: RES.ProcessHost, resource: RES.ResourceInfo):Promise<any>{
        //         let data = await host.load(resource,RES.processor.JsonProcessor);
        //         let imagePath = RES.processor.getRelativePath(resource.name,data.file);
        //         // r= { name:"_png",type:"sheet",url:".png"}
        //         let r = (<any>host.resourceConfig).getRource(imagePath);
        //         if(!r) {
        //             throw new RES.ResourceManagerError(1001,imagePath);
        //         }
        //         var texture : egret.Texture = await host.load(r);
        //         var frames : any = data.frames;
        //         var spriteSheet = new egret.SpriteSheet(texture);
        //         for (var subkey in frames) {
        //             var config: any = frames[subkey];
        //             var texture = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
        //         }
        //         return null;
        //     },
        //     async onRemoveStart(host,resource): Promise<any> {
        //         return Promise.resolve();
        //     },
        //     getData(host: RES.ProcessHost, resource: RES.ResourceInfo, key: string, subkey: string): any{

        //     }
        // });
        RES.processor.map("dbmv",{
            async onLoadStart(host:RES.ProcessHost, resource:RES.ResourceInfo):Promise<any>{
                //等待dbmc的文件加载解析完
                let data = await host.load(resource,RES.processor.BinaryProcessor);
                //assets/animation/fast/lightbutton2_tex.png
                let imagePath : string = resource.name.replace("ske.dbmv","tex.png");
                //获取资源信息ResourceInfo
                var r :any = RES.getResourceInfo(imagePath);
                // var r :any = (<any>host.resourceConfig).getResource(imagePath);
                //name type url {assets/animation/fast/lightbutton1_tex.pngimage,assets/animation/fast/lightbutton1_tex.png}
                if (!r) {
                    throw new RES.ResourceManagerError(1001, imagePath);
                }
                //图集需要在预加载加载完成。
                var texture : egret.Texture = await host.load(r);
                dragonBones.addMovieGroup(data,texture);
                return data;
            },
            async onRemoveStart(host,resource):Promise<any>{
                // let data = host.get(resource);
                // data.dispose();
                return Promise.resolve();
            },
            getData(host:RES.ProcessHost,resouce:RES.ResourceInfo,key:string,subKey:string):any{

            }
        });
        if( egret.MainContext.deviceType == egret.MainContext.DEVICE_PC || window.innerHeight / window.innerWidth < 1.6){
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }

        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    private textfield:egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        // facade是单例的，所以下面获取的是ApplicationFacade的实例
        GlobalAPI.facede = ApplicationFacade.getInstance();
        GlobalAPI.setStage(this.stage);
        GlobalAPI.UI.setRoot(this.stage);
        ApplicationFacade.getInstance().startup(this.stage);
    }
    
}
