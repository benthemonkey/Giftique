define(['marionette','parse','templates','vent'], function (Marionette,Parse,templates,vent) {
	"use strict";

	return Marionette.ItemView.extend({
		template : templates.sidebar,

		initialize: function(){
			this.listenTo(this.collection,'change',this.update);
		},

		onRender: function(){
			var user = Parse.User.current();
			if(user && user.get("username").substr(0,4) != "anon"){
				$("#status").html('<li><a href="#"><i class="icon-user"></i> Account</a></li><li><a class="pointer" id="log-out"><i class="icon-minus-sign"></i> Logout</a></li>');
			}

			this.update();
		},

		update: function(){
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
				$('#results-btn').removeClass("hide");
			} else {
				$('#results-btn').addClass("hide");
			}
		},

		ui : {
			home: "#home",
			travel: "#travel",
			places: "#places",
			food_drink: "#food_drink",
			hobbies: "#hobbies",
			activities: "#activities",
			art_entertainment: "#art_entertainment",
			all: "#all"
		},

		events : {
			'click #expand-sidebar' : 'onExpandSidebar',
			'click .log-in-btn'		: 'showLogIn',
			'click .sign-up-btn'	: 'showSignUp',
			'click .facebook-log-in': 'facebookLogIn',
			'click #log-out'			: 'logOut',
			'submit form.log-in-form': 'logIn',
			'submit form.sign-up-form': 'signUp'
		},

		onExpandSidebar: function(){
			$(".nav-large").toggle();
			$(".nav-small").toggle();
			$("#content").toggleClass("span11").toggleClass("span9");
			$("#sidebar").toggleClass("span1").toggleClass("span3");
		},

		showLogIn: function(){
			$('#log-in-modal').modal("show");
		},

		showSignUp: function(){
			$('#sign-up-modal').modal("show");
		},

		facebookLogIn: function(){
			var self = this;

			Parse.FacebookUtils.logIn(null, {
				success: function(user) {
					if (!$('#log-in-modal').hasClass("hide")) $('#log-in-modal').modal("hide");
					if (!$('#sign-up-modal').hasClass("hide")) $('#sign-up-modal').modal("hide");

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
					alert("User cancelled the Facebook login or did not fully authorize.");
				}
			});
		},

		logOut: function(){
			Parse.User.logOut();
			this.render();
			vent.trigger("home");
			vent.trigger("user:logOut");
		},

		logIn: function(e) {
			var self = this;
			var username = this.$("#log-in-username").val().toLowerCase();
			var password = this.$("#log-in-password").val();

			Parse.User.logIn(username, password, {
				success: function(user) {
					$('#log-in-modal').modal('hide');
					self.render();
					vent.trigger("user:logIn");
				},

				error: function(user, error) {
					$(".log-in-form .alert").html("Invalid username or password. Please try again.").show();
					$(".log-in-form button").removeAttr("disabled");
				}
			});

			this.$(".log-in-form button").attr("disabled", "disabled");

			return false;
		},

		signUp: function(e) {
			this.$(".sign-up-form .alert").fadeOut();
			var self = this;
			var username = this.$("#sign-up-username").val().toLowerCase();
			var password = this.$("#sign-up-password").val();

			if(this.$("#sign-up-password2").val() != password){
				this.$(".sign-up-form .alert").text("Passwords do not match").fadeIn();
			}else{
				Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
					success: function(user) {
						$('#sign-up-modal').modal('hide');
						self.render();
						vent.trigger("user:firstLogIn");
						vent.trigger("user:logIn");
					},

					error: function(user, error) {
						$(".sign-up-form .alert").html(error.message).fadeIn();
						$(".sign-up-form button").removeAttr("disabled");
					}
				});

				this.$(".sign-up-form button").attr("disabled", "disabled");

				return false;
			}
		}
	});
});
