
define(function(require){
  "use strict";
  return {
	blank: require('tpl!templates/blankTemplate.tpl'),
	homeView                   : require('tpl!templates/homeView.tpl'),
	questionView               : require('tpl!templates/questionView.tpl'),
	questionItemView           : require('tpl!templates/questionItemView.tpl'),
	questionListCompositeView  : require('tpl!templates/questionListCompositeView.tpl'),
	productItemView            : require('tpl!templates/productItemView.tpl'),
	productListLayout          : require('tpl!templates/productListLayout.tpl')
  };
});

