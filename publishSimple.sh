versionName=$(date +%Y%m%d%H%M%S)
publishType='web'
outPath=""

scriptPath=$(cd `dirname $0`;pwd)
cd $scriptPath

function resetResStatus() {
	git checkout -- resource/
	rm -rf resource/assets/sheet/
}


# ruby publish.rb -p . -t

# if [ "$?" == "100" ]; then
# 	exit 100
# fi

resetResStatus

egret build -e
egret publish --version $versionName

releasePath=bin-release/web/$versionName

# ruby publish.rb -p .

indexPath=$releasePath/index.html

releaseResourcePath=$releasePath/resource

res publish . $releasePath
euibooster . $releasePath


libs=$(sed -n 's/.*\"lib\"\ *src=\"\([^\"]*\)\".*/\1/p' $indexPath)
tmpPath=/tmp/$(uuidgen)
for libFile in $libs
do
	cat $libFile >> $tmpPath
done

function cal_crc32() {
	local filename=$1
	echo $(cksum $filename | awk '{printf "%x",$1}')
}

function moveTo() {
	local sourcePath=$1
	local distPath=$2

	local c32=$(cal_crc32 ${sourcePath})
	distPath=${distPath/CRC/$c32}
	mv $sourcePath $distPath
	echo $c32
}

function moveConf(){
	local confPath=$(ls $releaseResourcePath/config_*)
	local c32=$(cal_crc32 $confPath)

	local distPath=$releaseResourcePath/config.json
	mv $confPath $distPath
	echo $c32
}


libCrc=$(moveTo $tmpPath $releasePath/lib.min.js)
mainCrc=$(moveTo $releasePath/main.min.js $releasePath/game.min.js)
themeCrc=$(moveTo $releaseResourcePath/default.thm.json $releaseResourcePath/default.thm.json)
confCrc=$(moveConf)


testIndexPath=publishSimpleIndex.html
if [ -f $testIndexPath ];then
	cp $testIndexPath $releasePath/index.html
fi

# 删除多余的文件及目录
rm $releaseResourcePath/default.res.json
rm -rf $releaseResourcePath/assets
rm -rf $releaseResourcePath/config
rm -rf $releaseResourcePath/eui_skins
rm -rf $releaseResourcePath/ui
rm -rf $releasePath/resourcemanager
rm -rf $releasePath/polyfill
rm -rf $releasePath/libs
rm -rf $releasePath/backup
rm -rf $releasePath/js



function printVersion() {
	echo "codeVer=${mainCrc}.${libCrc}"
	echo "resVer=${confCrc}.${themeCrc}"
}

printVersion
