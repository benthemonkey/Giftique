define(['backbone','models/Question','libs/backbone.localStorage'],function(Backbone,Question) {
	'use strict';

	function isAnswered(question) { return question.get('answered'); }

	return Backbone.Collection.extend({
		model: Question,
		localStorage: new Backbone.LocalStorage('giftique'),

		getAnswered: function() {
			return this.filter(isAnswered);
		},

		getUnanswered: function() {
			return this.where({answered: false});
		},

		getCategory: function(category){
			return this.where({category: category, answered: false});
		},

		getId: function(id){
			return this.findWhere({id: id});
		}
	});

});