/*global $*/
define(
  [       'marionette','vent', 'templates', 'views', 'collections/AnswerList', 'collections/QuestionList','collections/ProductList'],
  function(Marionette,  vent,   templates,   views,               AnswerList,               QuestionList,              ProductList){
    "use strict";

    var app = new Marionette.Application(),
    user,
    productList = {
      travel           : new ProductList(),
      places           : new ProductList(),
      food_drink       : new ProductList(),
      hobbies          : new ProductList(),
      activities       : new ProductList(),
      art_entertainment: new ProductList()
    },
    productLayout = new views.ProductLayout(),
    questionList = new QuestionList(),
    answerList = new AnswerList();

    app.listenTo(answerList, 'all', function() {
      /*if (answerList.length === 0) {
        app.list.$el.find('#empty-list').show();
        app.list.$el.find('#clear-all').attr("disabled","disabled");
        app.list.$el.find('#get-results').attr("disabled","disabled").removeAttr("href");
      } else {
        app.list.$el.find('#empty-list').hide();
        app.list.$el.find('#clear-all').removeAttr("disabled");
        app.list.$el.find('#get-results').removeAttr("disabled").attr("href","#results");
      }*/
    });

    app.addRegions({
      sidebar: "#sidebar",
      main   : views.MainRegion,
      list   : '#question-list-wrapper'
    });

    app.addInitializer(function(){
      $('#meet-robbie').on('shown', function(){
        $('body').css('overflow', 'hidden');
      }).on('hidden', function(){
        $('body').css('overflow', 'auto');
      });

      app.sidebar.show(new views.SidebarView());

      if(Parse.User.current()){
        vent.trigger("user:logIn");
      }
    });

    vent.on('home', function() {
      $('.nav-large').addClass("hide");
      $('.nav-small').removeClass("hide");
      $('.nav > li').removeClass("active");
      $('#home').addClass("active");

      user = Parse.User.current();

      if(user){
        vent.trigger("user:logIn");
      }else{
        app.main.show(new (Marionette.ItemView.extend({ template: templates.homeView }))());
      }
    });

    vent.on('tos', function() {
      app.main.show(new (Marionette.ItemView.extend({ template: templates.tos }))());
    });

    vent.on('user:logIn',function() {
      user = Parse.User.current();
      $("#status").html('<li><a class="pointer" id="log-out"><i class="icon-minus-sign"></i> Logout</a></li>');

      app.main.show(new views.UserView({ model: user }));
    });

    vent.on('user:firstLogIn', function() {
      user = Parse.User.current();

      //product tour
      app.main.show(new views.UserView({ model: user }));
    });

    vent.on('submitAnswer',function(question, answer){
      var ans = new answerList.model({
        'question' : question,
        'answer' : answer,
        'user' : Parse.User.current()
      }).save();
      answerList.add(ans);
      console.log(answerList);
    });

    vent.on('getQuestion:category', function(_category, _currentQuestionId) {
      $('.nav > li').removeClass("active");
      $("#"+_category).addClass("active");

      var query = new Parse.Query(questionList.model);

      if(_category == "all"){
        query.skip(Math.floor( Math.random() * 18 )); //NOT SCALABLE ATM!!!!!
      }else{
        query.equalTo("category", _category);
      }

      if(_currentQuestionId){
        query.notEqualTo("objectId",_currentQuestionId);
      }

      query.first({
        success: function(question){
          app.main.show(new views.QuestionView({ model: question }));
        },
        error: function(error){
          vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error");
        }
      });

      /*if(emptyCategoryFlag){
        $("<div />").html('You answered all the questions in this category!\
         Here\'s one from another category. <button type="button" class="close" data-dismiss="alert">&times;</button>')
        .addClass("alert alert-success")
        .appendTo("#alert-container");
      }*/
    });

    vent.on('getQuestion:id', function(id){
      var query = new Parse.Query(questionList.model);
      query.get(id);
      query.first({
        success: function(question){
          app.main.show(new views.QuestionView({ model: question }));
        },
        error: function(error){
          vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error");
        }
      });
    });

    vent.on('questionList:clear:answered', function(){
      function clear(question){ question.set("answered",false).save(); }
      questionList.getAnswered().forEach(clear);
    });

    vent.on('questionList:getResults', function(){
      var search = [];

      function appendSearch(question){
        var terms = question.get("appendTerms").map(function(term){
          return {
            id: question.get("id"),
            category: question.get("category"),
            term: term,
            query: question.get("answered")[0] + " " + term
          };
        });
        search = search.concat( terms );
      }

      questionList.getAnswered().forEach(appendSearch);

      if(search.length > 0){ app.etsySearch(search); }

      app.main.show(productLayout);
    });

    vent.on('showResults', function(){
      var answeredCategories = answerList.map(function(question){ return question.get("category"); }),
      cats = ['travel','places','food_drink','hobbies','activities','art_entertainment'],
      showResults = function(cat){
        if(answeredCategories.indexOf(cat) != -1){
          $("#" + cat.replace('_','-') + "-products").fadeIn();
          productLayout[cat].show(new views.ProductListCompositeView({ collection: productList.getCategory(cat) }));
        }
      };

      cats.forEach(showResults);
    });

    vent.on('appendAlert', function(text, kind){
      $("<div />").html(error+'<button type="button" class="close" data-dismiss="alert">&times;</button>')
        .addClass("alert alert-"+kind)
        .appendTo("#alert-container");
    });

    app.etsySearch = function(ajax_list) {
      var search = ajax_list.shift(),

      newProduct = function(item){
        return {
          category  : search.category,
          questionId: search.id,
          term      : search.term,
          query     : search.query,
          etsy_item : item
        };
      };

      $.ajax({
        type: "GET",
        url: "http://openapi.etsy.com/v2/listings/active.js",
        async: true,
        cache: false,
        data: {
          keywords: search.query,
          limit: 6,
          includes: "Images:1",
          sort_on: "score",
          api_key: "muf6785p5zsu3iwp28e51kgi"
        },
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
          if (data.ok) {
            if(data.count > 0){
              var products = data.results.map(newProduct);

              productList[search.category].add(products);
            }

            if(ajax_list.length > 0){
              app.etsySearch(ajax_list);
            }
          } else {
            alert(data.error);
          }
        },
        error: function(result){console.log(result);}
      });

return false;
};

return app;

}
);
