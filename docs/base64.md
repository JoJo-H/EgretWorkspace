//参考项目/SelfWorkspace/codeCollection/egret/crossdomain
class CrossJsonpImageAnalyzer extends RES.ImageAnalyzer{
    private mUrls:any = {};
    
    public constructor() {
        super();
    }
    
    /**
     * @inheritDoc
     */
    public loadFile (resItem, compFunc, thisObject) {
        if (this.fileDic[resItem.name]) {
            compFunc.call(thisObject, resItem);
            return;
        }

        var url: string = RES.getVersionController().getVirtualUrl( resItem.url + '.js' );
        this.mUrls[url] = { item: resItem, func: compFunc, thisObject: thisObject };;

        CrossJsonP.sendLocal( url, this.onLoadOk, this );
    };
    
    private onLoadOk( url: string, base64: string ): void {
        var img: HTMLImageElement = document.createElement( 'img' );
        img.src = base64;
        var self = this;
        img.onload = function ( e: Event ) {
            e.currentTarget['onload'] = null;
            var data = self.mUrls[url];
            delete self.mUrls[url]; 
            var resItem = data.item;
            var compFunc = data.func; 
            resItem.loaded = true;
            var texture2: egret.Texture = new egret.Texture();
            texture2.bitmapData = new egret.BitmapData(img);
            // texture2._setBitmapData( img  as any);
            //默认ImageAnalyzer的analyzeData方法
            self.analyzeData( resItem, texture2 );
            compFunc.call( data.thisObject, resItem );
        };
        
    };
    
}