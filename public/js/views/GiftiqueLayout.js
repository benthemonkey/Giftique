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

			$('.share-facebook-story').on('click',function(){
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
						$(".share-facebook-story").parent().html(
							'<form onsubmit="return false;"><label for="frat">Select your Fraternity</label>'+
							'<select name="frat" id="frat">'+
							'<option>None</option>'+
							'<option>Alpha Epsilon Pi</option>'+
							'<option>Beta Theta Pi</option>'+
							'<option>Delta Chi</option>'+
							'<option>Delta Tau Delta</option>'+
							'<option>Delta Upsilon</option>'+
							'<option>Evans Scholars</option>'+
							'<option>Lambda Chi Alpha</option>'+
							'<option>Phi Delta Theta</option>'+
							'<option>Phi Gamma Delta</option>'+
							'<option>Phi Kappa Psi</option>'+
							'<option>Phi Mu Alpha</option>'+
							'<option>Pi Kappa Alpha</option>'+
							'<option>Sigma Alpha Epsilon</option>'+
							'<option>Sigma Chi</option>'+
							'<option>Sigma Nu</option>'+
							'<option>Sigma Phi Epsilon</option>'+
							'<option>Theta Chi</option>'+
							'<option>Zeta Beta Tau</option></select></form>');

						$("#frat").on('change',function(e){
							console.log(e.target.value);
							var user = Parse.User.current();
							user.save({ "frat" : e.target.value },{
								success: function(){
									vent.trigger("appendAlert","Frat saved!","success");
								},
								error: function(){
									alert("frat not saved!");
								}
							});
						});
					} else {
						alert('Post was not published.');
					}
				});
			});
		},

		regions: {
			question: '#question',//new MainRegion({ el: "#question" }),
			products: '#products'//new MainRegion({ el: "#products" })
		},

		events: {
			'click .nav-tabs' : 'onCategoryClick'
		},

		onCategoryClick: function(e){
			if(!$(e.target).closest('li').hasClass("active")){
				vent.trigger("getQuestion:category",e.target.innerText.toLowerCase().replace("/","_").trim());
			}
		},

		onClose: function(){
			$('.share-facebook-story').off('click');
		}
	});
});