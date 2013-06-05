define(['vent'], function (vent) {
	"use strict";

	return {
		getId : function(param) {
			if(Parse.User.current()){
				vent.trigger('getQuestion:id', param.trim() || '');
			}else{
				this.noLogIn();
			}
		},
		showProduct: function(param){
			vent.trigger('home');
			vent.trigger('showProduct',param.trim());
		},
		/*getCategory : function(param) {
			if(Parse.User.current()){
				vent.trigger('getQuestion:category', param.trim() || '');
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
		},*/
		privacy : function() {
			vent.trigger('home');
			vent.trigger('privacy');
		},
		tos : function() {
			vent.trigger('home');
			vent.trigger('tos');
		},
		account : function() {
			vent.trigger('account');
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
