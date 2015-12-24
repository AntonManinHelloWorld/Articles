var focusedElement = undefined;
jQuery.fn.insertAtCaret = function(prev, post, placeCursor){
	if(this==undefined||this[0]==undefined) return;
    if (this[0].selectionStart || this[0].selectionStart == '0') {
		var startPos = this[0].selectionStart;
		var endPos = this[0].selectionEnd;
		var scrollTop = this[0].scrollTop;
		this[0].value = this[0].value.substring(0, startPos)+prev+this[0].value.substring(startPos, endPos)+post+this[0].value.substring(endPos,this[0].value.length);
		this[0].focus();
		if(placeCursor)
		{
			this[0].selectionStart = startPos + placeCursor;
			this[0].selectionEnd = startPos + placeCursor;
		}
		else
		{
			this[0].scrollTop = scrollTop;
			this[0].selectionStart = startPos + prev.length;
			this[0].selectionEnd = endPos + prev.length;
		}
	}
};
function updateImageAlignment(){
    $("#imageAlignmentOptions .submit").unbind("click");
    $("#imageAlignmentOptions .submit").click(function(){
        var selectedItemValue = $("#imageAlignmentOptions input[name='alignment']:checked").val();
        $(focusedElement).insertAtCaret("", selectedItemValue);
        closeModalDialog();
    });
}
function imageUpload(){
	ajaxFileUpload($("#imageUploadWrapper").attr("dest"), $(this).attr("id"), function(imageXML){
		$(focusedElement).insertAtCaret("", $(imageXML).find("additional_info").html(), "<img ".length);
		$("#btnImg").removeClass("buttonHover");
		setTimeout(function(){
            closeModalDialog();
            $("#imageAlignment").modal("show");
            $("#imageAlignment").on("shown", updateImageAlignment);
            $("#modal").on("hide", function () {
                $("#imageAlignLeft").prop("checked", "checked");
            });
		}, 1500);
	}, function(){
        $("#image").off("change").on("change", imageUpload);   
	});
}

function btnH2(){
	$(focusedElement).insertAtCaret("<h2>","</h2>");
}
function btnH3(){
	$(focusedElement).insertAtCaret("<h3>","</h3>");
}
function btnH4(){
	$(focusedElement).insertAtCaret("<h4>","</h4>");
}
function btnBold(){
	$(focusedElement).insertAtCaret("<strong>","</strong>");
}
function btnItalic(){
	$(focusedElement).insertAtCaret("<i>","</i>");
}
function btnStrike(){
	$(focusedElement).insertAtCaret("<strike>","</strike>");
}
function btnLink(){
	var url = prompt($("#btnLink").attr("prompt"), "http://");
	if(url!=null)
		$(focusedElement).insertAtCaret('<a href="'+url+'" target="_blank">','</a>', 27+url.length);
}
function btnQuote(){
	$(focusedElement).insertAtCaret("<blockquote>", "</blockquote>");
}
function btnCode(){
	var lang = prompt($("#btnCode").attr("prompt"));    
    if(lang) {
        lang = lang.toLowerCase();
        if(lang === "c++")
            lang = "cpp";
		$(focusedElement).insertAtCaret('<pre><code class="'+lang.toLowerCase()+'">','</code></pre>', 20+lang.length);
    } else
		$(focusedElement).insertAtCaret('<pre><code>','</code></pre>', 11);
}
function btnHtmlTag(){
	var tag = prompt($("#btnHtmlTag").attr("prompt"));
	if(tag)
		$(focusedElement).insertAtCaret("",tag.replace(/&/g,"&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
}
function btnVideo(){
	var video = prompt($("#btnVideo").attr("prompt"));
	video = /v=[a-zA-Z0-9_]+[&]{0,1}/.exec(video);
	if(video&&video[0]){
		$(focusedElement).insertAtCaret("",'<video id="'+video[0].substr(2)+'"/>');
	}
}
function openImgUploader(){
	$("#image").click();
}
function insertTabSymbolIfNecessary(event){
    if($(focusedElement).is(":focus")){
        $(focusedElement).insertAtCaret("\t","");
        event.preventDefault();
    }
}
$(function(){
	$("#btnH2").click(btnH2);
	$("#btnH3").click(btnH3);
	$("#btnH4").click(btnH4);
	$("#btnBold").click(btnBold);
	$("#btnItalic").click(btnItalic);
	$("#btnStrike").click(btnStrike);
	$("#btnLink").click(btnLink);
	$("#btnQuote").click(btnQuote);	
	$("#btnCode").click(btnCode);
	$("#imageUploadWrapper").css("top", -$("#btnImg").height()-parseInt($("#imageUploadWrapper").css("padding-top"))-parseInt($("#btnImg").css("padding-bottom")));
	$("#imageUploadWrapper").width($("#btnImg").width()+parseInt($("#btnImg").css("padding-left"))+parseInt($("#btnImg").css("padding-right")));
	$("#imageUploadWrapper").height($("#btnImg").height()+parseInt($("#btnImg").css("padding-top"))+parseInt($("#btnImg").css("padding-bottom")));
	$("#imageUploadWrapper").mouseenter(function(){$("#btnImg").addClass("buttonHover")});
	$("#imageUploadWrapper").mouseout(function(){$("#btnImg").removeClass("buttonHover")});
	$("#image").on("change", imageUpload);
	$("#btnVideo").click(btnVideo);
	$("#btnHtmlTag").click(btnHtmlTag);
	if(observedArray.length)
		focusedElement = $(observedArray[0]);
	for(var observedElement in observedArray)
	{
		$(observedArray[observedElement]).mouseup(function(){
			focusedElement = this;
		});
		$(observedArray[observedElement]).keydown(function(event){
			if(event.altKey){
				switch(String.fromCharCode(event.keyCode)){
					case "2":
						btnH2();
						event.preventDefault();
						break;
					case "3": 
						btnH3();
						event.preventDefault();
						break;
					case "4": 
						btnH4();
						event.preventDefault();
						break;
					case "B": 
						btnBold();
						event.preventDefault();
						break;
					case "I": 
						btnItalic();
						event.preventDefault();
						break;
					case "S": 
						btnStrike();
						event.preventDefault();
						break;
					case "L": 
						btnLink();
						event.preventDefault();
						break;
					case "Q": 
						btnQuote();
						event.preventDefault();
						break;
					case "C": 
						btnCode();
						event.preventDefault();
						break;
					case "M": 
						btnHtmlTag();
						event.preventDefault();
						break;
					case "P":
						openImgUploader();
						event.preventDefault();
						break;
					case "V":
						btnVideo();
						event.preventDefault();
						break;
				}
            // tab key pressed
			} else if(event.keyCode == 9){
                insertTabSymbolIfNecessary(event);
            }
		});		
	}
});