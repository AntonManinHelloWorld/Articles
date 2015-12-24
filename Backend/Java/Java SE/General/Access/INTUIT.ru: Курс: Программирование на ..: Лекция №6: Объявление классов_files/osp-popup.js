

function write_osp_popup() {
   document.write('<link href="http://popup.osp.ru/style.css" rel="stylesheet" type="text/css">');
   document.write('<script type="text/javascript" src="http://popup.osp.ru/tooltip_js_cfg/tooltip-core.js"></script>');
   document.write('<script type="text/javascript" src="http://popup.osp.ru/tooltip_js_cfg/tooltip-dynamic.js"></script>');
   document.write('<script type="text/javascript" src="http://popup.osp.ru/tooltip_cfg/tooltip-cfg-16.js?rnd=' + Math.round(Math.random() * 100000) + '"><\/script>');
}


write_osp_popup();

