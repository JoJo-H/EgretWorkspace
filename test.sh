#这是个测试脚本

releasePath=bin-release/web/171203232431
indexPath=$releasePath/index.html
function moveTo() {
	local sourcePath=$1
	local distPath=$2
    echo $distPath

	local c32=$(cal_crc32 ${sourcePath})
	distPath=${distPath/CRC/$c32}
	mv $sourcePath $distPath
	echo $c32
}
function cal_crc32() {
	local filename=$1
    # cksum $filename 会输出:  校验码 字节数 文件名
    # 然后将输出串经管道(管道符|)发给awk处理，输出格式化的串，%x:十六进制值。
	echo $(cksum $filename | awk '{printf "%x",$1}')
}

# 匹配出
libs=$(sed -n 's/.*\"lib\"\ *src=\"\([^\"]*\)\".*/\1/p' $indexPath)
tmpPath=/tmp/$(uuidgen)
echo $tmpPath
# cat命令连接文件并打印到标准输出设备上，cat经常用来显示文件的内容
for libFile in $libs
do
	cat $libFile >> $tmpPath
done

libCrc=$(moveTo $tmpPath $releasePath/lib.min.CRC.js)
