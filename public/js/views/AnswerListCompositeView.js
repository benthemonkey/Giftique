/*global define*/

define(['marionette','templates','vent','views/AnswerItemView'], function (Marionette,templates,vent,AnswerItemView) {
  "use strict";

  return Marionette.CompositeView.extend({
    template : templates.answerListCompositeView,
    itemView : AnswerItemView,
    itemViewContainer : '.answer-list',

    initialize: function(){
      this.listenTo(this.collection, 'change', this.render);
    },


    onRender: function(){
      if(this.collection.length > 0){
        $('#empty-list').hide();
        $('#get-results').removeAttr("disabled").attr("href","#results");
      }else{
        $('#empty-list').show();
        $('#get-results').attr("disabled","disabled").removeAttr("href");
      }
    },

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

