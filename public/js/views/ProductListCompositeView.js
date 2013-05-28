/*global define*/

define(['marionette','templates','vent','views/ProductListItemView','quicksand'], function (Marionette,templates,vent,ProductListItemView) {
  "use strict";

  return Marionette.CompositeView.extend({
    template: templates.blank,
    itemView : ProductListItemView,
    emptyView: Marionette.ItemView.extend({ template: templates.emptyList }),

    tagName: 'ul id="products-destination"',

    initialize: function(options){

      var delay = (function(){
        var timer = 0;
        return function(callback, ms){
          clearTimeout (timer);
          timer = setTimeout(callback, ms);
        };
      })();

      $(window).resize(function(){
        delay(function(){
          $(".products").css("height",($(window).height()-30-91)+"px");
        }, 500);
      });
    },

    onShow: function(){
      var self = this;
      setTimeout(function(){ vent.trigger("productList:filter"); },1000);
    },

    appendHtml: function(collectionView, itemView, index){
      var childrenContainer = collectionView.itemViewContainer ? collectionView.$(collectionView.itemViewContainer) : collectionView.$el;
      var children = childrenContainer.children();
      //if (children.size() <= index) {
        childrenContainer.prepend(itemView.el); //append
      //} else {
        //childrenContainer.children().eq(index).before(itemView.el);
      //}
    }
  });
});

