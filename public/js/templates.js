define(function(require){
  "use strict";
  return {
	blank: require('tpl!templates/blankTemplate.tpl'),
	homeView					: require('tpl!templates/homeView.tpl'),
	navbar						: require('tpl!templates/navbar.tpl'),
	tos							: require('tpl!templates/tos.tpl'),
	questionView				: require('tpl!templates/questionView.tpl'),
	answerItemView				: require('tpl!templates/answerItemView.tpl'),
	answerListCompositeView		: require('tpl!templates/answerListCompositeView.tpl'),
	productItemView				: require('tpl!templates/productItemView.tpl'),
	productListLayout			: require('tpl!templates/productListLayout.tpl'),
	userLayout					: require('tpl!templates/userLayout.tpl'),
	accountView					: require('tpl!templates/accountView.tpl')
  };
});

