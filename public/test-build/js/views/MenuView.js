define([
	'text!templates/MenuTemplate.html'
], function(MenuTemplate){

	var MenuView = Backbone.View.extend({
		el: $('#page'),

		render: function(){
			console.log(MenuTemplate);
			this.$el.html(MenuTemplate);
		}
	});

	return MenuView;
});