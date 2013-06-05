define(['marionette','parse','templates','vent'], function (Marionette,Parse,templates,vent) {
	"use strict";

	return Marionette.ItemView.extend({
		template : templates.navbar,

		tagName : 'div class="dropdown"',

		modelEvents : {
			'change': 'modelChange'
		},

		/*collectionEvents: {
			'change': 'collectionChange'
		},*/

		onRender: function(){
			this.modelChange();
			//this.collectionChange();
		},

		modelChange: function(){
			var user = Parse.User.current();

			if(user){
				var name = user.get("name") || "Account";
				name = name.split(" ")[0];
			}
		},

		/*collectionChange: function(){
			var cats = ['travel','places','food_drink','hobbies','activities','art_entertainment'],
			self = this,
			total = 0,

			answerCount = function(cat){
				var count = self.collection.getAnsweredCategoryCount(cat);
				total += count;
				if( count > 0){
					self.ui[cat].find('.label').text(count).removeClass("hide");
				}else{
					self.ui[cat].find('.label').addClass("hide");
				}
			};

			cats.map(answerCount);

			var bar = $("#bar");

			$(".bar-label").text(total+" / "+self.collection.length+" Questions Answered");

			if(total > 0){
				bar.css("width",100*total/self.collection.length+"%");
			}else{
				bar.css("width","0");
			}

			if(3 >= total){
				bar.removeClass("bar-warning").addClass("bar-danger");
			}else if(total > 3 && total <= 8){
				bar.removeClass("bar-danger").removeClass("bar-success").addClass("bar-warning");
			}else{
				bar.removeClass("bar-warning").addClass("bar-success");
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
			session_nav: "#session-nav",
			progress_bar: "#progress-bar"
		},*/

		events : {
			'click #log-out' : 'logOut'
		},

		logOut: function(){
			Parse.User.logOut();
			//this.render();
			vent.trigger("user:logOut");
			vent.trigger("home");
		}
	});
});
