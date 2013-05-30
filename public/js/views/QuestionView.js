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

      if(this.model.get("answered")){
        $(".shuffle").hide();
      }

      this.ui.input.focus();
    },

    onRender: function(){
      if(this.model.get("answered")){
        this.ui.input.val(this.model.get("answered")[0]);
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
          this.model.set('answered', answer);
        }else{
          this.model.set('answered', answer); //must be performed before triggering getQuestion
          vent.trigger("answerList:add", ans);

          var cat = $(".nav-tabs > li.active > a").attr("href").substr(1);
          if(cat == "all"){
            var cats = ['travel','places','food_drink','hobbies','activities','art_entertainment'],
            ind = cats.indexOf(this.model.get("category"));

            vent.trigger('getQuestion:category', cats[(ind + 1) % 5]);
          }else{
            vent.trigger('getQuestion:category',cat);
          }
        }
      }
    },

    shuffleQuestion : function() {
      vent.trigger('getQuestion:category', $(".nav-tabs > li.active > a").attr("href").substr(1),this.model.id);
    }
  });
});
