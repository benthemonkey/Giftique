require.config({
	paths: {
		"underscore": "libs/underscore",
		"backbone": "libs/backbone",
		"templates": "../templates"
	}
});

require([
	"giftique"
], function(Giftique){
	Giftique.initialize();
});