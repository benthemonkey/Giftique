define(['parse','models/Product'],function(Parse,Product) {
	'use strict';

	return Parse.Collection.extend({
		model: Product,

		comparator: function(product1,product2){
			if(product1.get('etsy_item').views < product2.get('etsy_item').views){
				return 1;
			}else if(product1.get('etsy_item').views > product2.get('etsy_item').views){
				return -1;
			}else{
				return 0;
			}
		},

		isUniqueListingId: function(product){
			var existing_ids = this.pluck("etsy_item").map(function(etsy_item){ return etsy_item.listing_id; });

			return existing_ids.indexOf(product.get("etsy_item").listing_id) == -1;
		}
	});

});