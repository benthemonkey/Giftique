/*global define*/

define(['vent'], function (vent) {
  "use strict";

  return {
    getQuestion : function(param) {
      vent.trigger('getQuestion:category', param.trim() || '');
    }
  };
});
