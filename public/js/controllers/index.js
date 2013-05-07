define(['vent'], function (vent) {
	"use strict";

	return {
		getCategory : function(param) {
			vent.trigger('getQuestion:category', param.trim() || '');
		},
		getId : function(param) {
			vent.trigger('getQuestion:id', parseInt(param.trim(),10) || '');
		},
		getResults : function() {
			vent.trigger('questionList:getResults');
		},
		home : function() {
			vent.trigger('home');
		}
	};
});
