define(['marionette','parse','templates','vent','views/AnswerItemView'], function (Marionette,Parse,templates,vent,AnswerItemView) {
	"use strict";

	return Marionette.ItemView.extend({
		template : templates.accountView,
		model: Parse.User,

		initialize: function(){
			this.model.bind('change', this.render);
		}
	});
});
