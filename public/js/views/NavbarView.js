define(['marionette','parse','templates','vent'], function (Marionette,Parse,templates,vent) {
	"use strict";

	return Marionette.ItemView.extend({
		template : templates.navbar,

		tagName : 'div class="navbar-inner"',

		modelEvents : {
			'change': 'modelChange'
		},

		collectionEvents: {
			'change': 'collectionChange'
		},

		onRender: function(){
			this.modelChange();
			this.collectionChange();
		},

		modelChange: function(){
			var user = Parse.User.current();

			if(user){
				var name = user.get("name") || "Account";
				name = name.split(" ")[0];
				this.ui.status.html('<li id="account-btn"><a href="#account">'+name+'</a></li><li><a class="pointer" id="log-out">Logout</a></li>');
				$("#get-started").addClass("disabled");
				this.ui.session_nav.fadeIn();
			}
		},

		collectionChange: function(){
			var cats = ['travel','places','food_drink','hobbies','activities','art_entertainment'],
			self = this,
			anyAnswered = false,

			answerCount = function(cat){
				var count = self.collection.getAnsweredCategoryCount(cat);
				if( count > 0){
					self.ui[cat].find('.label').text(count).removeClass("hide");
					anyAnswered = true;
				}else{
					self.ui[cat].find('.label').addClass("hide");
				}
			};

			cats.map(answerCount);

			if(anyAnswered){
				this.ui.results.removeClass("hide");
			} else {
				this.ui.results.addClass("hide");
			}
		},

		ui : {
			home: "#home-btn",
			travel: "#travel-btn",
			places: "#places-btn",
			food_drink: "#food_drink-btn",
			hobbies: "#hobbies-btn",
			activities: "#activities-btn",
			art_entertainment: "#art_entertainment-btn",
			all: "#all-btn",
			results: "#results-btn",
			status: "#status",
			session_nav: "#session-nav"
		},

		events : {
			'click .facebook-log-in': 'facebookLogIn',
			'click #log-out'		: 'logOut'
		},

		facebookLogIn: function(){
			var self = this;

			Parse.FacebookUtils.logIn(null, {
				success: function(user) {
					self.render();

					if (!user.existed()) {
						FB.api('/me', function(response) {
							user.set("name",response.name).save();
							vent.trigger("user:logIn");
							vent.trigger("user:firstLogIn");
						});
					} else {
						vent.trigger("user:logIn");
					}
				},
				error: function(user, error) {
					console.log("User cancelled the Facebook login or did not fully authorize.");
				}
			});
		},

		logOut: function(){
			Parse.User.logOut();
			this.render();
			vent.trigger("home");
			vent.trigger("user:logOut");
		}
	});
});
