define(['marionette','templates','vent'], function (Marionette,templates,vent) {
  "use strict";

  return Marionette.ItemView.extend({
    template : templates.questionView,

    ui : {
      input: '.myinput',
      form: '.question-form'
    },

    events : {
      'click .submit'  : 'submitAnswer',
      'click .shuffle' : 'shuffleQuestion'
    },

    initialize : function(){
      this.listenTo(this.model, 'change', this.render, this);
    },

    onRender: function(){
      if(this.model.get('background')){
        this.ui.form.css("background-image","url('img/"+this.model.get("background")+"')");
      }else{
        this.ui.form.css("background-image","none");
      }

      var answered = this.model.get('answered');
      if(answered){
        for(var i=0; i < answered.length; i++){
          this.ui.input.eq(i).val(answered[i]);
        }
      }
    },

    submitAnswer : function() {
      var answer = [];

      this.ui.input.each(function(index){
        //if($(this).val() !== ''){
          answer.push($(this).val());
        //}
      });

      if(answer.length > 0){
        this.model.set('answered', answer).save();
        vent.trigger('getQuestion:category', document.URL.split("#")[1].substr(9));
      }
    },

    shuffleQuestion : function() {
      vent.trigger('getQuestion:category', document.URL.split("#")[1].substr(9));
    }
  });
});
