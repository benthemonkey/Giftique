var giftique = (function($){
	var init = function(){
		//$('#welcome').modal('show');

		//event handlers
		$('#travel-btn').on("click",function(){
			$('#main-menu').hide("slide", { direction: "left" },function(){
				$('#travel').show("slide", { direction: "right" }, function(){ loadMap(); });
			});
		});

		$('#food-drink-btn').on("click",function(){
			$('#main-menu').hide("slide", { direction: "left" },function(){
				var ind = Math.floor(Math.random()*modules.food_drink.length);
				modules.food_drink[ind].load();
			});
		});
	};

	var loadMap = function(){
		$('#map').vectorMap({
			map: 'world_mill_en',
			backgroundColor: 'transparent',

			series: {
				regions: [{
					values: gdpData,
					scale: ['#C8EEFF', '#0071A4'],
					normalizeFunction: 'polynomial'
				}]
			},
			hoverOpacity: 0.7,
			hoverColor: false,
			onRegionClick: function(event,str){
				var v = map.getRegionName(str),
				searches = [{name: "l1", val: v+" souvenir"},
				{name: "l2", val: v+" clothing"},
				{name: "l3", val: v+" gift"},
				{name: "l4", val: v+" custom"}];
				//etsysearch(searches);
			}
		});
		var map = $('#map').vectorMap('get','mapObject');
	};

	return {init: init};
})(jQuery);

function module(title,body,blanks){
	this.title = title;
	this.body = body;
	this.blanks = blanks;

	this.load = function(){
		$('#text-title').text(this.title);
		$('#text-body').html(this.body);

		for(var i=0; i<this.blanks.length; i++){
			$("#"+this.blanks[i].id).attr("placeholder",this.blanks[i].placeholder);
		}

		$('#text-module').show("slide", { direction: "right" });
	};
}

function blank(placeholder,id){
	this.placeholder = placeholder;
	this.id = id;
}

var modules = {
	travel: [],
	food_drink: [],
	hobbies: [],
	entertainment: [],
	music: []
};

modules.food_drink.push(new module(
	'Title',
	'This is a question with <input type="text" id="id1" class="blank" required>, <input type="text" id="id2" class="blank" required>, and <input type="text" id="id3" class="blank" required> blanks in it!',
	[new blank('Blank 1','id1'), new blank('Blank 2','id2'), new blank('Blank 3','id3')])
);

modules.food_drink.push(new module(
	'Title 2',
	'This is a question with <input type="text" id="id1" class="blank" required> and <input type="text" id="id2" class="blank" required> blanks in it!',
	[new blank('Blank 1','id1'), new blank('Blank 2','id2')])
);



$(document).ready(function(){ giftique.init(); });