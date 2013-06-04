/*global define*/

define(['marionette','templates','vent','views/AnswerItemView'], function (Marionette,templates,vent,AnswerItemView) {
  "use strict";

  return Marionette.CompositeView.extend({
    template : templates.answerListCompositeView,
    itemView : AnswerItemView,
    itemViewContainer : '.answer-list',
    emptyView: Marionette.ItemView.extend({ template: templates.emptyAnswerList }),

    initialize: function(){
      this.listenTo(this.collection, 'change', this.render);
    },

    events: {
      'click #refetch': 'refetch'
    },

    refetch: function(){
      vent.trigger('productList:refetch');
      $("#refetch").attr("disabled","disabled");
      setTimeout(function(){
        $("#refetch").removeAttr("disabled");
      }, 5000);
    }
  });
});

