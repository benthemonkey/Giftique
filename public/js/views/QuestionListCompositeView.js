/*global define*/

define(['marionette','templates','vent','views/QuestionItemView'], function (Marionette,templates,vent,QuestionItemView) {
  "use strict";

  return Marionette.CompositeView.extend({
    template : templates.questionListCompositeView,
    itemView : QuestionItemView,
    itemViewContainer : '#question-list',

    events : {
      'click #clear-all' : 'onClearAllClick'
    },

    onClearAllClick : function() {
      if(!$('#clear-all').attr("disabled") && confirm("Clear all responses?")){
        vent.trigger("questionList:clear:answered");
      }
    }
  });
});

