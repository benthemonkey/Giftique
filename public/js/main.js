require.config({
	paths : {
		underscore : 'libs/underscore.min',
		backbone   : 'libs/backbone',
		parse      : 'libs/parse',
		marionette : 'libs/backbone.marionette.min',
		jquery     : 'libs/jquery.min',
		jquery_ui  : 'libs/jquery-ui.min',
		quicksand  : 'libs/jquery.quicksand',
		bootstrap  : 'libs/bootstrap',
		tpl        : 'libs/tpl',
		third_party: 'libs/3rdParty'
	},
	shim : {
		underscore : {
			exports : '_'
		},
		backbone : {
			exports : 'Backbone',
			deps : ['jquery','underscore']
		},
		parse : {
			exports : 'Parse',
			deps : ['jquery']
		},
		marionette : {
			exports : 'Backbone.Marionette',
			deps : ['backbone']
		},
		jquery_ui : {
			deps : ['jquery']
		},
		quicksand : {
			deps : ['jquery']
		},
		bootstrap : {
			deps : ['jquery']
		}
	},
	deps : ['jquery','underscore']
});

require(['app','parse','router','controller','third_party','bootstrap','jquery_ui'],function(app,Parse,Router,Controller,ThirdParty){

	Parse.initialize("jETjrmeloXB54t2oBPkLFsgyh4wmkU9vyS0PJwGO", "SgiDW5lYwfzxd5CB2z25eVx5SfB4kT5SGGM91Ymw");//("gMyxpM84HXUfooYCh9SYqieWgZyMY5xBcGUfkt4s", "D2S9TY00GRYQNYTXMEPQNGLze1FoDOUEFQTyOv8P");//Prod: ("jETjrmeloXB54t2oBPkLFsgyh4wmkU9vyS0PJwGO", "SgiDW5lYwfzxd5CB2z25eVx5SfB4kT5SGGM91Ymw");
	ThirdParty.init();
	//$(document).ready(function(){

	app.etsyTest();
	app.router = new Router({
		controller : Controller
	});

	//app.init();
	app.start();

	var google_prefix = "http://commondatastorage.googleapis.com/giftiqueme/",
	arr = [
	'GiftiqueFront2.jpg',
	'facebook-button.png',
	'giftiqueme-logo-white-shadow.png',
	'b-activities-biking.jpg',
	'b-activities-spa.jpg',
	'b-activities-yoga.jpg',
	'b-art-entertainment-ballet.jpg',
	'b-art-entertainment-painting.jpg',
	'b-art-entertainment-piano.jpg',
	'b-food-drink-burger.jpg',
	'b-food-drink-milkshake.jpg',
	'b-food-drink-smoothie.jpg',
	'b-food-drink-thai.jpg',
	'b-food-drink-wine.jpg',
	'b-hobbies-cooking.jpg',
	'b-hobbies-photography.jpg',
	'b-hobbies-qualitytime.jpg',
	'b-hobbies-snowday.jpg',
	'b-places-beach.jpg',
	'b-places-cancun.jpg',
	'b-places-navypier.jpg',
	'b-travel-bahamas.jpg',
	'b-travel-hawaii.jpg',
	'b-travel-paris.jpg',
	'b-travel-venice.jpg'
	],
	loadingBar = $("#loading-bar");

	var loaded = 0,
	imageLoaded = function(){
		loaded++;
		loadingBar.css("width",loaded/arr.length*95+"%");
		if(loaded == arr.length){
			loadingBar.css("width","100%");
			//=== MAIN INITIALIZER ===
			setTimeout(app.init,200);
		}
	};

	var newimages=[];
	for (var i=0; i<arr.length; i++){
		newimages[i] = new Image();
		newimages[i].onLoad = imageLoaded();
		newimages[i].src = google_prefix + arr[i];
	}
});
