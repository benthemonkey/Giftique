define(['parse','models/Product'],function(Parse,Product) {
	'use strict';

	return Parse.Collection.extend({
		model: Product,
		comparator: function(product1,product2){
			if(product1.createdAt < product2.createdAt){
				return 1;
			}else if(product1.createdAt > product2.createdAt){
				return -1;
			}else{
				return 0;
			}
		}
	});

});