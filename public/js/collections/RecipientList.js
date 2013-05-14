define(['parse','models/Recipient'],function(Parse,Recipient) {
	'use strict';

	return Parse.Collection.extend({
		model: Recipient
	});
});