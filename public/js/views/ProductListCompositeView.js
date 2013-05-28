/*global define*/

define(['marionette','templates','vent','views/ProductListItemView','quicksand'], function (Marionette,templates,vent,ProductListItemView) {
  "use strict";

  return Marionette.CompositeView.extend({
    template: templates.blank,
    itemView : ProductListItemView,

    tagName: function(){ return 'ul class="products"'; },

    //onShow: function(){
    //  $("#travel-products2").quicksand($("#travel-products li"));
    //},

    appendHtml: function(collectionView, itemView, index){
      var childrenContainer = collectionView.itemViewContainer ? collectionView.$(collectionView.itemViewContainer) : collectionView.$el;
      var children = childrenContainer.children();
      if (children.size() <= index) {
        childrenContainer.append(itemView.el);
      } else {
        childrenContainer.children().eq(index).before(itemView.el);
      }
    }
  });
});

