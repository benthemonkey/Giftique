<a class="thumbnail" href="<%= etsy_item.url %>&qid=<%= questionId %>&g_query=<%= encodeURI(query) %>" target="_blank" title="<%= etsy_item.title %>" onclick="_gaq.push(['_trackEvent', '<%= category %>', '<%= term %>', '<%= query %>', <%= etsy_item.price %>]);">
	<img data-src="holder.js/260x180" src="<%= etsy_item.image %>" />
</a>