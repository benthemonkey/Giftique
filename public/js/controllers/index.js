define(['vent'], function (vent) {
	"use strict";

	return {
		getCategory : function(param) {
			vent.trigger('getQuestion:category', param.trim() || '');
		},
		getId : function(param) {
			vent.trigger('getQuestion:id', param.trim() || '');
		},
		getResults : function() {
			console.log("fired get results");
			vent.trigger('answerList:getResults');
		},
		account : function() {
			vent.trigger('account');
		},
		tos : function() {
			vent.trigger('tos');
		},
		home : function() {
			vent.trigger('home');
		}
	};
});
