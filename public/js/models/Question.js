define(['backbone','libs/backbone.localStorage'],function(Backbone){
  "use strict";

  return Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage('giftique'),
    defaults: {
      type      : 'single-blank',
      category  : 'travel',
      description: 'question',
      content   : [],
      options   : null,
      appendTerms: [],
      answered  : false
    }
  });

});