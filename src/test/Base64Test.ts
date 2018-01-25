class Base64Test {

    constructor(){
        //http://bbs.egret.com/thread-5929-1-1.html
        //http://bbs.egret.com/thread-11566-1-1.html
        this.init();
        // <img src="data:image/png;base64,iVBOR...uQmCC">---小图
    }
    private _img : eui.Image;
    init():void {
        var imgTexture : egret.Texture = <egret.Texture>RES.getRes('icon_redtips_png');
        this._img = new eui.Image(imgTexture);
        App.stage.addChild(this._img);
    }
    cache(){
        var rt : egret.RenderTexture = new egret.RenderTexture();
        rt.drawToTexture(this._img,new egret.Rectangle(0,0,this._img.width,this._img.height));
        var imageBase64 : string = rt.toDataURL('image/png');
        if(imageBase64.indexOf(",")>=0){
            imageBase64 = imageBase64.split(",")[1];
        }
        // rt.dispose();
        localStorage.setItem('imageBase64',imageBase64);
    }

    public addImage509(){
        //在引擎 5.0.9 我们内置了使用 base64 图片的异步方法。
        // egret.BitmapData.create('base64', localStorage.getItem('imageBase64'), (bitmapData) => {
        //     bmp.bitmapData = bitmapData;
        // });
    }

    public addImg2():void{
        //当前使用
        var bitmapdata : any = egret.BitmapData.create('base64', localStorage.getItem('imageBase64'));
        //去掉image/png逗号，
        bitmapdata = bitmapdata.slice(bitmapdata.indexOf(';')+1);
        var texture = new egret.Texture();
        texture.bitmapData = egret.BitmapData.create('base64',bitmapdata);
        var img : eui.Image = new eui.Image(texture);
        App.stage.addChild(img);
        img.x = img.y = 100;
    }

    addImg():void {
        var bitmapdata = egret.BitmapData.create('base64', localStorage.getItem('imageBase64'));
        var texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        var img : eui.Image = new eui.Image(texture);
        App.stage.addChild(img);
        img.x = img.y = 100;
    }

    public getTexture(base64: string):egret.Texture {
        var img: HTMLImageElement = new Image();
        img.src = base64;
        // img["avaliable"] = true;
        //当一个资源及其依赖资源已完成加载时，将触发load事件。
        img.onload = ()=>{

        }
        var texture = new egret.Texture();
        var bitmapdata = new egret.BitmapData(img);
        texture._setBitmapData(bitmapdata);
        return texture;
    }

    baseToBitmap()
    {
        // var img2: HTMLImageElement = new Image();
        // var self = this;
        // img2.onload = () => {
        //     var texture2: egret.Texture = new egret.Texture();
        //     texture2._setBitmapData(img2);
        //     self._bgImg = new egret.Bitmap();
        //     self._bgImg.texture = texture2;
        //     self._bgImg.x = 100;
        //     self._bgImg.y = 100;
        //     self._bgImg.width = 100;
        //     self._bgImg.height = 200;
        //     self.addChild(self._bgImg);
        // };

        // img2.src = base64Str; 
    }
}