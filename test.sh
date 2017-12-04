#这是个测试脚本

releasePath=bin-release/web/171204121601
indexPath=$releasePath/index.html
releaseResourcePath=$releasePath/resource
function moveTo() {
	local sourcePath=$1
	local distPath=$2

	# 获取源文件的crc32的十六进制
	local c32=$(cal_crc32 ${sourcePath})
	# 处理后bin-release/web/171204121601/lib.min.CRC.js
	# 处理后bin-release/web/171204121601/lib.min.f83279b9.js
	# 将distPath中的CRC变为$c32
	distPath=${distPath/CRC/$c32}
	# mv命令可以用来将源文件移至一个目标文件中，mv源文件会消失
	mv $sourcePath $distPath
	echo $c32
}
function cal_crc32() {
	local filename=$1
    # cksum $filename 会输出:  校验码 字节数 文件名
    # 然后将输出串经管道(管道符|)发给awk处理，输出格式化的串，%x:十六进制值。
	echo $(cksum $filename | awk '{printf "%x",$1}')
}

# 匹配打印出indexPath文件中的所有lib库的min.js文件名称
libs=$(sed -n 's/.*\"lib\"\ *src=\"\([^\"]*\)\".*/\1/p' $indexPath)
# 输出libs/modules/egret/egret.min.js libs/modules/egret/egret.web.min.js等
echo libs,$libs

tmpPath=/tmp/$(uuidgen)
# /tmp/A6A72B6D-44D2-4650-B68D-0C0148D286FB
echo tmpPath,$tmpPath
# cat命令连接文件并打印到标准输出设备上，cat经常用来显示文件的内容
# 执行下面语句后已被压缩进/tmp/A6A72B6D-44D2-4650-B68D-0C0148D286FB文件中
for libFile in $libs
do
	cat $libFile >> $tmpPath
done


function moveConf(){
	local confPath=$(ls $releaseResourcePath/config_*)
	local c32=$(cal_crc32 $confPath)

	local distPath=$releaseResourcePath/config_$c32.json
	mv $confPath $distPath
	echo $c32
}


libCrc=$(moveTo $tmpPath $releasePath/lib.min.CRC.js)
# mainCrc=$(moveTo $releasePath/main.min.js $releasePath/game.min.CRC.js)
# themeCrc=$(moveTo $releaseResourcePath/default.thm.json $releaseResourcePath/theme_CRC.json)
# confCrc=$(moveConf)
