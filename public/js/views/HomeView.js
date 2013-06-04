define(['marionette','templates','vent'], function (Marionette,templates,vent) {
	"use strict";

	return Marionette.ItemView.extend({
		template: templates.homeView,

		onShow: function(){
			$('#meet-robbie').on('shown', function(){
				$('body').css('overflow', 'hidden');
			}).on('hidden', function(){
				$('body').css('overflow', 'auto');
			});
		},

		events: {
			"click #facebook-log-in": "facebookLogIn"
		},

		facebookLogIn: function(){
			var self = this;

			Parse.FacebookUtils.logIn(null, {
				success: function(user) {
					//self.render();

					if (!user.existed()) {
						FB.api('/me', function(response) {
							user.set("name",response.name).save();
							vent.trigger("user:logIn");
							vent.trigger("user:firstLogIn");
							vent.trigger("home");
						});
					} else {
						vent.trigger("user:logIn");
						vent.trigger("home");
					}
				},
				error: function(user, error) {
					console.log("User cancelled the Facebook login or did not fully authorize.");
				}
			});
		}
	});
});