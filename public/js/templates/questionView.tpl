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

<div class="question">
	<div class="question-body">
		<p class="question-category"><%= categoryName(category) %> Question: <%= description %></p>
		<% if (type == "single-blank"){ %>
			<p class="question-text">
				<%= content[0] %>
				&nbsp;<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>&nbsp;
				<%= content[1] %>
			</p>
		<% }else if(type == "short-answer"){ %>
			<p class="question-text">
				<%= content %>
			</p>
		<% }else{ %>
			<p>
				Sorry! There was an error.
			</p>
		<% } %>
	</div>
	<div class="text-right question-input">
		<input type="text" class="input myinput" placeholder="<%= options.placeholder %>" required />
	</div>
</div>
<div class="form-actions text-right">
	<button type="button" class="btn shuffle">Different Question</button>
	&nbsp;
	<button type="submit" class="btn btn-primary submit">Submit</button>
</div>