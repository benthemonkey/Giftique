define(['marionette','parse','templates','vent'], function (Marionette,Parse,templates,vent) {
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

    onRender: function(){
      if(this.model.get('background')){
        this.ui.form.css("background-image","url('img/"+this.model.get("background")+"')");
      }else{
        this.ui.form.css("background-image","none");
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
        //this.model.set('answered', answer).save();
        vent.trigger('submitAnswer', this.model, answer);

        var cats = ['travel','places','food_drink','hobbies','activities','art_entertainment','all'],
        cat = document.URL.split("#")[1].substr(9),
        ind = cats.indexOf(cat);
        if(ind != -1){
          if(ind == 5){
            vent.trigger('getResults');
          }else if (ind == 6){
            vent.trigger('getQuestion:category','all');
          }else{
            vent.trigger('getQuestion:category', cats[ind+1]);
          }
        }
      }
    },

    shuffleQuestion : function() {
      vent.trigger('getQuestion:category', document.URL.split("#")[1].substr(9),this.model.id);
    }
  });
});
