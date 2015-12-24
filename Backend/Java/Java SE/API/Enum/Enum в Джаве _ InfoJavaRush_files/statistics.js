
        

        
        
        
        

        
    //set up Google Universal Analytics
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-35679269-1', 'auto', { 'userId': '65573' });
        ga('require', 'displayfeatures');
        ga('send', 'pageview');

    //track site
        (function(){
            var url = window.location.href;
            var scriptElement = document.createElement("script");
            scriptElement.async=1;
            scriptElement.src = "//javarush.ru/user/track/s?src=" + window.encodeURIComponent(url);

            var firstScript = document.getElementsByTagName("script")[0];
            firstScript.parentNode.insertBefore(scriptElement, firstScript);
        })();

//    //Accurate bounce rate by time
//        (function() {
//            if (!document.referrer || document.referrer.split('/')[2].indexOf(location.hostname) != 0)
//                setTimeout(function () {ga('send', 'event', 'New User', location.pathname);}, 15000); //15sec
//
//            setTimeout(function () {ga('send', 'event', 'Good User', location.pathname);}, 300000); //5min
//            setTimeout(function () {ga('send', 'event', 'LongTime User', location.pathname);}, 900000);//15min
//        } )();
