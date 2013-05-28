define(['marionette','templates','vent'], function (Marionette,templates,vent) {
	"use strict";

	return Marionette.ItemView.extend({
		template : templates.productItemView,
		tagName : function(){ return 'li class="product" data-id="'+this.model.get("etsy_item").listing_id+
		'" data-category="'+this.model.get("category")+
		'" data-views="'+this.model.get("etsy_views")+
		'" data-price="'+this.model.get("etsy_item").price+'"'; },

		events: {
			'click .thumbnail' : "onClick"
		},

		onClick: function(){
			vent.trigger("showProduct",this.model);
		}
	});
});