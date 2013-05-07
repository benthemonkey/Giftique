<li class="span3">
	<a class="thumbnail" href="<%= url %>&qid=<%= questionId %>&g_query=<%= encodeURI(query) %>" target="_blank" title="<%= title %>" onclick="_gaq.push(['_trackEvent', '<%= category %>', '<%= term %>', '<%= query %>', <%= price %>]);">
		<img data-src="holder.js/260x180" src="<%= img %>" />
	</a>
</li>