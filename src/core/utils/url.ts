
class url {

    /**
     * 
     * @desc   url参数转对象
     * @param  {String} url  default: window.location.href
     * @return {Object} 
     */
    static parseQueryString(url) {
        url = url == null ? window.location.href : url
        var search = url.substring(url.lastIndexOf('?') + 1)
        if (!search) {
            return {}
        }
        return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    }

    /**
     * 
     * @desc   对象序列化
     * @param  {Object} obj 
     * @return {String}
     */
    static stringfyQueryString(obj) {
        if (!obj) return '';
        var pairs = [];

        for (var key in obj) {
            var value = obj[key];

            if (value instanceof Array) {
                for (var i = 0; i < value.length; ++i) {
                    pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
                }
                continue;
            }

            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }

        return pairs.join('&');
    }

    static getOption(key:string):string {
        if(window.location) {
            let search = location.search;
            if(search == "") {
                return "";
            }
            search = search.slice(1);
            let searchArr : any[] = search.split('&');
            let len = searchArr.length;
            for(let i:number = 0 ; i < len ; i++) {
                let str = search[i];
                let arr : any[] = str.split('=');
                if(arr[0] == key) {
                    return arr[1];
                }
            }
        }
        return "";
    }
}