define(['underscore','backbone'],function(_,Backbone){
	var QuestionModel = Backbone.Model.extend({
		defaults: {
			type: "text"
		}
	});

	return QuestionModel;
});