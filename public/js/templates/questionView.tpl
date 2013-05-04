<h2><%= category.charAt(0).toUpperCase() + category.slice(1) %> Question:</h2>
<h4><%= description %></h4>
<form onsubmit="" class="question-form">
<% if (type == "single-blank"){ %>
	<p>
		<%= content[0] %>
		&nbsp;
		<input type="text" class="input" placeholder="<%= options.placeholder %>" required />
		&nbsp;
		<%= content[1] %>
	</p>
<% }else if(type == "short-answer"){ %>
	<p>
		<%= content %>
	</p>
	<p>
		<div class="text-right">
			<input type="text" class="input" placeholder="<%= options.placeholder %>" required />
		</div>
	</p>
<% }else{ %>
	<p>
		Sorry! There was an error.
	</p>
<% } %>
<div class="form-actions text-right">
	<button type="button" class="btn shuffle" href="#category/<%= category %>">Shuffle Question</button>
	&nbsp;
	<button type="submit" class="btn btn-primary submit">Submit</button>
</div>
</form>