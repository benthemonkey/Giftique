define(['marionette','templates','vent'], function (Marionette,templates,vent) {
	"use strict";

	return Marionette.CompositeView.extend({
		tagName : 'li',
		template : templates.answerItemView,

		ui : {
		},

		events : {
			'click .clearAnswer' : 'removeAnswer',
			'click .edit'    : 'edit'
		},

		/*initialize : function() {
			this.listenTo(this.model, 'change', this.render, this);
		},*/

		removeAnswer : function() {
			this.model.set("user",null).save();
			vent.trigger("answerList:remove",this.model);
		}
	});
});
