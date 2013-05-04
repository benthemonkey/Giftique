define([
	'underscore',
	'backbone',
	'text!templates/Menu.html'
],function(_, Backbone, Menu){

	var MenuView = Backbone.View.extend({
		el: $('#page'),

		render: function(){
			this.$el.html(Menu);
		}
	});

	return MenuView;
});