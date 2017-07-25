
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"resourcemanager/resourcemanager.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"libs/modules/dragonBones/dragonBones.js",
	"libs/modules/is/is.js",
	"libs/modules/moment/moment.js",
	"libs/modules/numeral/numeral.js",
	"libs/modules/puremvc/puremvc.js",
	"polyfill/promise.js",
	"bin-debug/supports/BaseComponent.js",
	"bin-debug/modules/game/2048/Game2048View.js",
	"bin-debug/Main.js",
	"bin-debug/modules/common/ApplicationFacade.js",
	"bin-debug/modules/common/CommonMutation.js",
	"bin-debug/modules/common/MyCustomEvent.js",
	"bin-debug/modules/common/NoticeDefine.js",
	"bin-debug/modules/common/StartupCommand.js",
	"bin-debug/modules/data/UserData.js",
	"bin-debug/modules/game/2048/Game2048Data.js",
	"bin-debug/modules/game/2048/Game2048OverView.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/modules/game/2048/GridItem.js",
	"bin-debug/modules/main/Home.js",
	"bin-debug/modules/main/Menu.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/supports/DataCenter.js",
	"bin-debug/supports/Display.js",
	"bin-debug/supports/Global.js",
	"bin-debug/supports/GlobalAPI.js",
	"bin-debug/supports/UI.js",
	"bin-debug/ThemeAdapter.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixeWidth",
		contentWidth: 720,
		contentHeight: 1280,
		showPaintRect: false,
		showFPS: true,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.5",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};