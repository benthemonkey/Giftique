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
			vent.trigger('questionList:getResults');
		},
		tos : function() {
			vent.trigger('tos');
		},
		home : function() {
			vent.trigger('home');
		}
	};
});
