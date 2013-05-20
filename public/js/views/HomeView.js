define(['marionette','templates'], function (Marionette,templates) {
	"use strict";

	return Marionette.ItemView.extend({
		template: templates.homeView,

		onShow: function(){
			$('#home-btn').addClass("active");

			if(Parse.User.current()){
				$("#get-started").unbind("click")
				.attr("href","#category/all").text("Get Started!");
			}

			$('#meet-robbie').on('shown', function(){
				$('body').css('overflow', 'hidden');
			}).on('hidden', function(){
				$('body').css('overflow', 'auto');
			});
		},

		onClose: function(){
			$('#home-btn').removeClass("active");
		}
	});
});