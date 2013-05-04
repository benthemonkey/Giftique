define([
	'views/MenuView',
	'views/QuestionView'
	//'views/FooterView'
],
function(MenuView, QuestionView){

	var GiftiqueRouter = Backbone.Router.extend({
		routes: {
			'travel': 'showTravelQuestion',
			'food-drink': 'showFoodDrinkQuestion',
			'lucky': 'showRandomQuestion',
			'*actions': 'defaultAction'
		}
	});

	var initialize = function(){

		var giftique_router = new GiftiqueRouter();

		giftique_router.on('route:showTravelQuestion', function(){
			var question_view = new QuestionView();

			question_view.render();
		});

		giftique_router.on('route:defaultAction', function(){
			var menu_view = new MenuView();

			menu_view.render();
		});

		//var footer_view = new FooterView();

		Backbone.history.start();
	};

	return { initialize: initialize };
});