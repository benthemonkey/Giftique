var counter = 0,
queue = [],
inProgressCount = function(_queue){
	var count = 0;
	for(var i=0; i<_queue.length; i++){
		if(_queue[i].inProgress){
			count++;
		}
	}
	return count;
},
item = function(_n){
	this.val = _n;
	this.inProgress = false;
},
fakeRequest = function(_item){
	setTimeout(onCompletedRequest,Math.round(1000*Math.random()+1000),_item);
},
onCompletedRequest = function(_item){
	$("<p />").text("#: "+queue.length+" p: "+inProgressCount(queue)+" i: "+_item.val).prependTo("#out");
	var i = 0;
	while(queue[i].val != _item.val){ i++; }
	queue.splice(i,1);
	processQueue();
},
addToQueue = function(_item){
	queue.push(_item);
	processQueue();
},
processQueue = function(){
	var ipc = inProgressCount(queue);
	if(queue.length > ipc && ipc < 9){
		queue[ipc].inProgress = true;
		fakeRequest(queue[ipc]);
	}
};

var que = function(){
	$("#out").text("running");
	Parse.Cloud.run("processQueue",null,{
		success: function(result){
			$("#out").text(result);
		},
		error: function(error){ $("#out").text(error); }
	});
};

$(document).ready(function(){
	$('#request').on('click',function(){
		for(var i=0; i<20; i++){
			var tmpitem = new item(counter);
			addToQueue(tmpitem);
			counter++;
		}
	});

	Parse.initialize("gMyxpM84HXUfooYCh9SYqieWgZyMY5xBcGUfkt4s", "D2S9TY00GRYQNYTXMEPQNGLze1FoDOUEFQTyOv8P");//("gMyxpM84HXUfooYCh9SYqieWgZyMY5xBcGUfkt4s", "D2S9TY00GRYQNYTXMEPQNGLze1FoDOUEFQTyOv8P");//Prod: ("jETjrmeloXB54t2oBPkLFsgyh4wmkU9vyS0PJwGO", "SgiDW5lYwfzxd5CB2z25eVx5SfB4kT5SGGM91Ymw");

	if(!Parse.User.current()){
		Parse.User.logIn("bensrothman@gmail.com","themonkey");
	}

	$("#process").on('click',que);
});