<div class="well well-small sidebar">
	<a class="brand nav-large" href="#"><img src="http://commondatastorage.googleapis.com/giftiqueme/giftiquemelogo.gif" /></a>
	<a class="brand nav-small hide" href="#"><img src="http://commondatastorage.googleapis.com/giftiqueme/giftique-g.gif" /></a>
</div>
<div class="well sidebar">
	<ul class="nav nav-list">
		<li id="home">
			<a href="#"><i class="icon-home"></i> Home</a>
		</li>
		<li id="results-btn" class="hide">
			<a href="#results"><i class="icon-gift"></i> Get Suggestions</a>
		</li>
		<li class="nav-header nav-large">Tell us about her:</li>
		<li id="travel-btn"><a href="#category/travel">
			<i class="icon-globe"></i> Travel <span class="label hide"></span>
		</a></li>
		<li id="places"><a href="#category/places">
			<i class="icon-road"></i> Places <span class="label hide"></span>
		</a></li>
		<li id="food_drink"><a href="#category/food_drink">
			<i class="icon-glass"></i> Food/Drink <span class="label hide"></span>
		</a></li>
		<li id="hobbies"><a href="#category/hobbies">
			<i class="icon-heart"></i> Hobbies <span class="label hide"></span>
		</a></li>
		<li id="activities"><a href="#category/activities">
			<i class="icon-book"></i> Activities <span class="label hide"></span>
		</a></li>
		<li id="art_entertainment"><a href="#category/art_entertainment">
			<i class="icon-film"></i> Art/Entertainment <span class="label hide"></span>
		</a></li>
		<li id="all">
			<a href="#category/all"><i class="icon-star"></i> All Categories</a>
		</li>
	</ul>
</div>
<div id="log-in-modal" class="modal hide fade in" role="dialog" >
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h3>Welcome Back!</h3>
	</div>
	<div class="modal-body">
		<div class="text-center">
			<button type="button" class="btn btn-primary facebook-log-in">Log In with Facebook</button>
		</div>
		<div class="text-center" style="padding: 10px 0;"><strong>OR</strong></div>
		<form class="log-in-form form-horizontal" onsubmit="return false;">
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
			<button type="button" class="btn btn-primary facebook-log-in">Sign Up with Facebook</button>
		</div>
		<div class="text-center" style="padding: 10px 0;"><strong>OR</strong></div>
		<form class="sign-up-form form-horizontal" onsubmit="return false;">
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