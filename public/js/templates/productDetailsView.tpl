<div id="product-modal" class="modal hide fade" role="dialog" >
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h3>Product Details</h3>
	</div>
	<div class="modal-body">
		<div class="media">
			<img data-src="holder.js/320x200" src="<%= etsy_item.image %>" class="pull-left" />
			<div class="media-body">
				<h4 class="media-heading"><%= etsy_item.title %></h4>
				<p><strong>Price: $<%= etsy_item.price %></strong></p>
				<%= (etsy_item.description && etsy_item.description.replace(new RegExp('\n?\r','gm'),"<br>")) || 'Description missing. Please go to account and press "Redo all Searches"' %>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<a href="<%= etsy_item.url %>&qid=<%= questionId %>&g_query=<%= encodeURI(query) %>" target="_blank" class="btn btn-success pull-right">View Product on Etsy.com</a>
	</div>
</div>