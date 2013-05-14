define(['marionette','parse','templates','vent'], function (Marionette,Parse,templates,vent) {
	"use strict";

	return Marionette.ItemView.extend({
		template : templates.sidebar,

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
			'click #log-in-btn'		: 'showLogIn',
			'click #sign-up-btn'	: 'showSignUp',
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
			Parse.FacebookUtils.logIn(null, {
				success: function(user) {
					if (!$('#log-in-modal').hasClass("hide")) $('#log-in-modal').modal("hide");
					if (!$('#sign-up-modal').hasClass("hide")) $('#sign-up-modal').modal("hide");

					if (!user.existed()) {
						FB.api('/me', function(response) {
							user.set("name",response.name).save();
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

			this.render();
		},

		logOut: function(){
			Parse.User.logOut();
			this.render();
			vent.trigger("home");
		},

		logIn: function(e) {
			var self = this;
			var username = this.$("#log-in-username").val();
			var password = this.$("#log-in-password").val();

			Parse.User.logIn(username, password, {
				success: function(user) {
					self.render();
					vent.trigger("user:logIn");
				},

				error: function(user, error) {
					this.$(".log-in-form .error").html("Invalid username or password. Please try again.").show();
					this.$(".log-in-form button").removeAttr("disabled");
				}
			});

			this.$(".log-in-form button").attr("disabled", "disabled");

			return false;
		},

		signUp: function(e) {
			var self = this;
			var username = this.$("#sign-up-username").val();
			var password = this.$("#sign-up-password").val();

			if(this.$("#sign-up-password2") != password){
				this.$(".sign-up-form .error").text("Passwords do not match").show();
			}else{
				this.$(".sign-up-form .error").hide();

				Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
					success: function(user) {
						self.render();
						vent.trigger("user:firstLogIn");
					},

					error: function(user, error) {
						self.$(".sign-up-form .error").html(error.message).show();
						this.$(".sign-up-form button").removeAttr("disabled");
					}
				});

				this.$(".sign-up-form button").attr("disabled", "disabled");

				return false;
			}
		}
	});
});
