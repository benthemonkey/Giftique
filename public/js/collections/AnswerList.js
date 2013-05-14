define(['parse','models/Answer'],function(Parse,Answer) {
	'use strict';

	return Parse.Collection.extend({
		model: Answer
	});
});