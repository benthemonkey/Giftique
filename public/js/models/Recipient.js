define(['parse'],function(Parse){
  "use strict";

  return Parse.Object.extend({
    className: "Recipient",

    defaults: {
      name       : 'missingName',
      gender     : null,
      relation   : null,
      birthday   : null,
      anniversary: null 
    }
  });

});