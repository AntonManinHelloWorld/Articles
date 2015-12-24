function onNewContentLoad(dontShowMessage) {
    initSocialWidgets();
    delete hljs.initHighlighting.called;
    hljs.initHighlighting();
    if (!dontShowMessage&&$.trim($("#messageDiv").find(".content").html()))
        $("#messageDiv").modal("show");
    handleFeedbackFormIfPresent();
    $(".search-div .b-search .btn").unbind("click");
    submitOnClick(".search-div .b-search .btn", null, true);
    submitOnClick(".search-div .b-search .btn", null, true);
}
function feedbackWidget(){
    var leftValue = $(".feedback-widget").css("left");
    var onHover = function(){
        if(parseInt($(this).css("left"))<0){
            $(this).stop();
            $(this).animate({left:"0px"}, "slow");
            $(this).off("mouseover", onHover);
        }
    };
    $(".feedback-widget").on("mouseover", onHover);
    $(".feedback-widget").on("mouseout", function(){
        $(this).stop();
        $(this).animate({left: leftValue}, "slow");
        $(this).off("mouseover", onHover).on("mouseover", onHover);
    });
}
function showLoadIndicator(){
    $(".common-load-indicator").show();
}
function hideLoadIndicator(){
    $(".common-load-indicator").hide();
}
function scrollToTop() {
    $('body,html').animate({
        'scrollTop': 0
    }, 600);
}
function scrollToAnchor(anchor){
    var jqueryAnchor = $('#'+anchor);
    if(jqueryAnchor.size()==0){
        return;
    }
    $('body,html').animate({
        'scrollTop':   jqueryAnchor.offset().top
    }, 600);
}
function htmlEncode(value) {
    return $("<div/>").text(value).html();
}
function htmlDecode(value) {
    return $("<div/>").html(value).text();
}
function handleAjaxSuccess(xmlDoc, success){
    if ($(xmlDoc).find("message").text() === "redirect") {
        redirect($(xmlDoc).find("additional_info").text());
    } else if ($(xmlDoc).find("message").text() === "reload") {
        reloadPageAjax();
    } else if (typeof success == "function") {
        success(xmlDoc);
    }
}
function performAjaxRequest(data) {
    var ajaxData = Object.create(data);
    ajaxData.success = function (xmlDoc) {
        var result = $(xmlDoc).find("result").text();
        if (result != "ok") {
            var defaultErrorHandler = function () {
                closeModalDialog();
                showMessage($(xmlDoc).find("message").html(), result);
                $(".login-link, .register-link").on("click", function () {
                    closeModalDialog()
                });
            };
            console.error("An error in request occurred!");
            if (typeof data.error == "function") {
                data.error(xmlDoc, defaultErrorHandler);
            } else {
                defaultErrorHandler();
            }
        } else {
            handleAjaxSuccess(xmlDoc, data.success);
        }
    };
    $.ajax(ajaxData);
}

function sendFormThruAjax(form, callback, disallowFiles, error) {
    if(!disallowFiles&&$(form).find("input[type='file']").size()>0) {
        ajaxFileUpload(
            $(form).attr("action")+"?"+$(form).serialize(),
            $(form).find("input[type='file']").eq(0).attr("id"),
            callback,
            function(){},
            error
        );
    } else {
        if (disallowFiles) {
            var clonedForm = $(form).clone();
            //jquery bug, it doesn't clone the values
            $(clonedForm).find("textarea").each(function(index, item){
                $(item).val($(form).find("textarea").eq(index).val());
            });
            $(clonedForm).find("input").each(function(index, item){
                $(item).val($(form).find("input").eq(index).val());
            });
            $(clonedForm).find("select").each(function(index, item){
                $(item).val($(form).find("select").eq(index).val());
            });
            form = clonedForm;
            $(form).find("input[type='file']").remove();
        }
        performAjaxRequest({
            type: "POST",
            url: $(form).attr("action"),
            data: $(form).serialize(),
            success: callback,
            error: error
        });
    }
}
function watchAfterTextareaMaxSize(jquery, message) {
    $(jquery).bind("input", function () {
        var limitNum = $(this).attr("maxlength");
        if ($(this).val().length >= limitNum) {
            $(this).val($(this).val().substring(0, limitNum));
            showModalBox(message.title, message.content);
        }
    });
}
function handleFeedbackFormIfPresent() {
    if ($("#feedback-form").size() > 0) {
        $("#feedback-form .submit-request").on("click", function () {
            if (/*$.trim($("#feedback-form #email").val()) && */$.trim($("#feedback-form #text").val())) {
                sendFormThruAjax("#feedback-form", function (xmlDoc) {
                    showMessage($(xmlDoc).find("message").html(), $(xmlDoc).find("result").text());
                    $("#feedback-form")[0].reset();
                });
            } else {
                showMessage($("#feedback-form").attr("notFilled"));
            }
        });
    }
}
function submitForm(jqueryForm, errorForAjax, allowFilesForAjax) {
    if (typeof(deepLinksActivated) === "undefined") {
        jqueryForm.submit();
    } else {
        sendFormThruAjax(jqueryForm, function () {
        }, !allowFilesForAjax, errorForAjax);
    }
}

function getParentForm(element) {
    return $(element).parents("form");
}

function submitOnClick(target, checker, submitOnEnter, allowFilesForAjax) {
    var ajaxErrorHandler = function (xmlDoc, defaultHandler) {
        defaultHandler();
        $(target).bind("click", submit);
    };
    var submit = function () {
        if (typeof checker === "function") {
            if (checker()) {
                submitForm(getParentForm(target), ajaxErrorHandler, allowFilesForAjax);
                $(target).unbind("click", submit);
            }
        } else {
            submitForm(getParentForm(target), ajaxErrorHandler, allowFilesForAjax);
            $(target).unbind("click", submit);
        }
    };
    $(target).click(submit);
    if (submitOnEnter) {
        $(getParentForm(target)).keydown(function (event) {
            if (event.keyCode == 13) {
                submit();
                event.preventDefault();
                return false;
            }
        });
    }
}

function removeMessageTypeStyles(content) {
    if (content.hasClass("text-error"))
        content.removeClass("text-error");
    if (content.hasClass("text-success"))
        content.removeClass("text-success");
}
function showMessage(text, result, callback) {
    closeModalDialog();
    var content = $("#messageDiv").find(".content");
    content.html(text);
    removeMessageTypeStyles(content);
    if (result == "ok") {
        content.addClass("text-success");
    } else if (result == "error") {
        content.addClass("text-error");
    }
    $("#messageDiv").modal("show");
    $("#messageDiv").on("shown", callback);

}
function closeModalDialog(callback) {
    if($(".modal").is(":visible")) {
        if (callback) {
            var onHidden = function () {
                callback();
                $(".modal").off('hidden', onHidden);
            };
            $(".modal").on('hidden', onHidden);
        }
        $(".modal").modal('hide');
    }
    else if(callback)
        callback();

}
function showModalBox(title, content, callback) {
    $("#modal").find(".title").text(title);
    $("#modal").find(".content").html(content);
    $("#modal").modal("show");
    $("#modal").on("shown", callback);
    $("#modal").on("hide", function () {
        $("#modal").removeAttr("style");
    })
    $("#modal").on("hidden", function () {
        $("#modal").find(".title").empty();
        $("#modal").find(".content").empty();
        $("#modal").removeAttr("style");
        $("#modal .modal-body").removeAttr("style");
        $("#modal .modal-header").removeAttr("style");
        $("#modal").off("shown");
        $("#modal").off("hide");
        $("#modal").off("hidden");
    });
}
function setModalBodyHeight(parent) {
    //60 - is the sum of paddings
    $(parent).find(".modal-body").css("height", $("#modal").height() - $("#modal .modal-header").height() - 60);

}
function preview(html, callback) {
    showModalBox($("#modal").attr("previewTitle"), html, function () {
        $("#modal").css("width", "66%");
        $("#modal").css("left", "33%");
        $("#modal").css("height", Math.max(parseInt($(window).height() * 2 / 3), 480) + "px");
        setModalBodyHeight("#modal");
        callback();
    })
}
function requestAjaxOnLinkClickWithSubstituteOnSuccess(linkSelector) {
    $(linkSelector).click(function () {
        var button = $(this);
        performAjaxRequest({
            type: "GET",
            url: $(this).attr("link"),
            success: function (xmlDoc) {
                button.parent().parent().html($(xmlDoc).find("message").text());
            }
        });
    });
}
function ajaxFileUpload(url, fileToUpload, onsuccess, callback, error, data) {
    showModalBox($("#loading .title").text(), $("#loading .body").html(), function () {
    });
    setTimeout(function () {
        $.ajaxFileUpload
        ({
            url: url,
            secureuri: false,
            fileElementId: fileToUpload,
            dataType: 'text/xml',
            data:data,
            success: function (data, status) {
                if (status === "success") {
                    if ($(data).find("result").text() != "ok") {
                        showMessage($(data).find("message").text(), $(data).find("result").text());
                        if(typeof error == "function")
                            error();
                    } else {
                        handleAjaxSuccess(data,
                            function(xmlDoc){
                                showMessage($(xmlDoc).find("message").text(), $(xmlDoc).find("result").text());
                                onsuccess(xmlDoc);
                            });
                    }
                }
                if (typeof callback == "function") {
                    callback();
                }
            },
            error: function (data, status, e) {
                if(typeof error == "function")
                    error();
                else
                    showMessage(data, "error");
                if (typeof callback == "function") {
                    callback();
                }
            }
        });
    });
    return false;
}

function makeShowHidePassword(maskedPass, visiblePass, checkbox) {
    $(maskedPass).keyup(function () {
        $(visiblePass).val($(this).val());
    });
    $(visiblePass).keyup(function () {
        $(maskedPass).val($(this).val());
    });
    $(checkbox).click(function () {
        if ($(this).prop("checked")) {
            $(maskedPass).css("display", "none");
            $(visiblePass).css("display", "inline");
        }
        else {
            $(visiblePass).css("display", "none");
            $(maskedPass).css("display", "inline");
        }
    });
}
function removeShowHidePassword(maskedPass, visiblePass, checkbox) {
    $(maskedPass).off("keyup");
    $(visiblePass).off("keyup");
    $(checkbox).off("click");
}
function controlHeight() {
    if ($("#main").height() < $("html").height())
        $("#main").height($("html").height());
}
function clearMessageFromHref(href) {
    var URIComponent = href.split("/");
    for (var i in URIComponent) {
        if (URIComponent[i] === "msg") {
            URIComponent.splice(i, 2);
        }
    }
    if (URIComponent[URIComponent.length - 1] === "")
        URIComponent.splice(URIComponent.length - 1, 1);
    return URIComponent.join("/") + "/";
}
function reloadPage() {
    var href;
    if (typeof(deepLinksActivated) === "undefined") {
        href = clearMessageFromHref(location.href);
        var hash = href.indexOf("#");
        if (hash > -1)
            href = href.substr(0, hash);
        location.replace(href);
    } else {
        reloadPageAjax();
    }
}
function redirect(link) {
    if (typeof(deepLinksActivated) === "undefined") {
        location.href = link;
    } else {
        ajaxRedirect(link);
        location.hash = link;
    }
}
function identifyTimezone() {
    $.get("/" + lang + "/users/mode/identifyTimezone/timeOffset/" + (new Date()).getTimezoneOffset() * 60 + "/", function () {
    });
}
function subscribeSocialLogin() {
    $("#sign_in_vk_btn").click(function () {
        VKlogin();
    });
    $("#sign_in_fb_btn").click(FBlogin);
}
function subscribeLoginRegister() {
    $("body").delegate(".login-link, .register-link", "click", function () {
        closeModalDialog()
    });
    subscribeSocialLogin();
    var isResetPass = false;

    function submitLogin() {
        $(".submit-login").unbind("click", submitLogin);
        var form = $("#login").find("form");
        sendFormThruAjax(form, function (xmlDoc) {
                form[0].reset();
                closeModalDialog();
                $(".submit-login").click(submitLogin);
                if (isResetPass) {
                    showMessage($(xmlDoc).find("message").text(), $(xmlDoc).find("result").text(), function () {
                        setTimeout(function () {
                            closeModalDialog();
                        }, 5000);
                    });
                } else {
                    reloadPage();
                }
            },
            false,
            function (xmlDoc) {
                $(".submit-login").click(submitLogin);
                $("#loginErrorMsg").text($(xmlDoc).find("message").text());
                setTimeout(function () {
                    $("#loginErrorMsg").text("");
                }, 5000);

            });
    }

    $("#login").on("show", function () {
        $(".resetPassword").click(function () {
            $(this).parent().find("#password").hide();
            $(this).parent().attr("action", "/" + lang + "/users/mode/remind_password/");
            var button = $(this).parent().find(".submit-login");
            $(button).text($(button).attr("resetPass"));
            $(this).hide();
            isResetPass = true;
        });

        $(".submit-login").click(submitLogin);
    });
    $("#login").on("hidden", function () {
        $(this).find("#password").show();
        $(this).find("form").attr("action", "/" + lang + "/users/mode/login/");
        var button = $(this).find(".submit-login");
        $(button).text($(button).attr("login"));
        $(this).find(".resetPassword").show();
        $(this).find(".resetPassword").off("click");
        $(".submit-login").unbind("click", submitLogin);
    });
    $("#register").on("show", function () {
        makeShowHidePassword(".password.masked", ".password.visible", ".showPassword");
        $(".submit-register").click(function () {
            sendFormThruAjax($(".register-form"), function (xmlDoc) {
                $("#register .modal-body").html("<span class='text-success'>" + $(xmlDoc).find("message").text() + "</span>");
                window.setTimeout(function () {
                    closeModalDialog();
                }, 3000);
            }, false, function (xmlDoc) {
                $("#registerErrorMsg").text($(xmlDoc).find("message").text());
            });
        });
        $(".social-login-no-register").click(function(){
            closeModalDialog(function(){
                $("#login").on("shown", function switchToSocialLogin() {
                    if(!$("#profile").hasClass("active"))
                        $('.social-login-tab').tab('show');
                    $("#login").off("shown", switchToSocialLogin);
                });
                $("#login").modal("show");
            });
        })
    });
    $("#register").on("hidden", function () {
        $(".submit-register").off("click");
        removeShowHidePassword(".password.masked", ".password.visible", ".showPassword");
    });
}
$(function () {
    if (!timezone)
        identifyTimezone();
    $(window).resize(controlHeight);
    feedbackWidget();
    var hashCheckResult = checkLinkHash();
    onNewContentLoad(hashCheckResult);
    subscribeLoginRegister();
    $(".modal").on('hidden', function () {
        hideLoadIndicator();
    });
    $("#b-center-header>.l-content-wrap").delegate("#logout-link", "click", function () {
        $.post("/" + lang + "/users/mode/logout/", "", function (xmlDoc) {
            if ($(xmlDoc).find("result").text() === "ok") {
                reloadPage();
//                window.setTimeout(function () {
//                    closeModalDialog();
//                }, 1500);
            } else {
                $("#logout").modal();
                $("#logout").on("show", function () {
                    $("#logout .modal-body").html($(xmlDoc).find("message").text());
                    $("#logout .modal-body").addClass("text-error");
                    window.setTimeout(function () {
                        reloadPage();
                        closeModalDialog();
                    }, 3000);
                });
            }
        });
    });
});