require.config({
  paths : {
    underscore : 'libs/underscore.min',
    backbone   : 'libs/backbone.min',
    marionette : 'libs/backbone.marionette.min',
    jquery     : 'libs/jquery.min',
    jquery_ui  : 'libs/jquery-ui.min',
    tpl        : 'libs/tpl'
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
    }
  },
  deps : ['jquery','underscore']
});

require(['app','backbone','routers/index','controllers/index'],function(app,Backbone,Router,Controller){
  app.start();
  new Router({
    controller : Controller
  });
  Backbone.history.start();
});
