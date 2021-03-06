console.log('gdlUtil.js Start');

var Util = (function(){
    function Util(){}
    
    
    //     Util.basePath = './lib/js/';
    Util.loadCSS = function(path){
        try{
            let link = document.createElement('link');
            link.href = path;
            link.rel='stylesheet';
            document.head.appendChild(link);
            
        }
        catch(err){console.error(err);}

    }
    /**
     * configs - [attribute]
     * 
     * jsfileName = javaScript file Name
     * path = javaScript logic file location
     * async = loading async true or false
     * onload =  script onload callback (fullPath)
     * 
     * position = body or head 
     */
// path 만 넣으면 비동기 로딩 
    Util.include = function(path,configs){
        try{
            // {} 형태일떄
            if(typeof path==='object' && typeof configs ==='undefined'){
                var configs = path;
                path = configs.path;
                if(typeof path==='undefined')
                    throw new Error('path is Undefined');
            }
            var async =configs!==undefined ?
            typeof configs==='boolean' ?
            configs :
            (configs.async!==undefined ? 
            configs.async : true) : true;

            var pathArr = path.replace(/\.js/gi,'').split('/');
            var fullPath = path;
            var jsfileName = configs!==undefined?
                            (configs.jsfileName !==undefined ?
                            configs.jsfileName : path) :
                            path;
        // create Script tag
            var scriptTags = document.createElement('script');
                scriptTags.setAttribute('src',fullPath);
                scriptTags.async = async;

            var onload = configs!==undefined? 
                            configs.onload : 
                            'undefined';
            if(typeof onload==='function'){
                scriptTags.onload = function (){
                    onload(fullPath);
                }
            }
            else {
                scriptTags.onload = function(){
                    console.log('onLoad Script >> '+ fullPath);
                }
            };

            document.head.appendChild(scriptTags);
        }
        catch(err){
            console.error(err);
        }
    }
    Util.generatedUUID = function(){
        var d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
                d += performance.now(); //use high-precision timer if available
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
    }

    Util.generatedUUID2 = function(){
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    Util.isObject = function(obj){
        try{
            var isObj;
            if(typeof obj!=="object"){
                throw new Error(obj+' is Not Object');
            }
            else if(Object.keys(obj).length===0){
                throw new Error('this is Empty');
            }
            else if(obj instanceof Array){
                throw new Error('this is Array');
            }
            isObj = true;
            return isObj;
        }
        catch(err){
            console.debug(err);
            return false;
        }

    }

    Util.getBrowser = function(){
            // 크롬
        return _browser = typeof _browser!=='undefined' ? _browser  : 
            !!navigator.userAgent.match(/chrome/i) ? 'chrome' :
            //모바일
            (navigator.userAgent.match('CriOS') || navigator.userAgent.match(/mobile/i)) ? 'mobile' :
            //사파리
            !!navigator.userAgent.match(/macintosh/i) ? 'safari' :
            //아이패드 아이팟 아이폰
            !!navigator.userAgent.match(/iPad|iPhone|iPod/i) ? 'iPhone' :
            // IE
            !!navigator.userAgent.match(/Trident/i) ? 'ie' : 'unknown';
    }
    return Util;

})();
var gdlUtil = {

    removeCursors: function(element){
        if(element.style !=null){
            element.style.cursor = '';
        }
        var children = element.childNodes;

        if(children !=null){
            var childCount = children.length;
            for(var i=0;i<childCount;i+=1){
                gdlUtil.removeCursors(children[i]);
            }
        }

    }
}


console.log('gdlUtil.js End');


