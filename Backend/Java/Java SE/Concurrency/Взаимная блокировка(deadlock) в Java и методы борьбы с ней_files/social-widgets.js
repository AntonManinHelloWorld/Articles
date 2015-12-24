var initSocialWidgets = (function(document){
    var result;
    function initGoogleWidget(document){
            var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
            po.src = 'https://apis.google.com/js/plusone.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    }
    function initVkWidget(){
        $.getScript("http://vk.com/js/api/openapi.js?78", function(){
            VK.init({apiId: 3417181, onlyWidgets: true});
            result.onVKLoadedHandlers.forEach(function(handler){
                handler();
            });
            result.onVKLoadedHandlers = [];
        });
    }
    function initFbWidget() {
        $.getScript("http://connect.facebook.net/en_US/all.js#xfbml=1", function () {
            FB.init({ appId: 463701690429309, status: true, cookie: true, xfbml: true });
        });
        if ($(".fb-like").length > 0) {
            if (typeof (FB) != 'undefined')
                FB.XFBML.parse();
        }
    };
    result =  function(){
        initVkWidget();
        initFbWidget();
        initGoogleWidget(document);
    };
    result.onVKLoadedHandlers = [];
    return result;
})(document);