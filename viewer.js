(function() {
	var loadScript = function(src) {
		var script = document.createElement("SCRIPT");
		script.src = src;
		script.type = 'text/javascript';
		document.getElementsByTagName("head")[0].appendChild(script);
	};

	loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
	loadScript('https://cdnjs.cloudflare.com/ajax/libs/json5/0.3.0/json5.min.js');
	loadScript('https://d2buqb93zlai30.cloudfront.net/js/0.17/pro.greensock.min.js');
	loadScript('https://d2buqb93zlai30.cloudfront.net/js/0.17/pro.motion.js');

	var checkReady = function(callback) {
		if (
			window.jQuery !== undefined &&
			window.JSON5 !== undefined &&
			window.TweenMax !== undefined &&
			window.Pro !== undefined)
		{
			callback(jQuery);
		}
		else {
			window.setTimeout(function() { checkReady(callback); }, 20);
		}
	};

	checkReady(function($) {
		$(function() {
			$.ajax({
				url: "story.json5",
				dataType: 'text',
				success:function(story){
					Pro.Motion.Stories.demo = {
						story: JSON5.parse(story)
					};
					$("body").attr("data-pro-motion","demo");
					
					//Override some of the default configuration values
					Pro.Motion.Stories.Config.default.keyboard = true,
					Pro.Motion.Stories.Config.default.touch = true,
					Pro.Motion.Stories.Config.default.mouseWheel = true,
					Pro.Motion.Stories.Config.default.auto.advance = true;
					Pro.Motion.Stories.Config.default.auto.restart = true;

					$.ajax({
						url: "story-config.json5",
						dataType: 'text',
						success:function(config){
							Pro.Motion.Stories.Config.demo = JSON5.parse(config);
							Pro.Motion.reload();
						},
						error:function(jqXHR, textStatus, errorThrown){
							Pro.Motion.reload();  //If we can't read a config file, use the defaults
						}
					});
				},
				error:function(jqXHR, textStatus, errorThrown){
					$("body").html("story.json5 - " + jqXHR.status + " - " + jqXHR.statusText);
				}
			});
		});
	});
})();