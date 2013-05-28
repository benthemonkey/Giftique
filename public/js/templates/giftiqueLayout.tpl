<div class="span6">
	<ul class="nav nav-tabs">
		<li class="active"><a href="#all" class="all" data-toggle="tab">All</a></li>
		<li><a href="#travel-tab"				data-toggle="tab">
			<span class="hidden-desktop"><i class="icon-globe" title="Travel"></i></span>
			<span class="visible-desktop">Travel</span></a></li>
		<li><a href="#places-tab"				data-toggle="tab">
			<span class="hidden-desktop"><i class="icon-road" title="Places"></i></span>
			<span class="visible-desktop">Places</span></a></li>
		<li><a href="#food_drink-tab"			data-toggle="tab">
			<span class="hidden-desktop"><i class="icon-glass" title="Food/Drink"></i></span>
			<span class="visible-desktop">Food/Drink</span></a></li>
		<li><a href="#hobbies-tab"				data-toggle="tab">
			<span class="hidden-desktop"><i class="icon-heart" title="Hobbies"></i></span>
			<span class="visible-desktop">Hobbies</span></a></li>
		<li><a href="#activities-tab"			data-toggle="tab">
			<span class="hidden-desktop"><i class="icon-book" title="Activities"></i></span>
			<span class="visible-desktop">Activities</span></a></li>
		<li><a href="#art_entertainment-tab"	data-toggle="tab">
			<span class="hidden-desktop"><i class="icon-film" title="Art/Entertainment"></i></span>
			<span class="visible-desktop">Art/Entertainment</span></a></li>
	</ul>
	<div id="question"></div>
	<div class="progress">
		<div class="bar-label"></div>
		<div class="bar" id="bar"></div>
	</div>
</div>
<div class="span6">
	<div class="product-filters">
		<form class="form-inline">
			Sort by:&nbsp;
			<div class="btn-group" id="sortby">
				<button type="button" class="btn active">Added</button>
				<button type="button" class="btn">Views</button>
				<button type="button" class="btn">Price</button>
			</div>
			&nbsp;&nbsp;Filter Category:&nbsp;
			<select name="category" class="input-medium" id="category-select">
				<option value="all">All</option>
				<option value="travel">Travel</option>
				<option value="places">Places</option>
				<option value="food_drink">Food/Drink</option>
				<option value="hobbies">Hobbies</option>
				<option value="activities">Activities</option>
				<option value="art_entertainment">Art/Entertainment</option>
			</select>
		</form>
	</div>
	<ul id="products-source" class="products"></ul>
	<div id="products" class="hide"></div>
</div>