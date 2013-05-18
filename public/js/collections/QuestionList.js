define(['backbone','models/Question'],function(Backbone,Question) {
	'use strict';

	return Backbone.Collection.extend({
		model: Question,

		getAnswered: function() {
			return this.filter(function(question){ return question.get("answered"); });
		},

		getAnsweredCategoryCount: function(category){
			var filtered = this.filter(function(question){
				return question.get("category") == category && question.get("answered");
			});

			return filtered.length;
		},

		getUnanswered: function() {
			return this.where({"answered": false});
		},

		getCategory: function(category, currentId){
			return this.filter(function(question){
				return question.get("category") == category && !question.get("answered") && question.id != currentId;
			});
		}
	});

});