require.config({
  paths : {
    underscore : 'libs/underscore.min',
    backbone   : 'libs/backbone',
    parse      : 'libs/parse',
    marionette : 'libs/backbone.marionette.min',
    jquery     : 'libs/jquery.min',
    jquery_ui  : 'libs/jquery-ui.min',
    bootstrap  : 'libs/bootstrap',
    tpl        : 'libs/tpl',
    ga         : 'libs/3rdParty.dev'
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
    parse : {
      exports : 'Parse',
      deps : ['jquery']
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
      deps : ['parse'],
      exports : '_gaq'
    }
  },
  deps : ['jquery','underscore']
});

require(['app','backbone','routers/index','controllers/index','parse','ga','bootstrap','jquery_ui'],function(app,Backbone,Router,Controller,Parse,_gaq){

  Parse.initialize("gMyxpM84HXUfooYCh9SYqieWgZyMY5xBcGUfkt4s", "D2S9TY00GRYQNYTXMEPQNGLze1FoDOUEFQTyOv8P");//Prod: ("jETjrmeloXB54t2oBPkLFsgyh4wmkU9vyS0PJwGO", "SgiDW5lYwfzxd5CB2z25eVx5SfB4kT5SGGM91Ymw");

  //need to load questions before doing anything else.
  app.loadQuestions(Router, Controller);
});
