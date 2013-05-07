/*global $*/
define(
  [       'marionette','vent','templates', 'collections/QuestionList','collections/ProductList','views/HomeView','views/ProductLayout', 'views/QuestionListCompositeView', 'views/ProductListCompositeView', 'views/QuestionView'],
  function(marionette,  vent,  templates,               QuestionList,              ProductList,        HomeView,        ProductLayout,         QuestionListCompositeView,         ProductListCompositeView,         QuestionView){
    "use strict";

    var main = marionette.Region.extend({
      el: "#main",

      show: function(view){
        this.ensureEl();
        view.render();
        this.close(function() {
        if (this.currentView && this.currentView !== view) { return; }
          this.currentView = view;
          this.open(view, function(){
          if (view.onShow){view.onShow();}
          view.trigger("show");
          if (this.onShow) { this.onShow(view); }
          this.trigger("view:show", view);
        });
      });
      },

      close: function(cb){
        var view = this.currentView;
        delete this.currentView;
        if (!view){
        if (cb){ cb.call(this); }
        return;
      }
        var that = this;
        view.$el.hide("slide",{direction: "up"},function(){
          if (view.close) { view.close(); }
          that.trigger("view:closed", view);
        if (cb){ cb.call(that); }
        });
      },
      open: function(view, callback){
        var that = this;
        this.$el.html(view.$el.hide());
        view.$el.show("slide",{direction: "up"},function(){
          callback.call(that);
        });
      }
    });

    var app = new marionette.Application(),
    productList = {
      travel           : new ProductList(),
      places           : new ProductList(),
      food_drink       : new ProductList(),
      hobbies          : new ProductList(),
      activities       : new ProductList(),
      art_entertainment: new ProductList()
    },
    productLayout = new ProductLayout(),
    questionList = new QuestionList([
    {
      id: 1,
      type: "single-blank",
      category: "travel",
      description: "First Date Location",
      content: ["We went to","on our first date."],
      options: { placeholder: "restaurant, bar, city" },
      background: "b-travel-paris.jpg",
      appendTerms: ["painting","souvenir"]
    },
    {
      id: 2,
      type: "short-answer",
      category: "travel",
      description: "Romantic Travels",
      content: "Where in the world did you and your significant other have your most romantic travels?",
      options: { placeholder: "honeymoon destination, special vacation" },
      background: "b-travel-bahamas.jpg",
      appendTerms: ["clothing","souvenir","gift","custom","art", "art", "wine", "food", "jewelry", "music", "map"]
    },
    {
      id: 3,
      type: "short-answer",
      category: "travel",
      description: "Romantic Travel Dream",
      content: ["Where in the world do you and your significant other dream of traveling?"],
      options: { placeholder: "Africa, Paris, Bora Bora" },
      background: "b-travel-venice.jpg",
      appendTerms: ["clothing","souvenir","gift","custom","art","wine","food","jewelry","music","map"]
    },
    {
      id: 4,
      type: "single-blank",
      category: "travel",
      description: "Home Away From Home",
      content: ["We travel to", "regularly, our special home away from home."],
      options: { placeholder: "summer town, beach house, ski town" },
      background: "b-travel-hawaii.jpg",
      appendTerms: ["clothing","gift","custom","art","food","jewelry","equipment","exercise","material"]
    },
    {
      id: 5,
      type: "short-answer",
      category: "places",
      description: "Special Moments",
      content: "Where did you and your significant other share a special memorable moment?",
      options: { placeholder: "your first date, where he proposed" },
      background: "b-places-navypier.jpg",
      appendTerms: ["clothing","souvenir","gift","custom","art","food","jewelry","map"]
    },
    {
      id: 6,
      type: "short-answer",
      category: "places",
      description: "Recent Special Moments",
      content: "Tell us about a special moment you two recently shared together.",
      options: { placeholder: "a concert, special bottle of wine, special song" },
      background: "b-places-beach.jpg",
      appendTerms: ["clothing","souvenir","gift","custom","art","jewelry","map"]
    },
    {
      id: 7,
      type: "short-answer",
      category: "places",
      description: "Places Special to Us",
      content: "Tell us about a special place that you and your significant other like to visit.",
      options: { placeholder: "Central Park, yoga, favorite neighborhood" },
      background: "b-places-cancun.jpg",
      appendTerms: ["clothing","souvenir","gift","custom","art","food","jewelry","map"]
    },
    {
      id: 8,
      type: "short-answer",
      category: "food_drink",
      description: "Wine and Dine!",
      content: "As a couple, what is your go-to food or drink?",
      options: { placeholder: "sushi, cocktails, BBQ" },
      background: "b-food-drink-milkshake.jpg",
      appendTerms: ["custom","art","drink","food","maker","equipment"]
    },
    {
      id: 9,
      type: "short-answer",
      category: "food_drink",
      description: "Top Chef!",
      content: "What type of cuisine do you and your significant other want to learn to cook at home?",
      options: { placeholder: "Lemon Gnocchi, Griled Jerk Chicken, french cuisine" },
      background: "b-food-drink-thai.jpg",
      appendTerms: ["custom","art","drink","food","maker","equipment", "cookware", "recipes", "wok"] //I NEED HELP WITH THE APPENDED TERMS HERE
    },
    {
      id: 10,
      type: "short-answer",
      category: "hobbies",
      description: "Special Interests",
      content: "What are some interests you share with your significant other or that she especially likes?",
      options: { placeholder: "painting, photography, cooking" },
      background: "b-hobbies-photography.jpg",
      appendTerms: ["clothing","souvenir","gift","custom","art","jewelry","music"]
    },
    {
      id: 11,
      type: "short-answer",
      category: "hobbies",
      description: "Try It",
      content: "What hobby does your significant other talk about wanting to try?",
      options: { placeholder: "painting, photography, cooking" },
      background: "b-hobbies-cooking.jpg",
      appendTerms: ["clothing","souvenir","gift","custom","art","jewelry","music"]
    },
    {
      id: 12,
      type: "single-blank",
      category: "hobbies",
      description: "Quality Time",
      content: ["We spend time with each other by","after a long week."],
      options: { placeholder: "exercising together, cooking, watching movies" },
      //background: "image1.jpg",
      appendTerms: ["clothing","gift","custom","art","food","jewelry","equipment","exercise","material"]
    },
    {
      id: 13,
      type: "single-blank",
      category: "hobbies",
      description: "Snow Day",
      content: ["If there was a blizzard outside and we were stuck in our house, we would",""],
      options: { placeholder: "play boardgames, watch a movie, read" },
      //background: "image1.jpg",
      appendTerms: ["clothing","gift","custom","art","food","jewelry","equipment","exercise","material"]
    },
    {
      id: 14,
      type: "short-answer",
      category: "activities",
      description: "Special Activities",
      content: "What are some activities you enjoy together or that she particularly likes?",
      options: { placeholder: "biking, film, spa" },
      background: "b-activities-spa.jpg",
      appendTerms: ["clothing","gift","custom","art","food","jewelry","equipment","exercise","material"]
    },
    {
      id: 15,
      type: "short-answer",
      category: "activities",
      description: "Saturday Activities",
      content: "If you had an open Saturday, what activities would you do together for fun?",
      options: { placeholder: "biking, picnic, brunch" },
      background: "b-activities-biking.jpg",
      appendTerms: ["clothing","gift","custom","art","food","jewelry","equipment","exercise","material"]
    },
    {
      id: 16,
      type: "single-blank",
      category: "activities",
      description: "Feeling Adventurous",
      content: ["We go","when we are feeling adventurous."],
      options: { placeholder: "rock-climbing, camping, skiing" },
      background: "b-activities-biking.jpg",
      appendTerms: ["clothing","gift","custom","art","food","jewelry","equipment","exercise","material"]
    },
    {
      id: 17,
      type: "short-answer",
      category: "art_entertainment",
      description: "Entertainment, Art, & Culture",
      content: "What are some artistically-inspired interests that you enjoy together or that she particularly likes?",
      options: { placeholder: "Picasso, Les Miserables, The Beatles" },
      background: "b-art-entertainment-painting.jpg",
      appendTerms: ["clothing","souvenir","gift","custom","art","jewelry","music"]
    },
    {
      id: 18,
      type: "short-answer",
      category: "art_entertainment",
      description: "Music",
      content: "What music do you and your significant other enjoy listening to?  What are the best concerts you've attended?",
      options: { placeholder: "Oldies, The Rolling Stones, Madonna" },
      background: "b-art-entertainment-piano.jpg",
      appendTerms: ["clothing","souvenir","gift","custom","art","jewelry","music"]
    }]);

    app.listenTo(questionList, 'all', function() {
      if (questionList.getAnswered().length === 0) {
        app.list.$el.find('#empty-list').show();
        app.list.$el.find('#clear-all').attr("disabled","disabled");
        app.list.$el.find('#get-results').attr("disabled","disabled").removeAttr("href");
      } else {
        app.list.$el.find('#empty-list').hide();
        app.list.$el.find('#clear-all').removeAttr("disabled");
        app.list.$el.find('#get-results').removeAttr("disabled").attr("href","#results");
      }
    });

    app.addRegions({
      main   : main,
      list   : '#question-list-wrapper'
    });

    app.addInitializer(function(){
      $('#meet-robbie').on('shown', function(){
        $('body').css('overflow', 'hidden');
      }).on('hidden', function(){
        $('body').css('overflow', 'auto');
        $("#youtube-video").attr("src","http://www.youtube.com/embed/Ez9ftpAqHQ0?rel=0");
      });

      var viewOptions = {
        collection : questionList
      };

      app.list.show(new QuestionListCompositeView(viewOptions));

      questionList.fetch({remove: false});
    });

    vent.on('home', function() {
      app.main.show(new HomeView({collection: questionList}));
    });

    vent.on('getQuestion:category', function(_category) {
      var list = questionList.getCategory(_category),
      len = list.length,
      emptyCategoryFlag = false;
      if(len === 0 || _category == "all"){
        list = questionList.getUnanswered();
        len = list.length;

        if(_category != "all"){ emptyCategoryFlag = true; }
      }

      var ind = Math.floor( Math.random() * len );

      var viewOptions = {
        app: app,
        model: list[ind]
      };

      app.main.show(new QuestionView(viewOptions));
      if(emptyCategoryFlag){
        $("<div />").html('You answered all the questions in this category!\
         Here\'s one from another category. <button type="button" class="close" data-dismiss="alert">&times;</button>')
        .addClass("alert alert-success")
        .appendTo("#alert-container");
      }
    });

    vent.on('getQuestion:id', function(id){
      app.main.show(new QuestionView({ model: questionList.getId(id) }));
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
      var answeredCategories = questionList.getAnswered().map(function(question){ return question.get("category"); }),
      cats = ['travel','places','food_drink','hobbies','activities','art_entertainment'],
      showResults = function(cat){
        if(answeredCategories.indexOf(cat) != -1){
          $("#" + cat.replace('_','-') + "-products").fadeIn();
          productLayout[cat].show(new ProductListCompositeView({ collection: productList[cat] }));
        }
      };

      cats.forEach(showResults);
    });

    app.etsySearch = function(ajax_list) {
      var search = ajax_list.shift(),

      newProduct = function(item){
        return {
          id        : item.listing_id,
          category  : search.category,
          questionId: search.id,
          term      : search.term,
          query     : search.query,
          title     : item.title,
          url       : item.url,
          img       : item.Images[0].url_170x135,
          views     : item.views,
          price     : item.price
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
