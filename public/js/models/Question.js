define(['parse'],function(Parse){
  "use strict";

  return Parse.Object.extend({
    className: "Question",

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