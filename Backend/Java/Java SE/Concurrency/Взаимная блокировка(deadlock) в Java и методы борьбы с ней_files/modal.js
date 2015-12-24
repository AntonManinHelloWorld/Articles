var modalBox = {
	h: undefined,
	init: function (source, data, handler, height, width) {
		if(source)
			$(source).on("click", function (e) {
				$(".modal-close").click();
				setTimeout(function(){
					if(height) 
						modalBox.h=height;
					else
						modalBox.h="280";
					e.preventDefault();
					$($.trim(data)).modal("show");
                    /*
                     {
                     closeHTML: "<a title='Close' class='modal-close'>x</a>",
                     position: ["15%",],
                     overlayId: 'overlay',
                     containerId: 'container',
                     onOpen: modalBox.open,
                     onShow: handler,
                     onClose: modalBox.close
                     }
                     */
				}, 1000);
			});
		else
		{
			if(height) modalBox.h=height;            
			if(width) modalBox.w=width;
			$($.trim(data)).modal({
				closeHTML: "<a title='Close' class='modal-close'>x</a>",
				position: ["15%",],
				overlayId: 'overlay',
				containerId: 'container',
				minWidth: modalBox.w,
				minHeight: modalBox.h,
				onOpen: modalBox.open,				
				onShow: handler,
				onClose: modalBox.close
			});
		}
	},
	open: function (dialog) {
		// add padding to the buttons in firefox/mozilla
		if (window.navigator.userAgent.search("Firefox") >= 0) {
			$('#container .button').css({
				'padding-bottom': '2px'
			});
		}
		// input field font size
		if (window.navigator.userAgent.search("Safari") >= 0) {
			$('#container .input').css({
				'font-size': '.9em'
			});
		}
		// dynamically determine height
		dialog.overlay.fadeIn(200, function () {
			dialog.container.fadeIn(200, function () {
				dialog.data.fadeIn(200, function () {
					$('#container form').fadeIn(200, function () {
						// fix png's for IE 6
						if (window.navigator.userAgent.search("MSIE") >= 0 && parseInt(/MSIE (\d+(\.\d))/.exec(window.navigator.userAgent)[1])<7) {
							$('#container .button').each(function () {
								if ($(this).css('backgroundImage').match(/^url[("']+(.*\.png)[)"']+$/i)) 
								{
									var src = RegExp.$1;
									$(this).css({
										backgroundImage: 'none',
										filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' +  src + '", sizingMethod="crop")'
									});
								}
							});
						}
					});
					$('#container .content').show();
				});
			});
		});
	},
	close: function (dialog) {
		dialog.data.fadeOut(200, function () {
			dialog.container.fadeOut(200, function () {
				dialog.overlay.fadeOut(200, function () {
					$.modal.close();
				});
			});
		});
	}
};