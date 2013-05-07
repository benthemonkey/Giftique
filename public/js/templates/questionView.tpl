<% function categoryName(category){
	switch(category){
		case "travel":
			return "Travel";
		case "places":
			return "Places";
		case "food_drink":
			return "Food/Drink";
		case "hobbies":
			return "Hobbies";
		case "activities":
			return "Activities";
		case "art_entertainment":
			return "Art/Entertainment";
		default: 
		return "Error";
	}
} %>
<form class="question-form" onsubmit="return false;">
	<div class="question">
		<h4><%= categoryName(category) %> Question: <%= description %></h4>
		<% if (type == "single-blank"){ %>
			<h2>
				<%= content[0] %>
				&nbsp;
				<input type="text" class="line span5 myinput" placeholder="<%= options.placeholder %>" required 
					<% if(answered && answered[0].length > 0){ %>
						value="<%= answered[0] %>"
					<% } %>
					/>
				&nbsp;
				<%= content[1] %>
			</h2>
		<% }else if(type == "short-answer"){ %>
			<h2>
				<%= content %>
			</h2>
			<p>
				<div class="text-right">
					<input type="text" class="input myinput" placeholder="<%= options.placeholder %>" required 
						<% if(answered && answered[0].length > 0){ %>
							value="<%= answered[0] %>"
						<% } %>
					/>
				</div>
			</p>
		<% }else{ %>
			<p>
				Sorry! There was an error.
			</p>
		<% } %>
	</div>
	<div class="form-actions text-right">
		<button type="button" class="btn shuffle">Different Question</button>
		&nbsp;
		<button type="submit" class="btn btn-primary submit">Submit</button>
	</div>
</form>