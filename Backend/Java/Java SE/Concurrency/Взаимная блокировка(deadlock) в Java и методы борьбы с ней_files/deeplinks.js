var locationIdentifier = "/";
var currentURL = getUrlFromHref();
var deepLinksActivated = true;
var reloading = false;
function stripHostIfLocal(link){
    if(link.indexOf("http://"+window.location.host) === 0){
        return link.substring(("http://"+window.location.host).length);
    } else if(link.indexOf("https://"+window.location.host) === 0){
        return link.substring(("https://"+window.location.host).length);
    }
    return link;
}
function isExternalLink(link) {
    return (link.indexOf("http://") === 0 || link.indexOf("https://") === 0);
}
function isHashLink(link) {
    return link.indexOf("#") === 0;
}
function isRSSFeed(link){
    return link.indexOf("/mode/feed") !== -1;
}
function isDifferentTarget(linkElement){
    return $(linkElement).attr("target")=="_blank";
}
function getHashParticles(){
    return location.hash.split("#");
}
function ajaxLoadPageCallback(xmlDoc) {
    $("#content-predecessor").next().remove();
    $("#content-predecessor").after($(xmlDoc).find("content").html());
    $(".b-head-menu").html($(xmlDoc).find("menu").html());
    $("#b-center-header>.l-content-wrap").children(":last-child").remove();
    $("#b-center-header>.l-content-wrap").append($(xmlDoc).find("min_profile").html());
    $("title").html($(xmlDoc).find("title").html());
    $(".widgets").html($(xmlDoc).find("widgets").html());
    $("#scripts_and_styles-predecessor").nextAll().remove();
    $("#scripts_and_styles-predecessor").after($(xmlDoc).find("scripts_and_styles").html());
    $("#messageDiv .content").html($(xmlDoc).find("message").html());
    lang = $(xmlDoc).find("lang").html();
    user_id = $(xmlDoc).find("user_id").html();
    timezone = $(xmlDoc).find("timezone").html();
    var hashParticles = getHashParticles();
    onNewContentLoad();
    hideLoadIndicator();
    //if  there is a hash except the url
    if(hashParticles.length>2)
        scrollToAnchor(hashParticles[hashParticles.length-1]);
    else if(!reloading)
        scrollToTop();
    reloading = false;
}
function requestAjaxUpdate(url){
    showLoadIndicator();
    performAjaxRequest({
        type: "GET",
        url: url,
        success: ajaxLoadPageCallback,
        failure: hideLoadIndicator
    });
}
function reloadPageAjax(){
    reloading = true;
    var href = location.href;
    href = clearMessageFromHref(href);
    if(location.hash.indexOf(locationIdentifier)>=0){
        location.hash = clearMessageFromHref(getHashParticles()[1]);
        checkLinkHash(true);
    } else {
        requestAjaxUpdate(href);
    }
}
function ajaxRedirect(link){
    if(currentURL!==link) {
        location.hash = link;
    } else{
        reloadPageAjax();
    }
}
function getUrlFromHref() {
    var start = location.pathname.indexOf(locationIdentifier);
    if (start == -1)
        return;
    return location.pathname.substring(start - 1);
}
function checkLinkHash(reload){
    var hashParticles = getHashParticles();
    //the first character is a hash(#)
    // so the first particle(index 0) is empty
    var url = hashParticles[1];
    if(hashParticles.length<=1) {
        url = getUrlFromHref();
        if(!url)
            return;
    } else if(hashParticles[1].indexOf(locationIdentifier) !== 0){
        return;
    }
    if(reload||(currentURL!==url)){
        currentURL = url;
        closeModalDialog(function(){
            requestAjaxUpdate(url);
        });
        return true;
    }
    return;
}
$(function () {
    $("body").delegate("a", "click", function (event) {
        if(typeof(deepLinksActivated)==="undefined")
            return;
        if(isDifferentTarget(this))
            return;
        var link = $(this).attr("href");
        if(link){
            link = stripHostIfLocal(link);
            if(isHashLink(link)){
                var hashParticles = getHashParticles();
                var baseUrl = "";
                if(hashParticles.length>1){
                    baseUrl = hashParticles[1];
                }
                location.hash = baseUrl+link;
                scrollToAnchor(link.substring(1));
                event.preventDefault();
            } else if (!isExternalLink(link) && !isRSSFeed(link)) {
                location.hash = link;
                event.preventDefault();
            }
        }
    });
    $(window).bind('hashchange', function(){checkLinkHash()});
});