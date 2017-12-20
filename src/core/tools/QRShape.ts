class QRShape extends egret.Shape {
    

    private size: number;
    constructor(size: number) {
        super();

        this.size = size;
    }

    /**
     * 生成
     */
    make(msg: string): void {
        var qrcode = new qrcode.QRCode();
        qrcode.makeCode(msg);
        var points: Array<Array<boolean>> = qrcode.getPoints();

        this.graphics.clear();
        this.graphics.beginFill(0x000000, 1);

        for (var i: number = 0; i < points.length; i++) {
            var lines: Array<boolean> = points[i];

            for (var j: number = 0; j < lines.length; j++) {
                if (lines[j]) {
                    this.graphics.drawRect(this.size / 29 * i, this.size / 29 * j, this.size / 29, this.size / 29);
                }
            }
        }

        this.graphics.endFill();
    }

    /**
     * 从HTML中删除
     */
    removeFromDOM(): void {
        if (this.imgDiv) {
            var player = document.getElementsByClassName("egret-player")[0];
            player.removeChild(this.imgDiv);
        }
    }

    /**
     * 显示到HTML中，方便微信等识别二维码
     * 请在位置等确定后在执行，不然位置很有可能对不上
     */
    addToDOM(): void {
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            var player = document.getElementsByClassName("egret-player")[0];

            if (this.imgDiv == null) {
                this.imgDiv = document.createElement("div");
                this.img = document.createElement("img");
                this.imgDiv.appendChild(this.img);
                this.imgDiv.style.position = "absolute";
                this.img.style.position = "absolute";
            }
            if (this.imgDiv.parentNode == null) {
                player.appendChild(this.imgDiv);
            }

            var self = this;
            this.createImg();
            this.stage.addEventListener(egret.Event.RESIZE, function () {
                self.createImg();
            }, this)
        }
    }

    private img: HTMLImageElement;
    private imgDiv: HTMLDivElement;
    private createImg(): void {
        var renterTexture: egret.RenderTexture = new egret.RenderTexture();
        renterTexture.drawToTexture(this);

        this.img.src = renterTexture.toDataURL("image/png");

        var player = document.getElementsByClassName("egret-player")[0];
        var canvas = player.getElementsByTagName("canvas")[0];
        var playerRect = player.getBoundingClientRect();
        var canvasRect = canvas.getBoundingClientRect();

        var shouldRotate = false;

        var orientation: string = this.stage.orientation;
        if (orientation != egret.OrientationMode.AUTO) {
            shouldRotate = orientation != egret.OrientationMode.PORTRAIT && playerRect.height > playerRect.width
                || orientation == egret.OrientationMode.PORTRAIT && playerRect.width > playerRect.height;
        }

        if (shouldRotate) {
            var scaleX = canvasRect.width / canvas.height;
            var scaleY = canvasRect.height / canvas.width;
        }
        else {
            var scaleX = canvasRect.width / canvas.width;
            var scaleY = canvasRect.height / canvas.height;
        }

        var point = this.localToGlobal(0, 0);
        var x = point.x;
        var y = point.y;

        var node: any = this;
        var cX = 1;
        var cY = 1;
        var rotation = 0;
        while (node.parent) {
            cX *= node.scaleX;
            cY *= node.scaleY;
            rotation += node.rotation;

            node = node.parent;
        }

        if (shouldRotate) {
            if (orientation == egret.OrientationMode.LANDSCAPE) {//
                rotation += 90;
            }
            else {
                rotation -= 90;
            }
        }
        this.imgDiv.style.left = canvas.style.left;
        this.imgDiv.style.top = canvas.style.top;

        this.img.style.left = (point.x * scaleX * cX) + "px";
        this.img.style.top = (point.y * scaleY * cY) + "px";

        
        var transformKey = (<any>egret["web"]).getPrefixStyleName("transform");
        this.imgDiv.style[transformKey] = "rotate(" + rotation + "deg)";

        this.img.style.width = scaleX * cX * this.width + "px";
        this.img.style.height = scaleY * cY * this.height + "px";

    }
}