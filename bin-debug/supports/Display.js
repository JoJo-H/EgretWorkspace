var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Display = (function () {
    function Display() {
    }
    Display.setFullDisplay = function (display) {
        display.width = GlobalAPI.stage.stageWidth;
        display.width = GlobalAPI.stage.stageWidth;
    };
    /**
     * 移除容器中的所有子显示对象
     * @param container 需要移除子显示对象的容器
     */
    Display.removeAllChildren = function (container) {
        while (container.numChildren > 0) {
            container.removeChildAt(0);
        }
    };
    /**
     * 移除显示对象,可以是egret的显示对象,也可以是继承组件
     * @param child 子显示对象
     */
    Display.removeFromParent = function (child) {
        if (child && child.parent) {
            child.parent.removeChild(child);
        }
    };
    Display.destoryChildren = function (container) {
        var children = container.numChildren;
        for (var i = 0; i < children; i++) {
            var item = container.getChildAt(i);
            if (item instanceof BaseComponent) {
                item.destoryData();
            }
        }
    };
    return Display;
}());
__reflect(Display.prototype, "Display");
