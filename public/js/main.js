require.config({
  paths : {
    underscore : 'libs/underscore.min',
    backbone   : 'libs/backbone.min',
    marionette : 'libs/backbone.marionette.min',
    jquery     : 'libs/jquery.min',
    jquery_ui  : 'libs/jquery-ui.min',
    bootstrap  : 'libs/bootstrap.min',
    tpl        : 'libs/tpl',
    ga         : 'libs/3rdParty'
  },
  shim : {
    'libs/backbone.localStorage' : ['backbone'],
    underscore : {
      exports : '_'
    },
    backbone : {
      exports : 'Backbone',
      deps : ['jquery','underscore']
    },
    marionette : {
      exports : 'Backbone.Marionette',
      deps : ['backbone']
    },
    jquery_ui : {
      deps : ['jquery']
    },
    bootstrap : {
      deps : ['jquery']
    },
    ga : {
      exports : '_gaq'
    }
  },
  deps : ['jquery','underscore','ga']
});

require(['app','backbone','routers/index','controllers/index','bootstrap','jquery_ui'],function(app,Backbone,Router,Controller){
  app.start();
  app.router = new Router({
    controller : Controller
  });
  Backbone.history.start();
});
