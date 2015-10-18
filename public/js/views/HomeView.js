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
			"click #facebook-log-in": "facebookLogIn",
			"click #anonymous-log-in": "anonymousLogIn"
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
		},

		anonymousLogIn: function(){
			var self = this,
				randomNumber = '' + new Date().getTime();

			Parse.User.signUp('Anonymous' + randomNumber, randomNumber, { name: 'Anonymous' }, {
				success: function(user) {
					vent.trigger("user:logIn");
					vent.trigger("home");
					vent.trigger("appendAlert", "Warning: You are logged in anonymously. All information will be lost when your session expires.", "warning", true);
				},
				error: function(user, error) {
					console.log(error);
					console.log("Anonymous log in error.");
				}
			});
		}
	});
});