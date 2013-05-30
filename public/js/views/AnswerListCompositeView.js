/*global define*/

define(['marionette','templates','vent','views/AnswerItemView'], function (Marionette,templates,vent,AnswerItemView) {
  "use strict";

  return Marionette.CompositeView.extend({
    template : templates.answerListCompositeView,
    itemView : AnswerItemView,
    itemViewContainer : '.answer-list',
    emptyView: Marionette.ItemView.extend({ template: "#empty-list" }),

    initialize: function(){
      this.listenTo(this.collection, 'change', this.render);
    }
  });
});

