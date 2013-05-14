define(['parse'],function(Parse){
  "use strict";

  return Parse.Object.extend({
    className: "Product",

    defaults: {
      category   : 'missingCategory',
      questionId : -1,
      term       : 'missingTerm',
      query      : 'missingQuery',
      status     : 0,
      etsy_item  : null
    }
  });

});