<a class="thumbnail" href="#/product/<%= objectId || id %>" onclick="_gaq.push(['_trackEvent', '<%= category %>', '<%= term %>', '<%= query %>', <%= etsy_item.price %>]);">
	<img src="<%= etsy_item.image %>" />
	<div class="thumbnail-footer">
		<span>&nbsp;$<%= etsy_item.price %></span>
		<span class="pull-right"><i class="icon-eye-open icon-blue"></i> <%= etsy_views %>&nbsp;</span>
	</div>
</a>