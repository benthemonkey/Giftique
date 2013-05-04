define([
	'underscore',
	'backbone',
	'models/QuestionModel',
	'libs/backbone.localStorage'
],function(_, Backbone, QuestionModel){
	var QuestionsCollection = Backbone.Collection.extend({
		model: QuestionModel,

		localStorage: new Backbone.LocalStorage("giftique"),

		initialize: function(models, options){}
	});

	return QuestionsCollection;
});