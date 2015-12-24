function VKlogin(){
    showLoadIndicator();
    VK.Auth.login(vkAuthInfo);
}
function vkAuthInfo(response) {
    if (response.session) {
        performAjaxRequest({
            url: '/ru/users/mode/vkLogin/',
            type: "POST",
            data: response.session,
            success: function () {
                closeModalDialog(function(){
                    reloadPage();
                });
            }
        });
    } else {
        hideLoadIndicator();
        console.error('not auth');
    }
}

//FB Login
function FBlogin() {
    showLoadIndicator();
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            FBlogin_ajax(response);
        } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook,
            // but has not authenticated your app
            FB.login(FBlogin_ajax);
        } else {
            // the user isn't logged in to Facebook.
            FB.login(FBlogin_ajax);
        }
    });
}

function FBlogin_ajax(response) {
    if(response.authResponse) {
        performAjaxRequest({
            url: '/ru/users/mode/fbLogin/',
            data: response.authResponse,
            type: "POST",
            success: function () {
                closeModalDialog(function () {
                    reloadPage();
                });
            }
        });
    } else {
        hideLoadIndicator();
        console.error('not auth');
    }
}