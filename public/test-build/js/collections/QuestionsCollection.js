define([
'models/QuestionModel'
],function(QuestionModel){
	var QuestionsCollection = Backbone.collection.extend({
		model: QuestionModel,
		initialize: function(models, options){}
	});

	return QuestionsCollection;
});