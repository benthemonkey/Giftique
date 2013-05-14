define(['parse','models/Question'],function(Parse,Question) {
	'use strict';

	return Parse.Collection.extend({
		model: Question
	});

});