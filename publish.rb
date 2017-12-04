require "json"

# 获取传进来第一个的参数
project_path = ARGV[0]

# 返回一个字符串，由指定的项连接在一起，并使用 File::Separator(/) 进行分隔
conf_path = File.join(project_path, 'resource', 'default.res.json')
# default.res.json的配置数据
$res_obj = JSON.parse(File.read(conf_path))

# 组
$groups = $res_obj['groups']


# 迭代器
$groups.each do |item|
	if item["name"].index('sheet_')
		pack(item)
	end
end

# 删除满足block的元素。
$groups.delete_if do |item|
	item['name'].index('sheet_') != nil
end
File.write(conf_path, JSON.generate($res_obj))


def pack(group)
	puts "合并图集:" + group['name']
    items = group["keys"].split(',')
    # 删除
	if (items.length == 1 and items[0] == "") or items == nil
		$groups.delete(group_name)
	else
		files = items.map do |key|
            item = get_res_item(key);
            puts '项:'+$item
			path = item["url"]
			remove(path)
			# File.join('resource', path)
		end

		do_pack(group["name"], files)
	end
end

def do_pack(group, files)
    group_name = group.gsub('sheet_', '')
    puts 'group_name:'+$group_name

    # 图集输出路径
    output_path = File.join('resource', 'assets', 'sheet', group_name)
    puts 'output_path:'+$output_path
	`TexturePacker --max-size 1024 --data #{output_path}.json --sheet #{output_path}.png --format egret-spritesheet #{files.join(' ')}`

	`pngquant --speed 1 --force --output #{output_path}.png #{output_path}.png`

	subkeys = files.map do |file|
			file.split('/')[-1].gsub('.', '_')
        end		

	$res_obj['resources'].push({
		"url" => File.join("assets", "sheet", group_name + ".json"),
		"type" => "sheet",
		"subkeys" => subkeys.join(','),
		"name" => "#{group_name}_json"
	})

	files.each do |file|
		File.delete(file)
	end
end

def get_res_item(name)
	resources = $res_obj['resources']

	item = resources.select do |item|
		item["name"] == name
	end

	item[0]
end

def remove(path)
	resource = $res_obj['resources']

	key = path.split('/')[-1].gsub('.', '_')

	resource.delete_if do |item|
		item["name"] == key
	end
end

