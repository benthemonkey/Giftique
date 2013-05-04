define(['marionette'],function(marionette) {
  "use strict";

  return marionette.AppRouter.extend({
    appRoutes:{
      'category/:category': 'getQuestion'
    }
  });

});
