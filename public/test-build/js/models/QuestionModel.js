define([
	'underscore',
	'backbone'
],function(_, Backbone){
	var QuestionModel = Backbone.Model.extend({
		defaults: {
			type: "text",
			template: "blanks_question",
			content: ["Question is","missing."],
			response: false
		}
	});

	return QuestionModel;
});