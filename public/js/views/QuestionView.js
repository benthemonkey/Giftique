define(['marionette','parse','templates','vent','models/Answer'], function (Marionette,Parse,templates,vent, Answer) {
  "use strict";

  return Marionette.ItemView.extend({
    template : templates.questionView,

    tagName : 'form class="question-form" onsubmit="return false;"',

    ui : {
      input: '.myinput'
    },

    events : {
      'click .submit'  : 'submitAnswer',
      'click .shuffle' : 'shuffleQuestion'
    },

    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
    },

    onShow: function(){
      if(this.model.get('background')){
        $(".question-form").css("background-image","url('http://commondatastorage.googleapis.com/giftiqueme/"+this.model.get("background")+"')");
      }else{
        $(".question-form").css("background-image","none");
      }
    },

    onRender: function(){
      if(this.model.get("answered")){
        this.ui.input.val(this.model.get("answered")[0]);
        $(".shuffle").addClass("hide");
      }
    },

    submitAnswer : function() {
      var answer = [];

      this.ui.input.each(function(index){
        if($(this).val() !== ''){
          answer.push($(this).val());
        }
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
          vent.trigger("answerList:replace", ans);
        }else{
          vent.trigger("answerList:add", ans);
        }

        this.model.set('answered', answer);

        var cats = ['travel','places','food_drink','hobbies','activities','art_entertainment','all'],
        cat = $('.nav-tabs > li.active > a').html().toLowerCase().replace("/","_"),
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
      vent.trigger('getQuestion:category', $('.nav-tabs > li.active > a').html().toLowerCase().replace("/","_"),this.model.id);
    }
  });
});
