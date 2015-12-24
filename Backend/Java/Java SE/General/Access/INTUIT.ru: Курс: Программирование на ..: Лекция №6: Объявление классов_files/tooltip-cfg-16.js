var time2autoclose=1000;
var time2show=100;
var offX=8;
var offY=2;

var ContentLinkCfg = new Object();
ContentLinkCfg.n=1;
ContentLinkCfg.m=100;
ContentLinkCfg.words = ['null'];
ContentLinkCfg.templates = ['<table class="advert_block_gold" cellspacing="0" cellpadding="0" style="border:1px solid #aaa"><tr><td class="top_first" style="background: url(http://popup.osp.ru/images/top_bg.jpg); height:12px; vertical-align:top"><img  src="http://popup.osp.ru/images/advertisment_word_1.jpg"></td><td class="top_second" style="background: url(http://popup.osp.ru/images/top_bg.jpg); height:12px; vertical-align:top"></td><td class="top_third" style="background: url(http://popup.osp.ru/images/top_bg.jpg); height:12px; vertical-align:top"><a href="javascript:mustDie()"><img style="position:absolute; top:5px;right:5px" src="http://popup.osp.ru/images/close_img.jpg"></a></td></tr><tr><td class="center" colspan="3" style="background:#fff">[[<content>]]</td></tr><tr><td class="bottom" colspan="3"></td></tr></table>'];
ContentLinkCfg.wtemplates = ['<span style="color:red; COLOR: green; BOTTOM: 0px; BORDER-BOTTOM: green 1px solid; POSITION: relative; TEXT-DECORATION: underline; ">[[<word>]]</span>'];
ContentLinkCfg.companys = new Array();
ContentLinkCfg.companys[0] = CreateCompany(0, [['<div></div>', 0, 0, 0]]);
ContentLinkCfg.wcb = [[[0, 100, [[0, 100]]]]];
