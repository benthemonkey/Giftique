define(
	[       'marionette','vent', 'templates', 'views', 'collections/AnswerList', 'collections/QuestionList','collections/ProductList', 'models/Product'],
	function(Marionette,  vent,   templates,   views,               AnswerList,               QuestionList,              ProductList,          Product){
		"use strict";

		var app = new Marionette.Application(),
		user;

		app.productList = new ProductList();
		app.questionList = new QuestionList();
		app.answerList = new AnswerList();
		app.navbarView = new views.NavbarView({ collection: app.questionList, model: user });
		app.homeView = new views.HomeView();
		var giftiqueLayout = new views.GiftiqueLayout({ app: app }),
		productListView = new views.ProductListCompositeView({ "collection": app.productList });

		app.addRegions({
			navbar: "#navbar",
			main   : new views.MainRegion({ currentView: app.homeView }),
			productDetails: "#product-details"
		});

		//dont start app until questions have loaded
		app.init = function(){
			//app.etsyTest();

			var query = new Parse.Query(app.questionList.model);
			query.find({
				success: function(results){
					app.questionList.add(results.map(function(question){
						var atts = question.attributes;
						atts.id = question.id;
						return atts;
					}));

					if(user){
						vent.trigger("user:logIn",function(){
							Backbone.history.start();
						});
					}else{
						Backbone.history.start();
					}
				},
				error: function(error){
					vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error");
				}
			});
		};

		app.addInitializer(function(){
			user = Parse.User.current();
			app.navbar.show(app.navbarView);
		});

		vent.on("temp", function(){
			if(app.answerList.length > 0){
				$('#empty-list').hide();
				$('#get-results').removeAttr("disabled").attr("href","#results");
			}else{
				$('#empty-list').show();
				$('#get-results').attr("disabled","disabled").removeAttr("href");
			}
		});

		vent.on('temp2', function(){
			if(app.answerList.length < 5){
				$(".share-facebook-story").attr("disabled","disabled");
				//vent.trigger("appendAlert","Answer more questions to share to timeline","info");
			}
		});

		vent.on('home', function() {
			if(user){
				app.main.show(giftiqueLayout);
				giftiqueLayout.render();
				giftiqueLayout.products.show(productListView);
			}else{
				app.main.show(new views.HomeView());
			}
		});

		vent.on('account', function(){
			var userLayout = new views.UserLayout();
			app.main.show(userLayout);
			userLayout.account.show(new views.AccountView({ model: user }));
			userLayout.answers.show(new views.AnswerListCompositeView({ collection: app.answerList }));
		});

		vent.on('tos', function() {
			app.main.show(new (Marionette.ItemView.extend({ template: templates.tos }))());
		});

		vent.on('user:logIn',function(callback) {
			//Etsy Error
			if($('body').attr("data-etsy-success") != "true"){
				vent.trigger("appendAlert","Etsy request failed. Try disabling any ad-blocking plugins. If you continue to get this error please contact us.","error");
			}

			vent.trigger("answerList:getResults");

			//user = Parse.User.current();

			var query = new Parse.Query(app.answerList.model);
			query.equalTo('user',user);
			query.find({
				success: function(results){
					app.answerList.reset();
					app.answerList.add(results);
					app.answerList.map(function(answer){
						app.questionList.get(answer.get("question2")).set({"answered": answer.get("answer")});
					});
					console.log("added answerlist");
					app.navbarView.render();
					if(callback) (callback)(app.answerList);
				},
				error: function(error){
					vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error");
				}
			});
		});

		vent.on('user:firstLogIn', function() {
			//product tour
		});

		vent.on('user:logOut', function() {
			app.answerList.reset();
			app.productList.reset();
			$("#products-source").empty();
			app.questionList.forEach(function(question){ question.set("answered", false); });
			app.navbarView.render();

			app.router.navigate("#");
		});

		vent.on('answerList:replace', function(answer){
			//var user = Parse.User.current(),
			var query = new Parse.Query(Product);

			query.equalTo("user",user);
			query.equalTo("questionId",answer.get("question2"));
			query.find({
				success: function(results){
					results.forEach(function(product){
						product.set("status",3).save();
					});
				},
				error: function(error){
					vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error");
				}
			});

			var question2_list = app.answerList.pluck("question2"),
			remove_ans = app.answerList.at(question2_list.indexOf(answer.get("question2")));
			app.answerList.remove(remove_ans);
			remove_ans.destroy();

			vent.trigger("answerList:add", answer);

			vent.trigger("account");
			app.router.navigate("#account");
		});

		vent.on('answerList:add',function(answer){
			answer.save();
			app.answerList.add(answer);

			app.appendSearch(answer);
		});

		vent.on("answerList:remove", function(answer){
			app.answerList.remove(answer);
			app.questionList.get(answer.get("question2")).set({"answered": false});

			var query = new Parse.Query(Product);
			query.equalTo("user",user);
			query.equalTo("questionId",answer.get("question2"));
			query.find({
				success: function(results){
					results.forEach(function(product){
						product.set("status",3).save();
					});
				},
				error: function(error){
					vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error");
				}
			});
		});

		vent.on('getQuestion:category', function(_category, _currentQuestionId) {
			//app.router.navigate('category/'+_category);
			console.log(_category);
			var list = app.questionList.getCategory(_category, _currentQuestionId),
			len = list.length;

			if(len === 0 || _category == "all"){
				list = app.questionList.getUnanswered();
				len = list.length;

				if(_category != "all"){ vent.trigger('appendAlert',"You answered all the questions in this category!", "success"); }
			}

			var ind = Math.floor( Math.random() * len );

			giftiqueLayout.question.show(new views.QuestionView({ model: list[ind] }));
		});

		vent.on('getQuestion:id', function(id){
			app.main.show(new views.QuestionView({ model: app.questionList.get(id) }));
		});

		vent.on('questionList:clear:answered', function(){
			//function clear(question){ question.set("answered",false).save(); }
			//questionList.getAnswered().forEach(clear);
		});

		vent.on('answerList:getResults', function(){
			app.productList.reset();

			var user = Parse.User.current(),
			query = new Parse.Query(Product);

			query.equalTo('user',user);
			query.lessThan("status",2);
			//query.descending("views");
			//query.limit(20);
			query.find({
				success: function(results){
					var existing_ids = [];

					results.map(function(product){
						var listing_id = product.get("etsy_item").listing_id;

						if(existing_ids.indexOf(listing_id) == -1){
							app.productList.add(product);
							existing_ids.push(listing_id);
						}
					});
				}
			});
		});

		vent.on("showProduct", function(product){
			console.log(app.productList.get(product));
			app.productDetails.show(new (Marionette.ItemView.extend({ template: templates.productDetailsView }))({ model: app.productList.get(product) }));
			$("#product-modal").modal("show");
		});

		vent.on("productList:filter", function(){
			var cat = $("#category-select").val(),
			sort_by = $("#sortby .btn.active").text(),
			data = $("#products-destination").clone(),
			filteredData, sortedData;

			if(cat == "all"){
				filteredData = data.find('li');
			}else{
				filteredData = data.find('li[data-category='+cat+']');
			}

			if(sort_by == "Price"){
				sortedData = filteredData.sorted({
					by : function(v){
						return parseFloat(v.attr("data-price"));
					},
					reversed: true
				});
			}else if(sort_by == "Views"){
				sortedData = filteredData.sorted({
					by : function(v){
						return parseFloat(v.attr("data-views"));
					},
					reversed: true
				});
			}else{
				sortedData = filteredData;
			}

			$("#products-source").quicksand(sortedData,{
				useScaling: true,
				//adjustHeight: false,
				adjustWidth: 'dynamic'
			},function(){
				$(".products").css("height",($(window).height()-30-91)+"px");
			});
		});

		vent.on('appendAlert', function(text, kind){
			var alert = $("<div />").html(text+'<button type="button" class="close" data-dismiss="alert">&times;</button>')
				.addClass("alert alert-"+kind)
				.appendTo("#alert-container");

			setTimeout(function(){alert.hide("slideup");},5000);
		});

		app.appendSearch = function(answer){
			var question = app.questionList.get(answer.get("question2")),
			terms = question.get("appendTerms").map(function(term){
				return {
					qid: question.id,
					category: question.get("category"),
					term: term,
					query: answer.get("answer")[0] + " " + term
				};
			});
			app.etsySearch(terms);
		};

		app.etsySearch = function(ajax_list) {
			var search = ajax_list.shift(),
			user = Parse.User.current(),

			newProduct = function(item){
				//return {
				var prod = new Product({
					'user'			: user,
					'category'  : search.category,
					'questionId': search.qid,
					'term'      : search.term,
					'query'     : search.query,
					'etsy_views': item.views,
					'etsy_item' : {
						'image'					: item.Images[0].url_170x135,
						'category_path' : item.category_path,
						'title'					: item.title,
						'listing_id'		: item.listing_id,
						'price'					: item.price,
						'tages'					: item.tags,
						'views'					: item.views,
						'url'						: item.url
					}
				});

				console.log(prod);

				prod.save({
					success: function(){},
					error: function(a,err){ console.log(err + "\n error adding product"); }
				});

				return prod;
			};

			$.ajax({
				type: "GET",
				url: "http://openapi.etsy.com/v2/listings/active.js",
				async: true,
				cache: false,
				data: {
					keywords: search.query,
					limit: 6,
					includes: "Images:1",
					sort_on: "score",
					api_key: "muf6785p5zsu3iwp28e51kgi"
				},
				dataType: "jsonp",
				contentType: "application/json; charset=utf-8",
				success: function(data) {
					if (data.ok) {
						if(data.count > 0){
							var prods = data.results.map(newProduct);
							app.productList.add(prods);
							console.log("successful ajax. adding products");
							vent.trigger("productList:filter");
						}

						if(ajax_list.length > 0){
							app.etsySearch(ajax_list);
						}
					} else {
						alert(data.error);
					}
				},
				error: function(result){console.log(result);}
			});
		return false;
		};

		app.etsyTest = function(){
			$.ajax({
				type: "GET",
				url: "http://openapi.etsy.com/v2/users/benthemonkey.js",
				async: true,
				data: {
					limit: 1,
					api_key: "muf6785p5zsu3iwp28e51kgi"
				},
				dataType: "jsonp",
				contentType: "application/json; charset=utf-8",
				success: function(data){
					console.log("adblock disabled");
					$('body').attr("data-etsy-success","true");

					$("#alert-container").find(".alert").alert("close");
				},
				error: function(){
					console.log("ajax error");
				}
			});
		};

		return app;
	}
);
