function tffocus(tf) {
	tf.className = 'active';
	if (tf.value == tf.defaultValue) {
		tf.value = '';
	}
}

function tfblur(tf) {
	tf.className = 'inactive';
}

var lwNewY = 0;
var logWinHandler = null;
var lwElement;

function showLoginWindow() {
	lwNewY = 0;
	setLoginWindowAnimHandler();
}

function hideLoginWindow() {
	lwNewY = -140;
	setLoginWindowAnimHandler();
}

function loginWindowAnimation() {
	var y = lwElement.offsetTop;
	y = Math.round((y * 2 + lwNewY) / 3);
	lwElement.style.top = y + 'px';
	if (y == lwNewY) {
		clearInterval(logWinHandler);
	}
}

function setLoginWindowAnimHandler() {
	if (!logWinHandler) {
		lwElement = document.getElementById('login');
		logWinHandler = setInterval(loginWindowAnimation, 50);
	}
}

function initRate() {
    if (document.getElementById("content-wrapper") == null) return;
    elements = document.getElementById("content-wrapper").getElementsByTagName("div");
    if (elements == null) return;
	for(i=0;i<elements.length;i++) {
		if(elements[i].getAttribute("class") == "rating_layout" && elements[i].getAttribute("title")) {			
			el = elements[i].getElementsByTagName("div")[0];
			val = elements[i].getAttribute("title");
			val = val.replace(",", ".");
			pos = Math.round(getRating(val));
			el.setAttribute("style", "width:"+pos+"px");
		}
	}	
}

function getRating(val) {
	rate = (61 * (val * 100 / 5) / 100);
	return rate;
}

function prepareStr(str) {
    return escape(str).replace(/\+/g, "%2B");
}

function initScripts() {
	initRate();
}

if ((typeof initCombos != "undefined") && (typeof jQuery != "undefined") && (jQuery && initCombos)) {
    $(document).ready(function () {
        jQuery.fn.vscontext = function (options) {
            var defaults = {
                menuBlock: null,
                offsetX: 0,
                offsetY: 0,
                speed: 'fast'
            };
            var options = $.extend(defaults, options);
            var menu_item = '.' + options.menuBlock;
            return this.each(function () {
                $(this).mousedown(function (e) {
                    var offsetX = $(this).offset().left + options.offsetX; //  e.pageX  + options.offsetX;
                    var offsetY = $(this).offset().top + $(this).outerHeight() - 1; // options.offsetY; //e.pageY + options.offsetY;
                    if (e.which == "1") {
                        $(menu_item).css('top', offsetY);
                        $(menu_item).css('left', offsetX);
                        $(menu_item).slideDown(options.speed);
                    } else {
                        $(menu_item).slideUp(options.speed);
                    }
                });
                $(menu_item).hover(function () { }, function () { $(menu_item).slideUp(options.speed); });
                $(this).hover(function () { }, function (e) {
                    if (!(($(e.relatedTarget).parents().filter($(menu_item)).length > 0) || (e.relatedTarget == $(menu_item).get(0))))
                        $(menu_item).slideUp(options.speed);
                });
                $(menu_item).click(function (event) {
                    $(menu_item).slideUp(options.speed);
                    event.returnValue = true;
                }) 

            });
        };
    });
}