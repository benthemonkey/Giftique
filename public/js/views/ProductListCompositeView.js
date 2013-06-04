/*global define*/

define(['marionette','templates','vent','views/ProductListItemView','quicksand'], function (Marionette,templates,vent,ProductListItemView) {
  "use strict";

  return Marionette.CompositeView.extend({
    template: templates.productListCompositeView,
    itemView : ProductListItemView,
    itemViewContainer: "#products-destination",
    emptyView: Marionette.ItemView.extend({ template: templates.emptyList,
      onShow: function(){
        $('#products-source').html('<br/><div class="alert alert-info">'+
          '<h5>How to use Giftique.me</h5><ul>'+
          '<li>Answer a few questions to optimize gift search results.</li>'+
          '<li>If you liked (or disliked) the results or plan to buy one, please let us know through our \'Contact Us\' form at the bottom!</li>'+
          '<li>Gift suggestions appear here.</li></ul><br/></div>');
      }
    }),

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
          $(".products").css("height",($(window).height()-35-110)+"px");
        }, 500);
      });
    },

    onShow: function(){
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
    },

    events: {
      'change #category-select' : 'onFilterChange',
      'click #sortby button' : 'onSort',
      'click .thumbnail' : 'onProductClick'
    },

    onSort: function(e){
      $("#sortby .btn").removeClass("active");
      $(e.target).addClass("active");
      vent.trigger("productList:filter");
    },

    onFilterChange: function(){
      vent.trigger("productList:filter");
    },

    onProductClick: function(e){
      e.preventDefault();
      vent.trigger('showProduct',$(e.target).parent().attr("href").split("/")[2]);
    }
  });
});

