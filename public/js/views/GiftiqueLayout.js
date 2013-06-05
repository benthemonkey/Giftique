define(['marionette','templates','views/MainRegion','vent'],function(Marionette, templates, MainRegion, vent){
	"use strict";

	return Backbone.Marionette.Layout.extend({
		template: templates.giftiqueLayout,

		initialize: function(options){
			this.app = options.app;
		},

		onShow: function(){
			this.app.navbarView.render();

			vent.trigger("temp2");

			/*$('.share-facebook-story').on('click',function(){
				FB.ui({
					method: 'feed',
					link: 'http://www.giftique.me',
					picture: 'http://commondatastorage.googleapis.com/giftiqueme/giftique-g.jpg',
					name: 'Giftique.me',
					caption: 'Personalized gifts to represent your relationship.',
					description: 'Get fun, personalized gift recommendations for FREE by taking the Giftique quiz!'
				},
				function(response) {
					if (response && response.post_id) {
						//successful post
					} else {
						alert('Post was not published.');
					}
				});
			});*/
		},

		regions: {
			question: '#question',//new MainRegion({ el: "#question" }),
			products: '#products'//new MainRegion({ el: "#products" })
		},

		events: {
			'click .nav-tabs>li>a' : 'onCategoryClick'
		},

		onCategoryClick: function(e){
			if(!$(e.target).closest('li').hasClass("active")){
				vent.trigger("getQuestion:category",e.target.innerText.toLowerCase().replace("/","_").trim());
			}
		}
	});
});