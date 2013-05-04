/*global define*/

define(['marionette','templates'], function (Marionette,templates) {
  "use strict";

  return Marionette.ItemView.extend({
    template : templates.questionView,

    ui : {
      input: '.input'
    },

    events : {
      'click .submit'  : 'submitAnswer',
      'click .shuffle' : 'shuffleQuestion'
    },

    submitAnswer : function() {
      var string = '';

      this.ui.input.each(function(index){
        string += $(this).val();
      });

      this.model.set('answered', string).save();
    }
  });
});
