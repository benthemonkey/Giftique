define(['backbone'],function(Backbone){
  "use strict";

  return Backbone.Model.extend({
    defaults: {
      title     : 'Missing',
      category  : 'none',
      questionId: -1,
      term      : 'missingTerm',
      query     : 'missingQuery',
      url       : 'missingURL',
      img       : 'missingIMG',
      views     : 0,
      price     : 0
    }
  });

});