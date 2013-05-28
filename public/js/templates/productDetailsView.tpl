<div id="product-modal" class="modal hide fade" role="dialog" >
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h3>Product Details</h3>
	</div>
	<div class="modal-body">
		<div class="media">
			<img data-src="holder.js/320x200" src="<%= etsy_item.image %>" />
			<div class="media-body">
				<h4 class="media-heading"><%= etsy_item.title %></h4>
				<p><%= etsy_item.description %></p>
				<p><a href="<%= etsy_item.url %>&qid=<%= questionId %>&g_query=<%= encodeURI(query) %>" target="_blank" title="<%= etsy_item.title %>">View Product on Etsy</a></p>
			</div>
		</div>
	</div>
</div>