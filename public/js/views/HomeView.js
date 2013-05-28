define(['marionette','templates'], function (Marionette,templates) {
	"use strict";

	return Marionette.ItemView.extend({
		template: templates.homeView,

		onShow: function(){
			$('#meet-robbie').on('shown', function(){
				$('body').css('overflow', 'hidden');
			}).on('hidden', function(){
				$('body').css('overflow', 'auto');
			});
		}
	});
});