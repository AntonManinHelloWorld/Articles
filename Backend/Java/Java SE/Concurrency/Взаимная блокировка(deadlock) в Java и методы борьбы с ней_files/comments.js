var observedArray=["#text"];
var editedComment = 0;
var defaultActionValue;
$(function(){
    if(typeof setVoting !== 'undefined')
	    setVoting(".rate_comment_", moduleLink+"/comment_id/", "_comment");
	$(".comment-wrapper").mouseenter(function(eventObject){
		for(var comment=$(this);$(comment).length;comment=$("#comment_"+$(comment).find("div.article-head").attr("parent")).parent())
		{
			$(comment).find("img.asterisk").css("visibility","visible");
		}
	});
	$(".comment-wrapper").mouseleave(function(eventObject){
		for(var comment=$(this);$(comment).length;comment=$("#comment_"+$(comment).find("div.article-head").attr("parent")).parent())
		{
			$(comment).find("img.asterisk").css("visibility","hidden");
		}
	});
	$(".answer_comment").click(function(){
        var reply_id_tokens=$(this).attr("id").split("_");
        if(editedComment==reply_id_tokens[2])
            return;
		$(".at").remove();
		$(this).parent().parent().parent().parent().find("div.asterisk-cell").append('<img class="at" src="/images/at.jpg" width="24" height="24"/>');
        $("#toTopic").removeAttr("checked");
		$("#toPost").prop("checked", "checked").removeAttr("disabled");		
		$("#commentToReply").text($(this).parent().parent().find("span.author_login").text()+" #"+reply_id_tokens[2]);
		$("#parent").val(reply_id_tokens[2]);
	});
	$("#toTopic").click(function(){
		$(".at").remove();
		$("#toPost").attr("disabled", "disabled");
		$("#commentToReply").text("");
        $("#parent").val(0);
	});
    $(".comments .delete").click(function(){
        if($(this).attr("comment_id")){
            var self = this;
            performAjaxRequest({
                type:"POST",
                url:moduleLink+"/"+$("#comment-form").attr("entity_type")+"_id/"+$("#comment-form").attr("entity_id")+"/"+$(this).attr("comment_type")+"_id/"+$(this).attr("comment_id")+"/mode/del_"+$(this).attr("comment_type")+"/",          
                success:function(xmlDoc){
                    $("#comment_"+$(self).attr("comment_id")).html('<div class="commentRemoved">'+$(self).attr("commentRemoved")+'</div>');
                }
            });             
        }
    });
    $(".comments .edit").click(function(){
        if($(this).attr("comment_id")){
            var self=this;
            performAjaxRequest({
                type:"GET",
                url:moduleLink+"/"+$("#comment-form").attr("entity_type")+"_id/"+$("#comment-form").attr("entity_id")+"/"+$(this).attr("comment_type")+"_id/"+$(this).attr("comment_id")+"/mode/get_"+$(this).attr("comment_type")+"_for_edit/",            
                success:function(xmlDoc){
                    scrollToAnchor("toTopic");
                    editedComment = $(self).attr("comment_id");
                    $("#text").html($(xmlDoc).find("message").html());
                    var parent_id = parseInt($(xmlDoc).find("additional_info").text());
                    $(".at").remove();
                    if(parent_id!=0){
                        $("#comment_"+parent_id).parent().find("div.asterisk-cell").append('<img class="at" src="/images/at.jpg" width="24" height="24"/>');
                        $("#toTopic").removeAttr("checked");
                        $("#toPost").prop("checked", "checked").removeAttr("disabled");
                        $("#commentToReply").text($("#comment_"+parent_id).find("span.author_login").text()+" #"+parent_id);
                        $("#parent").val(parent_id);
                        scrollToAnchor("answerTo");
                    }
                    defaultActionValue = $("#comment-form").attr("action");
                    $("#comment-form").attr("action", moduleLink+"/"+$("#comment-form").attr("entity_type")+"_id/"+$("#comment-form").attr("entity_id")+"/mode/edit_"+$(self).attr("comment_type")+"/"+$(self).attr("comment_type")+"_id/"+$(self).attr("comment_id")+"/");
                }
            });
        }            
    });
    submitOnClick(".submit-comment");
    $(".clear-comment").click(function(){
        $(".at").remove();
        $("#toPost").removeAttr("checked");        
        $("#toTopic").prop("checked", "checked");
		$("#toPost").attr("disabled", "disabled");        
		$("#commentToReply").text("");
        $("#parent").val(0);
        $("#text").val("");
        if(defaultActionValue) {
            $("#comment-form").attr("action", defaultActionValue);
            defaultActionValue = undefined;
        }
        editedComment = 0;
    });
});