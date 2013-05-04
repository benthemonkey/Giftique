define(['backbone','models/Question','libs/backbone.localStorage'],function(Backbone,Question) {
  'use strict';

  function isAnswered(question) { return question.get('answered'); }

  return Backbone.Collection.extend({
    model: Question,
    localStorage: new Backbone.LocalStorage('giftique'),

    getAnswered: function() {
      return this.filter(isAnswered);
    },

    getCategory: function(category){
		return this.where({category: category});
    }
  });

});