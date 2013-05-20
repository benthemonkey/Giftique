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
			<h3>
				<%= content[0] %>
				&nbsp;
				<input type="text" class="input myinput" placeholder="<%= options.placeholder %>" required />
				&nbsp;
				<%= content[1] %>
			</h3>
		<% }else if(type == "short-answer"){ %>
			<h3>
				<%= content %>
			</h3>
			<p>
				<div class="text-right">
					<input type="text" class="input myinput" placeholder="<%= options.placeholder %>" required />
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