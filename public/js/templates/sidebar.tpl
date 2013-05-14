<div class="well well-small sidebar">
	<a class="brand nav-large hide" href="#"><img src="img/giftiquemelogo.gif" /></a>
	<a class="brand nav-small" href="#"><img src="img/giftique-g.gif" /></a>
</div>
<div class="well sidebar">
	<ul class="nav nav-list">
		<li id="home" class="nav-small active"><a href="#">
			<i class="icon-home"></i>
		</a></li>
		<li class="nav-header nav-large hide">Tell us about her:</li>
		<li id="travel"><a href="#category/travel">
			<i class="icon-globe"></i><span class="nav-large hide"> Travel</span> <span class="label">1</span>
		</a></li>
		<li id="places"><a href="#category/places">
			<i class="icon-road"></i><span class="nav-large hide"> Places</span> <span class="label">1</span>
		</a></li>
		<li id="food_drink"><a href="#category/food_drink">
			<i class="icon-glass"></i><span class="nav-large hide"> Food/Drink</span> <span class="label">1</span>
		</a></li>
		<li id="hobbies"><a href="#category/hobbies">
			<i class="icon-heart"></i><span class="nav-large hide"> Hobbies</span> <span class="label">1</span>
		</a></li>
		<li id="activities"><a href="#category/activities">
			<i class="icon-book"></i><span class="nav-large hide"> Activities</span> <span class="label">1</span>
		</a></li>
		<li id="art_entertainment"><a href="#category/art_entertainment">
			<i class="icon-film"></i><span class="nav-large hide"> Art/Entertainment</span> <span class="label">1</span>
		</a></li>
		<li id="all"><a href="#category/all">
			<i class="icon-star"></i><span class="nav-large hide"> Random</span>
		</a></li>
		<li class="divider"></li>
		<li id="expand-sidebar"><a class="btn-link">
				<div class="nav-small"><i class="icon-chevron-right"></i></div>
				<div class="nav-large hide"><i class="icon-chevron-left"></i> Collapse Navigation</div>
			</a></li>
	</ul>
</div>
<div class="well sidebar">
	<ul class="nav nav-list text-center" id="status">
		<li><a class="pointer" id="log-in-btn"><i class="icon-user"></i><small><br/>Log In</small></a></li>
		<li><a class="pointer" id="sign-up-btn"><i class="icon-check"></i><small><br/>Sign Up</small></a></li>
	</ul>
</div>
<div id="log-in-modal" class="modal hide fade in" role="dialog" >
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h3>Welcome Back!</h3>
	</div>
	<div class="modal-body">
		<div class="text-center">
			<button type="button" class="btn btn-large btn-primary facebook-log-in">Log In with Facebook</button>
		</div>
		<div class="text-center" style="padding: 10px 0;"><strong>OR</strong></div>
		<form class="log-in-form form-horizontal">
			<div class="alert alert-error" style="display:none"></div>
			<div class="control-group">
				<label class="control-label" for="log-in-username">Email</label>
				<div class="controls">
					<input type="email" id="log-in-username" placeholder="user@example.com" required>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="log-in-password">Password</label>
				<div class="controls">
					<input type="password" id="log-in-password" placeholder="Password" required>
				</div>
			</div>
			<div class="control-group">
				<div class="controls">
					<button type="submit" class="btn">Log In</button>
				</div>
			</div>
		</form>
	</div>
</div>
<div id="sign-up-modal" class="modal hide fade in" role="dialog" >
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h3>Welcome to Giftique!</h3>
	</div>
	<div class="modal-body">
		<div class="text-center">
			<button type="button" class="btn btn-large btn-primary facebook-log-in">Sign Up with Facebook</button>
		</div>
		<div class="text-center" style="padding: 10px 0;"><strong>OR</strong></div>
		<form class="sign-up-form form-horizontal">
			<div class="alert alert-error" style="display:none"></div>
			<div class="control-group">
				<label class="control-label" for="sign-up-username">Email</label>
				<div class="controls">
					<input type="email" id="sign-up-username" placeholder="user@example.com" required>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="sign-up-password">Password</label>
				<div class="controls">
					<input type="password" id="sign-up-password" placeholder="Password" required>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="sign-up-password2">Verify Password</label>
				<div class="controls">
					<input type="password" id="sign-up-password2" placeholder="And Again..." required>
				</div>
			</div>
			<div class="control-group">
				<div class="controls">
					<a href="#tos" target="_blank">Terms of Service</a><br/>
					<button type="submit" class="btn">Sign Up</button>
				</div>
			</div>
		</form>
	</div>
</div>