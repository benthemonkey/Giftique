define(['marionette','parse','templates','vent'], function (Marionette,Parse,templates,vent) {
	"use strict";

	return Marionette.ItemView.extend({
		template : templates.userView,

		model: Parse.User,

		events : {
		},

		initialize: function(){
			this.model.bind('change', this.render);
		}
	});
});
