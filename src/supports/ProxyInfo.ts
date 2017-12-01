function _p_(moddo, p, mask = true, cache = false, dataMerge = false, delay = null):ProxyInfo {
    
        return {
    
            moddo: moddo,
    
            params: p,
    
            mask: mask,
    
            cache: cache,
    
            dataMerge: dataMerge,
    
            delay: delay
    
        }
    
    }

var PUser = {
    
    /*** 用户-用户信息 ***/
    getInfo: function(cache?:boolean,mask?:boolean,dataMerge?:boolean,delay?:any): ProxyInfo {
        return _p_("User.getInfo", {}, mask, cache, dataMerge, delay);
    },
    getCache: function(path, defVal = null):any {
		return {};
	},
	isCache: function():boolean{
		return true;
	},
    /*** 用户-日志上传 ***/
	uploadLog: function(logStr?:any,cache?:boolean,mask?:boolean,dataMerge?:boolean,delay?:any): ProxyInfo {
		return _p_("User.uploadLog", {logStr:logStr}, mask, cache, dataMerge, delay);
	}
}