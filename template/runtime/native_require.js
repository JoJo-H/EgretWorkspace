
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
	"libs/modules/jszip/jszip.js",
	"libs/modules/protobuf/protobuf.js",
	"libs/modules/qrcode/qrcode.js",
	"libs/modules/weixinapi/weixinapi.js",
	"polyfill/promise.js",
	"bin-debug/modules/component/Button.js",
	"bin-debug/core/manager/sound/BaseSound.js",
	"bin-debug/core/network/http/BaseProxy.js",
	"bin-debug/core/network/socket/ByteArrayMsg.js",
	"bin-debug/core/network/socket/UTFMsg.js",
	"bin-debug/modules/component/BaseButton.js",
	"bin-debug/modules/component/BaseComponent.js",
	"bin-debug/modules/dataproxy/BaseDataProxy.js",
	"bin-debug/core/tools/TimerManager.js",
	"bin-debug/core/manager/animation/DBFaseMovie.js",
	"bin-debug/core/manager/animation/DragonMovie.js",
	"bin-debug/core/manager/animation/MovieClip.js",
	"bin-debug/core/manager/animation/MovieClock.js",
	"bin-debug/core/manager/animation/MovieEvent.js",
	"bin-debug/core/manager/animation/SequnceMovie.js",
	"bin-debug/core/manager/event/ListenerManager.js",
	"bin-debug/core/manager/event/MyEvent.js",
	"bin-debug/core/manager/log/LogManager.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/core/manager/sound/SoundBg.js",
	"bin-debug/core/manager/sound/SoundEffects.js",
	"bin-debug/core/manager/sound/SoundManager.js",
	"bin-debug/core/api/Config.js",
	"bin-debug/core/network/http/MultiProxy.js",
	"bin-debug/core/network/http/ProxyCache.js",
	"bin-debug/core/network/http/ProxyEvent.js",
	"bin-debug/core/network/http/ProxyTime.js",
	"bin-debug/core/network/http/ProxyUpdate.js",
	"bin-debug/core/network/http/SingleProxy.js",
	"bin-debug/core/network/ListenerMediator.js",
	"bin-debug/core/network/network.js",
	"bin-debug/core/network/NotifyName.js",
	"bin-debug/core/network/socket/ArrayBufferUtil.js",
	"bin-debug/core/network/socket/BaseMsg.js",
	"bin-debug/core/api/DataCenter.js",
	"bin-debug/core/network/socket/ByteArrayMsgByProtobuf.js",
	"bin-debug/core/network/socket/MsgUtil.js",
	"bin-debug/core/network/socket/Socket.js",
	"bin-debug/core/api/SingletonFactory.js",
	"bin-debug/core/network/socket/UTFMsgByJson.js",
	"bin-debug/core/network/SocketMediator.js",
	"bin-debug/core/supports/ListenerCallback.js",
	"bin-debug/core/supports/LoginCallback.js",
	"bin-debug/core/supports/ProxyInfo.js",
	"bin-debug/core/supports/SocketCallback.js",
	"bin-debug/core/tools/AnchorUtil.js",
	"bin-debug/core/tools/DelayOptManager.js",
	"bin-debug/core/tools/DeviceUtils.js",
	"bin-debug/core/tools/FrameDelay.js",
	"bin-debug/core/tools/FrameExecutor.js",
	"bin-debug/core/tools/GameShare.js",
	"bin-debug/core/tools/KeyboardUtils.js",
	"bin-debug/core/tools/LocationProperty.js",
	"bin-debug/core/tools/MathUtils.js",
	"bin-debug/core/tools/QRShape.js",
	"bin-debug/core/tools/RandomUtils.js",
	"bin-debug/core/tools/ResValidateTool.js",
	"bin-debug/core/tools/StringBuffer.js",
	"bin-debug/core/api/App.js",
	"bin-debug/core/utils/array.js",
	"bin-debug/core/utils/display.js",
	"bin-debug/core/utils/fun.js",
	"bin-debug/core/utils/md5.js",
	"bin-debug/core/utils/num.js",
	"bin-debug/core/utils/obj.js",
	"bin-debug/core/utils/other.js",
	"bin-debug/core/utils/pool.js",
	"bin-debug/core/utils/regexp.js",
	"bin-debug/core/utils/str.js",
	"bin-debug/core/utils/time.js",
	"bin-debug/core/utils/url.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/Main.js",
	"bin-debug/modules/common/ApplicationFacade.js",
	"bin-debug/modules/common/CommomMediator.js",
	"bin-debug/modules/common/Destroyable.js",
	"bin-debug/modules/common/NoticeDefine.js",
	"bin-debug/modules/common/StartupCommand.js",
	"bin-debug/core/api/Tools.js",
	"bin-debug/core/api/UI.js",
	"bin-debug/core/api/UITools.js",
	"bin-debug/modules/component/HeadCircleView.js",
	"bin-debug/modules/component/LightButton.js",
	"bin-debug/modules/component/MyHSlider.js",
	"bin-debug/modules/component/ScrollTooltip.js",
	"bin-debug/modules/component/SimpleLoading.js",
	"bin-debug/modules/component/Tooltip.js",
	"bin-debug/modules/data/CountdownInfo.js",
	"bin-debug/modules/data/ParameterData.js",
	"bin-debug/modules/data/ProgressInfo.js",
	"bin-debug/modules/data/TimeRecorder.js",
	"bin-debug/modules/data/UnlockData.js",
	"bin-debug/core/manager/animation/BaseFactory.js",
	"bin-debug/modules/dataproxy/LoginProxy.js",
	"bin-debug/modules/dataproxy/SeverEvent.js",
	"bin-debug/modules/dataproxy/UserProxy.js",
	"bin-debug/modules/gameModules/2048/Game2048Data.js",
	"bin-debug/modules/gameModules/2048/Game2048OverView.js",
	"bin-debug/modules/gameModules/2048/Game2048View.js",
	"bin-debug/modules/gameModules/2048/GridItem.js",
	"bin-debug/modules/gameModules/GameDefine.js",
	"bin-debug/modules/gameModules/GameMediator.js",
	"bin-debug/modules/gameModules/PanelGames.js",
	"bin-debug/modules/gameModules/turntable/GameTurntableView.js",
	"bin-debug/modules/interfaces/IDestroyable.js",
	"bin-debug/modules/main/Home.js",
	"bin-debug/modules/main/Menu.js",
	"bin-debug/test/Base64Test.js",
	"bin-debug/test/GeneratorTestObj.js",
	"bin-debug/test/InterfaceTest.js",
	"bin-debug/test/JszipTest.js",
	"bin-debug/test/md5Test.js",
	"bin-debug/test/PromiseTestObj.js",
	"bin-debug/test/ProxyTestObj.js",
	"bin-debug/test/TestManage.js",
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
		showFPS: false,
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