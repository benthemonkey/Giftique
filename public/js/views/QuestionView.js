define(['marionette','parse','templates','vent','models/Answer'], function (Marionette,Parse,templates,vent, Answer) {
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

    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
    },

    onShow: function(){
      $("#session-nav").find(".dropdown").addClass("active");
      $("#"+this.model.get("category")+"-btn").addClass("active");

      if(this.model.get("answered")){
        this.ui.input.val(this.model.get("answered")[0]);
        $(".shuffle").addClass("hide");
      }
    },

    onRender: function(){
      if(this.model.get("answered")){
        this.ui.input.val(this.model.get("answered")[0]);
        $(".shuffle").addClass("hide");
      }

      if(this.model.get('background')){
        this.ui.form.css("background-image","url('http://commondatastorage.googleapis.com/giftiqueme/"+this.model.get("background")+"')");
      }else{
        this.ui.form.css("background-image","none");
      }
    },

    onClose: function(){
      $('.nav > li').removeClass("active");
      $("#categories > li").removeClass("active");
    },

    submitAnswer : function() {
      var answer = [];

      this.ui.input.each(function(index){
        //if($(this).val() !== ''){
          answer.push($(this).val());
        //}
      });

      if(answer.length > 0){
        var ans = new Answer({
          'question2' : this.model.id,
          'description' : this.model.get("description"),
          'category' : this.model.get("category"),
          'answer' : answer,
          'user' : Parse.User.current()
        });

        if(this.model.get('answered')){
          vent.trigger("submitNewAnswer", ans);
        }else{
          vent.trigger("submitAnswer", ans);
        }

        this.model.set('answered', answer);

        var cats = ['travel','places','food_drink','hobbies','activities','art_entertainment','all'],
        cat = document.URL.split("#")[1].substr(9),
        ind = cats.indexOf(cat);
        if(ind != -1){
          if(ind == 5){
            vent.trigger('getQuestion:category', cats[0]);
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
