;(function($) {
    $.fn.customPopup = function(o) {
        var defaults        = {
            width           : 1180,
			overlayOpacity  : 0.5,
			trigger		 : null,
			closeIcon	   : null,
			transitions	 : "slide",
        };
        var settings        = $.extend({}, defaults, o);
		var $parent = this;
		
		$parent.css({top: -($parent.innerHeight())});

        function initialize() {
			$parent.css({
				width: settings.width,
				marginLeft: -(settings.width/2),
				display: "block",
			});
			if($parent.find("div").hasClass("inner")==false){
				$parent.wrapInner('<div class="inner" style="height:'+$parent.height()+'px"></div>');
			}
			$("body").append('<div class="customPopupOverlay"></div>');
			$(".customPopupOverlay").css({
				width: "100%",
				height: "100%",
				position: "fixed",
				top: "0px",
				left: "0px",
				zIndex: "0",
				cursor: "pointer",
				background:"#000",
				opacity: "0",
			});
			$(".customPopupOverlay").animate({opacity: settings.overlayOpacity}, 200, function(e){
				$parent.animate({top: "50%", marginTop: -($parent.innerHeight()/2)}, 400);
			});
			
			$(".customPopupOverlay").on("click", function(e){
				$parent.animate({top: -($parent.innerHeight())}, 200);
				$(".customPopupOverlay").animate({opacity: 0}, 200, function(e){
					$("body").find(".customPopupOverlay").remove();
				});
			});
        }
		$(settings.closeIcon).on("click", function(e){
			$parent.animate({top: -($parent.innerHeight())}, 400);
			$(".customPopupOverlay").animate({opacity: 0}, 400, function(e){
				$("body").find(".customPopupOverlay").remove();
			});
		});
		$(settings.trigger).on("click", function(e) {
            initialize();
        });
    };
})(jQuery);
