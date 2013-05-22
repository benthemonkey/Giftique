define(['marionette','templates'], function (Marionette,templates) {
	"use strict";

	return Marionette.ItemView.extend({
		template : templates.productItemView,
		tagName : function(){ return 'li class="product '+this.model.get("category")+'" data-id="'+this.model.get("etsy_item").listing_id+'"'; }
	});
});