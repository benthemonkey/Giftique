define(['marionette','templates'], function (Marionette,templates) {
	"use strict";

	return Marionette.CompositeView.extend({
		tagName : 'li',
		template : templates.questionItemView,

		ui : {
		},

		events : {
			'click .clearAnswer' : 'clearAnswer',
			'click .edit'    : 'edit'
		},

		initialize : function() {
			this.listenTo(this.model, 'change', this.render, this);
		},

		onRender : function() {
			this.$el.removeClass('hide answered');
			if (this.model.get('answered')) this.$el.addClass('answered');
			else this.$el.addClass('hide');
		},

		destroy : function() {
			this.model.destroy();
		},

		clearAnswer : function() {
			this.model.set('answered', false).save();
		}
	});
});
