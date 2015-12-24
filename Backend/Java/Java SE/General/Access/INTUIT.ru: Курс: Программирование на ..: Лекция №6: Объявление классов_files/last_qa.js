
var lastq_exists = 1;

function write_lastq()
{
	var ua = navigator.userAgent.toLowerCase();
	// РћРїСЂРµРґРµР»РёРј Internet Explorer
	isIE = (ua.indexOf("msie") != -1 && ua.indexOf("opera") == -1);
	var s = '<a onClick="return open_last_qa(this);" href="http://ask.intuit.ru/question/3180/">http://www...dpo/pk/ ссылку на прохождение курсов повышения квалификации ко дню рождения проекта не работае</a>';
	var mss = '<a onClick="return open_last_qa(this);" href="http://ask.intuit.ru/question/3180/">http://www...dpo/pk/ ссылку на прохождение курсов повышения квалификации ко дню рождения проекта не работае</a>';
	var out = isIE? mss : s;
	document.write(out);
}

function open_last_qa(o)
{
	var url = o.href;
	window.open(url);
	return false;
}

