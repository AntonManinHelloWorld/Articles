var moduleLink="/"+lang+"/posts";
function showPollResults(xmlDoc)
{	
    $("#postPoll").html($(xmlDoc).find("message").html());	
}
$(function(){
	setVoting(".rate_", moduleLink+"/post_id/");
	$("#voteForPoll").click(function(){
		if(!$("#user_id").val())
		{
            showMessage($("#postPoll").attr("notLoggedin"), "error");
			return;
		}
		var answer_id = $("input[name=pollAnswer]:checked").val();
		if(!answer_id)
		{
            showMessage($("#postPoll").attr("noAnswerSelected"), "error");
			return;
		}
		$("#answer_id").val(answer_id);
		sendFormThruAjax("#pollAnswerForm", showPollResults)
	});     		
    $(".post-controls .delete").click(function(){
        if($(this).attr("post_id")){
            performAjaxRequest({
                type:"POST",
                url:moduleLink+"/post_id/"+$(this).attr("post_id")+"/mode/del/"
            })
        }
    });
    $(".post-controls .edit").click(function(){
        if($(this).attr("post_id")&&$(this).attr("blog_id"))
            redirect("/"+lang+"/blogs/blog_id/"+$(this).attr("blog_id")+"/mode/new_post/post_id/"+$(this).attr("post_id")+"/");
    });
	$("#pollResults").click(function(){
		if(!$("#user_id").val())
		{
            showMessage($("#postPoll").attr("notLoggedin"), "error");
			return;
		}
		$("#answer_id").val(0);
		sendFormThruAjax("#pollAnswerForm", showPollResults)
	});
});