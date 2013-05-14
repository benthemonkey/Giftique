//Google Analytics
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-38458888-1']);
	_gaq.push(['_trackPageview']);

	(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();

//facebook for parse start
window.fbAsyncInit = function() {
	Parse.FacebookUtils.init({
		appId      : '128520183979985', // Facebook App ID REAL: 128520183979985, DEV: 140050132852482
		//channelUrl : '//dev.giftique.me/channel.html', // Channel File
		status     : false, // check login status
		cookie     : true, // enable cookies to allow Parse to access the session
		xfbml      : false  // parse XFBML
	});
	// Additional initialization code here
};

//Facebook
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s);
	js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=128520183979985"; //REAL: 128520183979985. DEV: 140050132852482
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//Twitter
!function(d, s, id) {
	var js,
	fjs = d.getElementsByTagName(s)[0],
	p=/^http:/.test(d.location)?'http':'https';
	if(!d.getElementById(id)){
		js=d.createElement(s);
		js.id=id;
		js.src=p+'://platform.twitter.com/widgets.js';
		fjs.parentNode.insertBefore(js,fjs);
	}
}(document, 'script', 'twitter-wjs');