# 版本名称 时间串
versionName=$(date +%Y%m%d%H%M%S)
# 发布类型
publishType='web'
outPath=""

# cd 到目录 pwd
scriptPath=$(cd `dirname $0`;pwd)
echo $scriptPath
cd $scriptPath

# 重置
function resetResStatus() {
	git checkout -- resource/
	rm -rf resource/assets/sheet/
}

function usage() {
	echo "usage: publish [-v releaseName] [-t publishType] [-o versionOutFile]
       releaseName=now(default)
       publishType=web(default)|native|runtime"
}

# cksum命令是检查文件的CRC是否正确
function cal_crc32() {
	local filename=$1
    # cksum $filename 会输出:  校验码 字节数 文件名
    # 然后将输出串经管道(管道符|)发给awk处理，输出格式化的串，%x:十六进制值。
	echo $(cksum $filename | awk '{printf "%x",$1}')
}

#不知道什么意思
# while true ; do

#         case "$1" in

#                 -v|--version) versionName=$2 ; shift 2 ;;
# 				-t|--type) publishType=$2 ; shift 2 ;;
# 				-h|--help) usage; exit 1 ;;
# 				-o|--output) outPath=$2; shift 2 ;;
#                 *) break ;;

#         esac
# done

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


# Sed主要用来自动编辑一个或多个文件；-n仅显示script处理后的结果；参数：指定待处理的文本文件列表。
libs=$(sed -n 's/.*\"lib\"\ *src=\"\([^\"]*\)\".*/\1/p' $indexPath)
# 会输出index.html中所有的lib的文件名称列表
echo $libs

# uuidgen - 可生成一个UUID到标准输出
tmpPath=/tmp/$(uuidgen)


# cat 创建一个文件 ,将几个文件合并为一个文件$cat file1 file2 > file
# cat命令连接文件并打印到标准输出设备上，cat经常用来显示文件的内容
for libFile in $libs
do
	cat $libFile >> $tmpPath
done

# 移动文件
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

	local distPath=$releaseResourcePath/config_$c32.json
	mv $confPath $distPath
	echo $c32
}
# 创建libs库的压缩文件lib.min.CRC.js
libCrc=$(moveTo $tmpPath $releasePath/lib.min.CRC.js)
# 创建game.min.js
mainCrc=$(moveTo $releasePath/main.min.js $releasePath/game.min.CRC.js)
# 
themeCrc=$(moveTo $releaseResourcePath/default.thm.json $releaseResourcePath/theme_CRC.json)
# confCrc=$(moveConf)


# testIndexPath=platfiles/bearjoy/index.html
# if [ -f $testIndexPath ];then
# 	cp $testIndexPath $releasePath/index.html
# fi


# rm $releaseResourcePath/default.res.json
# rm -rf $releaseResourcePath/assets
# rm -rf $releaseResourcePath/config
# rm -rf $releaseResourcePath/eui_skins
# rm -rf $releaseResourcePath/ui
# rm -rf $releasePath/resourcemanager
# rm -rf $releasePath/polyfill
# rm -rf $releasePath/libs
# rm -rf $releasePath/backup
# rm -rf $releasePath/js


# echo "local debug url:bin-release/web/${versionName}/?codeVer=${mainCrc}.${libCrc}&resVer=${confCrc}.${themeCrc}"

# function printVersion() {
# 	echo "codeVer=${mainCrc}.${libCrc}"
# 	echo "resVer=${confCrc}.${themeCrc}"
# }

# printVersion

# if [ "$outPath" != "" ];then
# 	printVersion >$outPath
# fi

# resetResStatus