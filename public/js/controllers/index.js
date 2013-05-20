define(['vent'], function (vent) {
	"use strict";

	return {
		getCategory : function(param) {
			if(Parse.User.current()){
				vent.trigger('getQuestion:category', param.trim() || '');
			}else{
				this.noLogIn();
			}
		},
		getId : function(param) {
			if(Parse.User.current()){
				vent.trigger('getQuestion:id', param.trim() || '');
			}else{
				this.noLogIn();
			}
		},
		getResults : function() {
			if(Parse.User.current()){
				console.log("fired get results");
				vent.trigger('answerList:getResults');
			}else{
				this.noLogIn();
			}
		},
		account : function() {
			vent.trigger('account');
		},
		tos : function() {
			vent.trigger('tos');
		},
		home : function() {
			vent.trigger('home');
		},
		noLogIn : function(){
			vent.trigger('appendAlert',"No user session detected. Try logging in.","error");
			vent.trigger('home');
		}
	};
});
