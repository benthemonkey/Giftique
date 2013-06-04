Parse.Cloud.define("processQueue", function(request, response){
	//inProgress count
	var query = new Parse.Query('QueryQueue');
	query.equalTo("state",1);
	query.count({
		success: function(count){
			if (count < 9){
				var query2 = new Parse.Query('QueryQueue');
				query2.equalTo("state",0);
				query2.first({
					success: function(result){
						if(result){
							result.save({ "state": 1 },{
								success: function(result){
									Parse.Cloud.run("etsySearch",{ "query": result.get("query"), "id": result.id },{
										success: function(result){ response.success(result); },
										error: function(error){ response.error(error); }
									});
								},
								error: function(error){ response.error(error); }
							});
						}else{
							response.success("empty queue");
						}
					},
					error: function(error){ response.error(error); }
				});
			}else{
				response.success("9 queries running");
			}
		},
		error: function(error){ response.error(error); }
	});
});

Parse.Cloud.define("addToQueue", function(request, response){
	var QueryQueue = Parse.Object.extend("QueryQueue");
	var item = new QueryQueue();
	item.save({
		"query": request.params.query,
		"state": 0
	},{
		success: function(result){ response.success("Added to queue"); },
		error: function(error){ response.error(error); }
	});
});

Parse.Cloud.define("etsySearch", function(request, response) {
	Parse.Cloud.httpRequest({
		url: "http://openapi.etsy.com/v2/listings/active",
		params: {
			keywords: request.params.query,
			limit: 1,
			includes: "Images:1",
			sort_on: "score",
			api_key: "muf6785p5zsu3iwp28e51kgi"
		},
		headers: {
			'Data-Type': 'json',
			'Content-Type': 'application/json; charset=utf-8'
		},
		success: function(httpResponse) {
			var query = new Parse.Query("QueryQueue");
			query.get(request.params.id,{
				success: function(result){
					result.save({ "state": 3 },{
						success: function(){ response.success(httpResponse.data.results); },
						error: function(error){ response.error(error); }
					});
				},
				error: function(error){ response.error(error); }
			});
		},
		error: function(error){
			response.error(request.params);
		}
	});
});