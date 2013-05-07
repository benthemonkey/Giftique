define(['marionette','templates'], function (Marionette,templates) {
	"use strict";

	return Marionette.ItemView.extend({
		template : templates.productItemView,

		onShow : function() {
			this.$el.hide();
			this.$el.fadeIn();
		}
	});
});