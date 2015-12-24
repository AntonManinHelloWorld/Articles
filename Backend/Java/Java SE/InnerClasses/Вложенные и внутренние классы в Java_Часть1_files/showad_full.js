function bswad(userDefinedParams, sectionId, modeVisibilityOnly, section_type, setfallback) {
    return (function (window, document, undefined) {
        var baseUrl = ("https:" === document.location.protocol ? "https://" : "http://") + "ads.betweendigital.com",
            bannerParams = restoreBannerParams(),
            bannerUrl = getBannerUrl(),
            isBannerShown = false,
            container = document.getElementById("b_script_" + sectionId),
            body = document.body,
            hiddens = [];
            havebanner = 0;

        getHiddens();
        if(hiddens.length > 0) {
            return false;
        }

        mobilecheck = function() {
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return !!check;
        }
        var isMobile = mobilecheck(); 
        if (isMobile == false && section_type == 'mobile') {
            return false;
        }

        function getHiddens() {
            var element = container;
            do {
                if (
                    parseInt(element.style.opacity) === 0 || 
                    element.style.display == 'none' || 
                    element.style.visibility == 'hidden' || 
                    parseInt(element.style.width) === 0 || 
                    parseInt(element.style.height) === 0
                ) {
                    hiddens.push(element);
                }
                element = element.parentNode;
                
            } while (body !== element); 
        }

        function addEventListener(el, event, callback) {
            if (el.addEventListener) {
                el.addEventListener(event, callback, false);
            } else {
                el.attachEvent("on" + event, callback);
            }
        }

        function isArray(array) {
            return Object.prototype.toString.call(array) === "[object Array]";
        }

        function getBannerElement() {
            return document.getElementById("btw_ad_" + sectionId);
        }

        function getBannerUrl() {
            try {
                var td = top.document;
                var rr = td.referrer;
            } catch (err) {}
            
            var params = ["ref=" + getReferrerUrl(), "tz=" + getTimezoneOffset(), "fl=" + getFlashVersion(), "pos=" + getPosition(), "frl=" + getIframeLevel(), "ord=" + Math.random() * 10000000000000000];
            if(typeof rr != 'undefined' && rr.length > 0) params.push("rr="+encodeURIComponent(rr));
            else if(typeof rr != 'undefined' && rr == "") params.push("rr=direct");

            if (window.location.origin == baseUrl) {
                params.push("enforce_eeni=1");
            }

            for (var param in bannerParams) {
                if (!bannerParams.hasOwnProperty(param))
                    continue;

                params.push(param + "=" + bannerParams[param]);
            }

            return baseUrl + "/" + bannerParams.tagType + "?" + params.join("&");
        }

        function getAbsPosition(obj) {
            var x = 0,
                y = 0;

            while (obj) {
                x += obj.offsetLeft;
                y += obj.offsetTop;
                obj = obj.offsetParent;
            }

            return {
                x: x,
                y: y
            };
        }

        function getBodyScrollLeft() {
            return window.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft);
        }

        function getBodyScrollTop() {
            return window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
        }

        function getFlashVersion() {
            if (navigator.plugins !== undefined && typeof navigator.plugins["Shockwave Flash"] === "object") {
                var description = navigator.plugins["Shockwave Flash"].description;
                if (description && !(navigator.mimeTypes !== undefined && navigator.mimeTypes["application/x-shockwave-flash"] && !navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) {
                    description = description.replace(/^.*\s+(\S+\s+\S+$)/, "$1").replace(/^(.*)\..*$/, "$1");

                    return parseInt(description, 10);
                }
            }

            if (window.ActiveXObject !== undefined) {
                try {
                    var flash = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    if (flash) {
                        var version = flash.GetVariable("$version");
                        if (!!version) {
                            version = version.split(" ")[1].split(",");

                            return parseInt(version[0], 10);
                        }
                    }
                } catch (e) {}
            }

            return 0;
        }

        function getIframeLevel() {
            var level = 0;
            var currentFrame = window;

            while (window.top != currentFrame.window) {
                level++;
                currentFrame = currentFrame.parent;

                if (level >= 20) {
                    break;
                }
            }

            return level;
        }

        function getPosition() {
            var position = "";
            var pixel = document.getElementById("tpix_" + sectionId);

            if (pixel) {
                pixel.style.visibility = "hidden";
                pixel.style.position = "absolute";
                pixel.style.display = "block";
            }

            var bannerPos   = document.getElementById("b_script_" + sectionId).offsetTop;
            var windowSize  = getWindowSize();

            // Compare and save
            if (window === window.top) {
                if (windowSize.height > 0) // If winHeight === 0, there is something wrong, so report as N/A
                    position = bannerPos > windowSize.height ? "btf" : "atf";

                if (isModeVisibilityOnly())
                    position = "atf";
            }

            return position;
        }

        function getReferrerUrl() {
            return window.self !== window.top ? encodeURIComponent(document.referrer) : "";
        }

        function getTimezoneOffset() {
            return new Date().getTimezoneOffset();
        }

        function getWindowSize() {
            var winWidth = 0, winHeight = 0;
            if (typeof window.innerWidth === "number") {
                //Non-IE
                winWidth = window.innerWidth;
                winHeight = window.innerHeight;
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                //IE 6+ in "standards compliant mode"
                winWidth = document.documentElement.clientWidth;
                winHeight = document.documentElement.clientHeight;
            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                //IE 4 compatible
                winWidth = document.body.clientWidth;
                winHeight = document.body.clientHeight;
            }

            return {
                width: winWidth,
                height: winHeight
            };
        }

        function isBannerInVisibleArea() {
            var windowSize = getWindowSize();
            var posY = windowSize.height + getBodyScrollTop();
            var posX = windowSize.width + getBodyScrollLeft();
            var position = getAbsPosition(container);

            return (posY >= position.y && posX >= position.x);
        }

        function isModeVisibilityOnly() {
            return !!modeVisibilityOnly;
        }

        function createBanner(url) {
            var iframe = document.createElement("iframe");
            iframe.style.display = 'none';
            iframe.frameBorder = 0;
            iframe.style.width = bannerParams.w + "px";
            iframe.style.height = bannerParams.h + "px";
            iframe.width = bannerParams.w + "px";
            iframe.height = bannerParams.h + "px";
            iframe.id = "btw_ad_" + sectionId;
            iframe.scrolling = "no";
            iframe.src = url || "";

            container.appendChild(iframe);
        }

        function place_banner() {
            document.body.insertBefore(container, document.body.firstChild);
            container.style.display = 'block';
            container.style.textAlign = 'center';
        }
        
        function hideBanner() {
            var banner = getBannerElement();
            if (banner) {
                banner.style.display = "none";
            }
        }

        function displayBanner() {

            var banner = getBannerElement();
            if (banner) {
                banner.style.display = "inline";
            }
        }

        function showBanner(url) {
            var banner = getBannerElement();
            if (!isBannerShown && banner) {
                banner.src = url;
                isBannerShown = true;
                if(isMobile && section_type == 'mobile') {
                    place_banner();
                }
            }
        }

        function restoreBannerParams() {
            var params = {
                w: 0,
                h: 0,
                tagType: "adj",
                s: 0
            };

            if (isArray(userDefinedParams)) {
                for (var i = 0; i < userDefinedParams.length; i++) {
                    if (!isArray(userDefinedParams[i]) || !userDefinedParams[i]) {
                        continue;
                    }

                    params[userDefinedParams[i][0]] = userDefinedParams[i][1];
                }
            }

            if (isModeVisibilityOnly()) {
                params.tagType = "adi";
            }

            return params;
        }

        (function track() {
            var img = new Image();
            img.src = baseUrl + "/1x1.gif";
            img.setAttribute("style", "position:absolute;left:-9999px;");
            img.setAttribute("id", "tpix_" + sectionId);
            container.appendChild(img);
        })();

        addEventListener(window, "message", function (e) {
            if (e.origin !== baseUrl)
                return;

            havebanner = 1;

            if (e.data.provider && e.data.provider == "between" && e.data.section == bannerParams.s) {
                if (!e.data.is_show) {
                    hideBanner();
                } else if (typeof e.data.async_creative_html == 'string') {
 					if(bannerParams.c2s == 1) {                   
	 					var wrapper = document.createElement('div');
		                wrapper.innerHTML = decodeURIComponent(e.data.async_creative_html.replace(/\+/g, ' '));
		                
		                container.removeChild(document.getElementById("btw_ad_" + sectionId));
		                container.appendChild(wrapper);
		                var scripts = wrapper.getElementsByTagName('script');
		                for(var i=0; i<scripts.length; i++) {
		                    try {
		                        eval(scripts[i].innerHTML);
		                    } catch (e) {
		                        console.log(e);
		                    }
		                }
					}
                } else {
                    displayBanner();
                }
            }
        });

        if (isModeVisibilityOnly()) {
            createBanner();
            addEventListener(window, "scroll", function () {
                if (isBannerInVisibleArea()) {
                    showBanner(bannerUrl);
                }
            });

            

            if (isBannerInVisibleArea()) {
                showBanner(bannerUrl);
            }
        } else {
            createBanner(bannerUrl);
        }

        addEventListener(getBannerElement(), "load", function haveban () {
            if(havebanner === 0) {
                setfallback(getBannerElement(), haveban);   
            }
        });
    })(window, document);
}