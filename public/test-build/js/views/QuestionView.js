define([
	'underscore',
	'backbone',
	'text!templates/BlankQuestion.html'
],function(_, Backbone, BlankQuestion){

	var QuestionView = Backbone.View.extend({
		el: $('#question'),

		render: function(){
			this.$el.html(_.template(BlankQuestion,{title: "TEST"}));
		}
	});

	return QuestionView;
});