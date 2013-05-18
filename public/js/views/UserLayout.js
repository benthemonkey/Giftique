define(['marionette','templates','vent'],function(Marionette, templates, vent){
	"use strict";

	return Backbone.Marionette.Layout.extend({
		template: templates.userLayout,

		onShow: function(){
			vent.trigger("temp");
		},

		regions: {
			account: "#account",
			answers: "#answers"
		}
	});
});