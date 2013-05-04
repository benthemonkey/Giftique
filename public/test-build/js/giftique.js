define([
	'underscore',
	'backbone',
	'collections/QuestionsCollection',
	'router'
], function(_, Backbone, QuestionsCollection, Router){
	var initialize = function(){
		Router.initialize();

		this.Questions = new QuestionsCollection();
	};

	var Giftique = { initialize: initialize };

	return Giftique;
});