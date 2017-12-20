
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
	"bin-debug/modules/component/BaseButton.js",
	"bin-debug/modules/component/BaseComponent.js",
	"bin-debug/modules/dataproxy/BaseDataProxy.js",
	"bin-debug/modules/manager/sound/BaseSound.js",
	"bin-debug/modules/network/http/BaseProxy.js",
	"bin-debug/modules/network/socket/ByteArrayMsg.js",
	"bin-debug/modules/network/socket/UTFMsg.js",
	"bin-debug/modules/manager/event/MyEvent.js",
	"bin-debug/modules/api/UI.js",
	"bin-debug/modules/api/UITools.js",
	"bin-debug/modules/common/ApplicationFacade.js",
	"bin-debug/modules/common/CommomMediator.js",
	"bin-debug/modules/common/Destroyable.js",
	"bin-debug/modules/common/GameShare.js",
	"bin-debug/modules/common/LightButton.js",
	"bin-debug/modules/common/NoticeDefine.js",
	"bin-debug/modules/common/QRShape.js",
	"bin-debug/modules/common/StartupCommand.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/Main.js",
	"bin-debug/modules/component/HeadCircleView.js",
	"bin-debug/modules/component/MyHSlider.js",
	"bin-debug/modules/component/ScrollTooltip.js",
	"bin-debug/modules/component/SimpleLoading.js",
	"bin-debug/modules/component/Tooltip.js",
	"bin-debug/modules/data/CountdownInfo.js",
	"bin-debug/modules/data/ParameterData.js",
	"bin-debug/modules/data/ProgressInfo.js",
	"bin-debug/modules/data/TimeRecorder.js",
	"bin-debug/supports/ProxyInfo.js",
	"bin-debug/modules/data/UnlockData.js",
	"bin-debug/modules/api/App.js",
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
	"bin-debug/modules/manager/animation/BaseFactory.js",
	"bin-debug/modules/manager/animation/DBFaseMovie.js",
	"bin-debug/modules/manager/animation/DragonMovie.js",
	"bin-debug/modules/manager/animation/MovieClip.js",
	"bin-debug/modules/manager/animation/MovieClock.js",
	"bin-debug/modules/manager/animation/MovieEvent.js",
	"bin-debug/modules/manager/animation/SequnceMovie.js",
	"bin-debug/modules/manager/event/ListenerManager.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/modules/manager/log/LogManager.js",
	"bin-debug/modules/api/Config.js",
	"bin-debug/modules/manager/sound/SoundBg.js",
	"bin-debug/modules/manager/sound/SoundEffects.js",
	"bin-debug/modules/manager/sound/SoundManager.js",
	"bin-debug/modules/api/DataCenter.js",
	"bin-debug/modules/network/http/MultiProxy.js",
	"bin-debug/modules/network/http/ProxyCache.js",
	"bin-debug/modules/network/http/ProxyEvent.js",
	"bin-debug/modules/network/http/ProxyTime.js",
	"bin-debug/modules/network/http/ProxyUpdate.js",
	"bin-debug/modules/network/http/SingleProxy.js",
	"bin-debug/modules/network/ListenerMediator.js",
	"bin-debug/modules/network/network.js",
	"bin-debug/modules/network/NotifyName.js",
	"bin-debug/modules/network/socket/ArrayBufferUtil.js",
	"bin-debug/modules/network/socket/BaseMsg.js",
	"bin-debug/modules/api/SingletonFactory.js",
	"bin-debug/modules/network/socket/ByteArrayMsgByProtobuf.js",
	"bin-debug/modules/network/socket/MsgUtil.js",
	"bin-debug/modules/network/socket/Socket.js",
	"bin-debug/modules/api/Tools.js",
	"bin-debug/modules/network/socket/UTFMsgByJson.js",
	"bin-debug/modules/network/SocketMediator.js",
	"bin-debug/modules/tools/AnchorUtil.js",
	"bin-debug/modules/tools/DelayOptManager.js",
	"bin-debug/modules/tools/DeviceUtils.js",
	"bin-debug/modules/tools/FrameDelay.js",
	"bin-debug/modules/tools/FrameExecutor.js",
	"bin-debug/modules/tools/KeyboardUtils.js",
	"bin-debug/modules/tools/LocationProperty.js",
	"bin-debug/modules/tools/MathUtils.js",
	"bin-debug/modules/tools/RandomUtils.js",
	"bin-debug/modules/tools/StringBuffer.js",
	"bin-debug/modules/tools/TimerManager.js",
	"bin-debug/modules/utils/array.js",
	"bin-debug/modules/utils/display.js",
	"bin-debug/modules/utils/fun.js",
	"bin-debug/modules/utils/md5.js",
	"bin-debug/modules/utils/num.js",
	"bin-debug/modules/utils/obj.js",
	"bin-debug/modules/utils/other.js",
	"bin-debug/modules/utils/pool.js",
	"bin-debug/modules/utils/regexp.js",
	"bin-debug/modules/utils/str.js",
	"bin-debug/modules/utils/time.js",
	"bin-debug/modules/utils/url.js",
	"bin-debug/supports/ListenerCallback.js",
	"bin-debug/supports/LoginCallback.js",
	"bin-debug/supports/SocketCallback.js",
	"bin-debug/test/GeneratorTestObj.js",
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