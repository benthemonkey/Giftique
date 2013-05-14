define(['parse','models/Product'],function(Parse,Product) {
	'use strict';

	return Parse.Collection.extend({
		model: Product,

		comparator: function(product1,product2){
			if(product1.get('views') < product2.get('views')){
				return 1;
			}else if(product1.get('views') > product2.get('views')){
				return -1;
			}else{
				return 0;
			}
		},

		getCategory: function(category){
			query = new Parse.Query(this.model);
			query.equalTo('category',category);
			query.find({
				success: function(results){
					return results;
				},
				error: function(error){
					vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error");
					return;
				}
			});
		}
	});

});