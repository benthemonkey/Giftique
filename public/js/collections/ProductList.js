define(['backbone','models/Product'],function(Backbone,Product) {
	'use strict';

	return Backbone.Collection.extend({
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
			return this.where({category: category});
		}
	});

});