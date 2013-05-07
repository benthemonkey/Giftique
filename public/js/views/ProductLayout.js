define(['marionette','templates','vent'],function(Marionette, templates, vent){
	"use strict";

	return Backbone.Marionette.Layout.extend({
		template: templates.productListLayout,

		onShow: function(){
			vent.trigger('hideUnanswered');
		},

		regions: {
			travel: "#travel-products-list",
			places: "#places-products-list",
			food_drink: "#food-drink-products-list",
			hobbies: "#hobbies-products-list",
			activities: "#activities-products-list",
			art_entertainment: "#art-entertainment-products-list"
		}
	});
});