function onVoteButtonClick(xmlDoc, counter)
{
	if($(xmlDoc).find("result").text() != "ok")
	{
        showMessage($(xmlDoc).find("message").html(), $(xmlDoc).find("result").text());
		subscribeLoginRegister();
	}
	else
	{
		$(counter).text($(xmlDoc).find("message").text());
	}
}
function setVoteButtonOnClick(bottonId, url, target, vote){
	$(bottonId+vote).click(function(){
		var button=$(this);
		$.post(url+$(this).attr("entity_id")+"/mode/vote"+(target?target:"")+"/value/"+vote+"/", "", function(xmlDoc){onVoteButtonClick(xmlDoc, $(button).parent().parent().find("span.counter"))});
	});
}
function setVoting(bottonId, url, target)
{
	setVoteButtonOnClick(bottonId, url, target, "inc");
	setVoteButtonOnClick(bottonId, url, target, "dec");
}
