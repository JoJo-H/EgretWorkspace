

class JszipTest {

    private _zip : JSZip;
    constructor(){
        this._zip = Config.getZip();
    }
    private test():void {
        //读取数据
        var json = this._zip.file('errorcode.json').asText();
        console.log(JSON.parse(json));

        //读取图片  参考教程：https://segmentfault.com/a/1190000002669262
        var buffer : any = this._zip.file("fire.png").asArrayBuffer();
        var base64 = this.arrayBufferToBase64(buffer);
        base64 = "data:image/png;base64," + base64;
        
        var img:eui.Image = new eui.Image();
        var texture: egret.Texture = buffer;
        App.stage.addChild(img);
    }
    private arrayBufferToBase64( buffer ) {  
        var binary = '';  
        var bytes = new Uint8Array( buffer );  
        var len = bytes.byteLength;  
        for (var i = 0; i < len; i++) {  
            binary += String.fromCharCode( bytes[ i ] );  
        }
        //btoa,将ascii字符串或二进制数据转换成一个base64编码过的字符串,该方法不能直接作用于Unicode字符串.  
        return window.btoa( binary );  
    }
}