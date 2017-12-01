
class display {

    public static setFullDisplay(display:egret.DisplayObject):void {
        display.width = App.stage.stageWidth;
        display.width = App.stage.stageWidth;
    }

    /**
     * 移除容器中的所有子显示对象
     * @param container 需要移除子显示对象的容器
     */
    static removeAllChildren(container:egret.DisplayObjectContainer):void {
        while (container.numChildren > 0) {
            container.removeChildAt(0);
        }
    }

    /**
     * 移除显示对象,可以是egret的显示对象,也可以是继承组件
     * @param child 子显示对象
     */
    static removeFromParent(child:egret.DisplayObject|BaseComponent):void {
        if ( child && child.parent) {
            child.parent.removeChild(child);
        }
    }

    static destoryChildren(container:any):void {
        var children = container.numChildren;
        for (var i = 0; i < children; i ++) {
            var item = container.getChildAt(i);
            if (item instanceof BaseComponent) {
                item.destoryData();
            }
        }
    }

    static getHostComponent(display:egret.DisplayObject):BaseComponent {
        var host:any = display.parent;
        if (this.isHostComponentType(host)) {
            return host;
        }
        while (host && !(this.isHostComponentType(host))) {
            host = host.parent;
        }

        if (this.isHostComponentType(host)) {
            return host;
        }

        return null;
    }

    static isHostComponentType(host:any):boolean {
        // || host instanceof meru.ItemRenderer);
        return host instanceof BaseComponent ;
        
    }

    /**
     * 创建一个Bitmap
     * @param resName resource.json中配置的name
     * @returns {egret.Bitmap}
     */
    static createBitmap(resName:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(resName);
        result.texture = texture;
        return result;
    }

    /**
     * 创建一张Gui的图片
     * @param resName
     * @returns {egret.Bitmap}
     */
    static createEuiImage(resName:string):eui.Image {
        var result:eui.Image = new eui.Image();
        var texture:egret.Texture = RES.getRes(resName);
        result.source = texture;
        return result;
    }
}