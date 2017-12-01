interface ITextShareInfo {
    title:string;
    description:string;
    imgUrl:string;
    link:string;
    type?:string;
}

class GameShare {
    static getIcon(path:string) {
        //share/icon_share_1.jpg
        var pathname:string = window.location.pathname;
        if (pathname[pathname.length - 1] == '/') {
            pathname += 'index.html';
        }
        return window.location.origin + "/" +
               pathname.split('/').filter(s=>!!s).slice(0, -1).join('/') + "/" +
               "resource/assets/" + path
    }

    static getUrl(...queryString) {
        var url = '';
        var last = '';
        if (url.indexOf('?') > -1) {
            last = '&';
        } else {
            last = '?';
        }

        if (queryString.length > 0) {
            url += last;

            var query = [];

            for (var i = 0, len = queryString.length; i < len; i += 2) {
                var key = queryString[i];
                var val = queryString[i + 1];
                query.push(key + '=' + encodeURIComponent(val));
            }

            url += query.join('&');
        }

        return url;
    }

    private static shareArr:ITextShareInfo[] = [
        {
            title   : "银行嫌我的钱太多给我退回来了?",
            description    : "他们说整个银行只存我的钱，风险太大，所以退给我了???~",
            imgUrl  : "https://bearjoy.tcdn.myqcloud.com/youqianren/common/icon_share6.jpg",
            link    : ""
        },{
            title   : "一个很厉害的东西",
            description    : "来来来，我给你看个宝贝～",
            imgUrl  : "https://bearjoy.tcdn.myqcloud.com/youqianren/common/icon_share5.jpg",
            link    : ""
        },{
            title   : "今天谁都不能下车！",
            description    : "等这个老奶奶过完马路，我们再走",
            imgUrl  : "https://bearjoy.tcdn.myqcloud.com/youqianren/common/icon_share1.jpg",
            link    : ""
        },{
            title   : "我真的是股东",
            description    : "我，秦始黄，打钱。",
            imgUrl  : "https://bearjoy.tcdn.myqcloud.com/youqianren/common/icon_share2.jpg",
            link    : ""
        },{
            title   : "柴可夫骆驼斯基说过",
            description    : "抱歉，有钱是真的能为所欲为的",
            imgUrl  : "https://bearjoy.tcdn.myqcloud.com/youqianren/common/icon_share3.jpg",
            link    : ""
        },{
            title   : "江南皮革厂倒闭了，小姨子带着钱逃跑了！",
            description    : "但是，她金条好像忘记拿了",
            imgUrl  : "https://bearjoy.tcdn.myqcloud.com/youqianren/common/icon_share4.jpg",
            link    : ""
        }
    ];

    static pureShareText(index:number,...queryString):Promise<void> {
        var shareInfo : ITextShareInfo = this.shareArr[index];
        shareInfo.link = this.getUrl(...queryString);
        console.log('分享地址：',shareInfo.link);
        return new Promise<void>((resolve) => {
            //分享sdk接口
        });
    }

    static shareText(index:number,...queryString):Promise<void> {
        var num = Math.floor(Math.random()*6);
        index = index >= 0 && this.shareArr.length > index ? index : num;
        return GameShare.pureShareText(index,...queryString);
    }

    static initShare():Promise<void> {
        var num = Math.floor(Math.random()*6);
        var shareInfo : ITextShareInfo = this.shareArr[num];
        shareInfo.link = this.getUrl();
        return new Promise<void>((resolve) => {
            //初始化分享内容
        });
    }

    private static imageRenderMap:{[name:string]: egret.RenderTexture} = {};

    private static _doImage(texture:egret.RenderTexture) {
        this.createHTMLElement();

        this._htmlDiv.style.display = '';
        this._htmlImage.src = texture.toDataURL('image/jpg');

        this.onResize();
    }

    private static doImage(fileName:string, texture:egret.Texture | egret.RenderTexture, hasHead:boolean, ...queryString) {
        if (texture instanceof egret.RenderTexture) {
            this._doImage(texture);
        } else {
            var bmp = new egret.Bitmap(texture);
            var img = new egret.RenderTexture();
            var qrcode = new QRShape(190);
            qrcode.make(this.getUrl(...queryString));
            qrcode.x = 362;
            qrcode.y = 899;

            qrcode.scaleX = 190 / qrcode.width;
            qrcode.scaleY = 190 / qrcode.height;

            var container = new egret.DisplayObjectContainer();
            container.addChild(bmp);

            if (hasHead) {

                var label = new eui.Label('UserName');
                label.width = 90;
                label.height = 90;
                label.size = 20;
                label.textColor = 0;
                label.lineSpacing = 5;
                label.borderColor = 0;
                label.textAlign = egret.HorizontalAlign.CENTER;
                label.verticalAlign = egret.VerticalAlign.MIDDLE;

                label.x = 105;
                label.y = 819;

                container.addChild(label);
            }

            container.addChild(qrcode);
            img.drawToTexture(container);

            this.imageRenderMap[fileName] = img;

            this._doImage(img);
        }
    }

    private static _htmlImage:HTMLImageElement;
    private static _htmlSpan:HTMLSpanElement;
    private static _htmlDiv:HTMLDivElement;
    private static createHTMLElement() {
        if (this._htmlDiv) {
            return;
        }
        var div  = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = "0px";
        div.style.top = "0px";
        div.style.bottom = "0px";
        div.style.right = "0px";
        div.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        div.style.overflow = "hidden";
        this._htmlDiv = div;
        var long = false;
        div.addEventListener("touchstart", () => {
            long = false;
            egret.setTimeout(() => {
                long = true;
            }, this, 300);
        });
        div.addEventListener("touchend", () => {
            if (!long) {
                div.style.display = "none";
            }
        })

        var htmlImg:HTMLImageElement = <any>document.createElement("IMG");
        div.appendChild(htmlImg);
        this._htmlImage = htmlImg;

        var span = document.createElement("SPAN");
        span.innerHTML = "长按保存图片邀请<br />邀请的新玩家将会成为你的好友";
        span.style.fontSize = "18px";
        span.style.color = "#ccad1e";
        span.style.width = "100%";
        span.style.height = "50px";
        span.style.textAlign = "center";
        span.style.fontWeight = "bold";
        span.style.position = "absolute";
        span.style.top = "10px";
        div.appendChild(span);

        htmlImg.id = "qrimg";
        htmlImg.style.position = "absolute";


        this._htmlSpan = span;

        document.body.appendChild(div);
    }

    private static onResize() {
        if (this._htmlDiv.style.display == 'none') {
            return;
        }

        var spanH = 70;

        var cH = document.body.clientHeight - spanH;
        var cW = document.body.clientWidth;

        var imgW = 658;
        var imgH = 1084;
        var imgFactor = imgW / imgH;

        var pageFactor = cW / cH;

        var scale = 0;
        if (pageFactor < imgFactor) {
            scale = cW / (imgW + 50);
        } else {
            scale = cH / (imgH + 50);
        }

        this._htmlImage.height = imgH * scale;
        this._htmlImage.width = imgW * scale;
        this._htmlImage.style.left = (document.body.clientWidth - this._htmlImage.width) / 2 + "px";
        this._htmlImage.style.top = spanH + "px";
    }

    // private static _preloading:boolean = false;
    // private static _head:egret.Texture;
    // static get head():egret.Texture {
    //     if (this._head) {
    //         return this._head;
    //     }
    //     return RES.getRes('icon_forever_png');
    // }
    // static preloadHead() {
    //     if (!this._preloading) {
    //         this._preloading = true;
    //         var pic = PUser.getCache("i.pic");
    //         try {
    //             RES.getResByUrl(pic, (e) => {
    //                 this._head = e;
    //             }, this, 'image');
    //         }catch (e) {
    //         }
    //     }
    // }

    static shareImage(...queryString) { 
        var shareIdx = Math.floor(1+Math.random()*3);
        var shareFileName = 'share_pic_' + shareIdx + '_jpg';

        var hasHead = shareIdx != 1;

        if (this.imageRenderMap[shareFileName]) {
            this.doImage(shareFileName, this.imageRenderMap[shareFileName], hasHead, ...queryString);
        } else {
            var res = RES.getRes(shareFileName);
            if (!res) {
                RES.getResAsync(shareFileName).then((texture) => {
                    this.doImage(shareFileName, texture, hasHead, ...queryString);
                });
            } else {
                this.doImage(shareFileName, res, hasHead, ...queryString);
            }
        }
    }
}