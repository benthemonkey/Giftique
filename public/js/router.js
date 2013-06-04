define(['marionette'],function(marionette) {
  "use strict";

  return marionette.AppRouter.extend({
    appRoutes:{
      //'category/:category': 'getCategory',
      'edit/:id': 'getId',
      //'results' : 'getResults',
      'account' : 'account',
      'product/:id': 'showProduct',
      //'tos'     : 'tos',
      '*action' : 'home'
    }
  });

});
