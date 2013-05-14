define(['parse'],function(Parse){
  "use strict";

  return Parse.Object.extend({
    className: "Answer",

    defaults: {
      question: null,
      user: null,
      recipient: "Recipient 1",
      answer: []
    }
  });

});