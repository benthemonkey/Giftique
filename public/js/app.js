/*global $*/
define(
  ['marionette','vent','collections/QuestionList','views/QuestionListCompositeView', 'views/QuestionView'],
  function(marionette, vent, QuestionList, QuestionListCompositeView, QuestionView){
    "use strict";

    var app = new marionette.Application(),
        questionList = new QuestionList();

    app.listenTo(questionList, 'all', function() {
      if (questionList.getAnswered().length === 0) {
        app.list.$el.find('#empty-list').show();
        app.list.$el.find('#clear-all').attr("disabled","disabled");
        app.list.$el.find('#get-results').attr("disabled","disabled");
      } else {
        app.list.$el.find('#empty-list').hide();
        app.list.$el.find('#clear-all').removeAttr("disabled");
        app.list.$el.find('#get-results').removeAttr("disabled");
      }
    });

    app.addRegions({
      main   : '#main',
      list   : '#question-list-wrapper'
    });

    app.addInitializer(function(){
      var viewOptions = {
        collection : questionList
      };

      app.list.show(new QuestionListCompositeView(viewOptions));

      questionList.reset([{
        type: "single-blank",
        category: "places",
        description: "First date location",
        content: ["We went to","on our first date."],
        options: { placeholder: "Restaurant/Location",
        inspirationBar: ["image1.jpg","image2.jpg"] },
        appendTerms: ["painting","souvenir"],
        answered: false
      },
      {
        type: "short-answer",
        category: "travel",
        description: "Romantic Travels",
        content: ["Where in the world did you and your significant other have your most romantic travels?"],
        options: { placeholder: "Paris, France" },
        inspirationBar: ["image1.jpg","image2.jpg"],
        appendTerms: ["clothing","souvenir","gift","custom","art","jewelry","map"],
        answered: false
      }]);

      //questionList.fetch();
    });


    vent.on('getQuestion:category',function(category) {
      var list = questionList.getCategory(category),
      len = list.length;
      if(len === 0 || category == "all"){ list = questionList.models; len = questionList.length; }

      var ind = Math.floor( Math.random() * len );

      var viewOptions = {
        model: list[ind]
      };

      app.main.show(new QuestionView(viewOptions));
    });

    vent.on('questionList:clear:answered',function(){
      function clear(question){ question.set("answered",false); }
      questionList.getAnswered().forEach(clear);
    });

    return app;

  }
);
