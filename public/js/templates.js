define(function(require){
  "use strict";
  return {
	blank: require('tpl!templates/blankTemplate.tpl'),
	homeView					: require('tpl!templates/homeView.tpl'),
	sidebar						: require('tpl!templates/sidebar.tpl'),
	tos							: require('tpl!templates/tos.tpl'),
	questionView				: require('tpl!templates/questionView.tpl'),
	questionItemView			: require('tpl!templates/questionItemView.tpl'),
	questionListCompositeView	: require('tpl!templates/questionListCompositeView.tpl'),
	productItemView				: require('tpl!templates/productItemView.tpl'),
	productListLayout			: require('tpl!templates/productListLayout.tpl'),
	userView					: require('tpl!templates/userView.tpl')
  };
});

