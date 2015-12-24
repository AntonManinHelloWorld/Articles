document.write('<div style="width:0px;height:0px;position:fixed;right:0px;top:0px;display:none;overflow:hidden;z-index:10000;" id="dVaSAbCA"><scr'+'ipt type="text/javascript" src="/abnl/?adsdata=X9CjuAegm6e8OhdzDIBAS!7a4L5sNs3N9AfxZtKa;7te7dw1GYuz05C6lHKMtE222qFrVkXFcLgaZwkxNm^SJibc1e2AACS83HGl!tPbyYhzVkTF5MIb2XAVY1eSJM9G!rLR^2!vtiL8^0fwjIGeEcJOv5TAppPnuUcxj2vXkJhqj9y9Qien9bOvVV!uHzhNJai8pwDl2!Uo"></scr'+'ipt></div>');
function resizeDiv(islasttry){
	var WX,WY,BX,BY;
	var o=document.getElementById("dVaSAbCA"),t,d;
	if (!o) return;
	if(typeof window.self_getsizes == 'function'){
		var s=self_getsizes();
		if(s.err==1 && !islasttry) return;
		if(isNaN(s.BX)) s.BX==0;
		if(isNaN(s.BY)) s.BY==0;
		if(s.err==1){
			if (!(t=document.getElementById("bannerXaSAbCA"))) return;
			else s.BX=t.value;
			if (!(t=document.getElementById("bannerYaSAbCA"))) return;
			else s.BY=t.value;
		}
		BX=s.BX;
		BY=s.BY;
	}else{
		if (!(t=document.getElementById("bannerXaSAbCA"))) return;
		else BX=t.value;
		if (!(t=document.getElementById("bannerYaSAbCA"))) return;
		else BY=t.value;
	}
	if (!(t=document.getElementById("wrapperXaSAbCA"))) WX=0;
	else WX=t.value;
	if (!(t=document.getElementById("wrapperYaSAbCA"))) WY=0;
	else WY=t.value;
	d=document.getElementById("mainadsdvaSAbCA");
	if(d){
		if (BX<0) d.style.width="100%";
		else if (BX>0) d.style.width=BX+"px";
		if (BY<0) d.style.height="100%";
		else if (BY>0) d.style.height=BY+"px";
	}
	BX=parseInt(BX)+parseInt(WX);
	BY=parseInt(BY)+parseInt(WY);
	if (BX<0) o.style.width="100%";
	else if (BX>0) o.style.width=BX+"px";
	if (BY<0) o.style.height="100%";
	else if (BY>0) o.style.height=BY+"px";
	o.style.display='';
	return true;
}
function waitForIframe(triesCount){
    if(triesCount>10) return;
    if(typeof resizeDiv == 'function' && !resizeDiv(triesCount==10 ? 1 : 0)) return setTimeout(function() { waitForIframe(triesCount + 1); }, 500);
};
document.write('<scr'+'ipt type="text/javascript">waitForIframe(0);</scr'+'ipt>');var criteo970_allow=false;new Image().src = "http://counter.yadro.ru/hit;narodadst2?r"+escape(document.referrer)+((typeof(screen)=="undefined")?"":";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+";"+Math.random();