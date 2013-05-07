/*global define*/

define(['marionette','templates','vent','views/ProductItemView'], function (Marionette,templates,vent,ProductItemView) {
  "use strict";

  return Marionette.CompositeView.extend({
    template: templates.blank,
    itemView : ProductItemView,

    initialize: function(){
      this.listenTo(this.collection, 'change', this.render);
    },

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

