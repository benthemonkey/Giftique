define(['marionette','templates'], function (Marionette,templates) {
	"use strict";

	return Marionette.CompositeView.extend({
		tagName : 'li',
		template : templates.answerItemView,

		ui : {
		},

		events : {
			'click .clearAnswer' : 'destroy',
			'click .edit'    : 'edit'
		},

		initialize : function() {
			this.listenTo(this.model, 'change', this.render, this);
		},

		destroy : function() {
			this.model.set("user",null).save();
			this.model.destroy();
		}
	});
});
