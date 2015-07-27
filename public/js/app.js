define(
	[       'marionette','vent', 'templates', 'views', 'collections/AnswerList', 'collections/QuestionList','collections/ProductList', 'models/Product'],
	function(Marionette,  vent,   templates,   views,               AnswerList,               QuestionList,              ProductList,          Product){
		"use strict";

		var app = new Marionette.Application(),
		user;

		window.app = app; /*################TEMPORARY GLOBAL VARIABLE GET RID OF ME AHHHHHHH ################*/

		app.productList = new ProductList();
		app.questionList = new QuestionList();
		app.answerList = new AnswerList();
		app.navbarView = new views.NavbarView({ model: user });
		app.homeView = new views.HomeView();
		app.ajax_list = [];
		app.etsyInProgress = false;
		//app.giftiqueLayout = new views.GiftiqueLayout({ app: app });
		//productListView = new views.ProductListCompositeView({ "collection": app.productList });

		app.addRegions({
			navbar: "#status",
			main   : new views.MainRegion({ currentView: app.homeView }),
			productDetails: "#product-details",
			editQuestion: "#edit-question"
		});

		//dont start app until questions have loaded
		app.init = function(){
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
					vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error", true);
				}
			});
		};

		app.addInitializer(function(){
			user = Parse.User.current();
			app.navbarView.model = user;
			app.navbar.show(app.navbarView);
		});

		vent.on('home', function() {
			user = Parse.User.current(); //double check user
			//giftiqueLayout = new views.GiftiqueLayout({ app: app });

			if(user){
				app.giftiqueLayout = new views.GiftiqueLayout({ app: app });

				app.main.show(app.giftiqueLayout);
				app.giftiqueLayout.products.show(new views.ProductListCompositeView({ "collection": app.productList }));
				vent.trigger("getQuestion:category","all");
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
			$('#tos-btn').click();
		});

		vent.on('privacy', function(){
			$('#privacy-btn').click();
		});

		vent.on('user:logIn',function(callback) {
			user = Parse.User.current();
			app.navbarView.model = user;

			//Etsy Error
			if($('body').attr("data-etsy-success") != "true"){
				vent.trigger("appendAlert","ERROR: Etsy request failed. Try disabling any ad-blocking plugins. If you continue to get this error please contact us.","error",true);
			}

			vent.trigger("productList:fetch");

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
					vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error", true);
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
			//app.navbarView.render();

			app.router.navigate("#", {trigger: true});
		});

		vent.on('answerList:replace', function(answer){
			//var user = Parse.User.current(),
			vent.trigger("productList:removeQuestionId", answer.get("question2"));

			var question2_list = app.answerList.pluck("question2"),
			remove_ans = app.answerList.at(question2_list.indexOf(answer.get("question2")));
			app.answerList.remove(remove_ans);
			remove_ans.destroy();

			vent.trigger("answerList:add", answer);

			$("#edit-question-modal").modal("hide");
			app.router.navigate("#account", { trigger: false });
		});

		vent.on('answerList:add',function(answer){
			answer.save();
			app.answerList.add(answer);

			app.appendSearch(answer);
		});

		vent.on("answerList:remove", function(answer){
			app.answerList.remove(answer);
			app.questionList.get(answer.get("question2")).set({"answered": false});
			vent.trigger("productList:removeQuestionId", answer.get("question2"));
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

			app.giftiqueLayout.question.show(new views.QuestionView({ model: list[ind] }));
		});

		vent.on('getQuestion:id', function(id){
			app.editQuestion.show(new views.QuestionView({ model: app.questionList.get(id) }));
			$("#edit-question-modal").modal("show").on('hide',function(){
				app.router.navigate("#account",{ trigger: false });
			});
		});

		vent.on('questionList:clear:answered', function(){
			//function clear(question){ question.set("answered",false).save(); }
			//questionList.getAnswered().forEach(clear);
		});

		vent.on('productList:fetch', function(){
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

		vent.on("productList:removeQuestionId", function(questionId){
			var query = new Parse.Query(Product);
			query.equalTo("user",user);
			query.equalTo("status",0);
			query.equalTo("questionId",questionId);
			query.find({
				success: function(results){
					results.forEach(function(product){
						product.set("status",3);
					});
					Parse.Object.saveAll(results,{
						success: function(){ console.log("updated products status"); },
						error: function(error){ vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error", true); }
					});
					app.productList.remove(results);
				},
				error: function(error){
					vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error", true);
				}
			});
		});

		vent.on("showProduct", function(product){
			if(!app.productList.get(product)){
				var query = new Parse.Query(Product);
				query.get(product,{
					success: function(result){
						app.productDetails.show(new (Marionette.ItemView.extend({ template: templates.productDetailsView }))({ model: result }));
						console.log(result);
						$("#product-modal").find(".modal-header").html("<h4>Check out this gift I found using Giftique.me!</h4>");
						$("#product-modal").modal("show");
					},
					error: function(a,err){ console.log(err + "\n error adding product"); }
				});
			}else{
				app.productDetails.show(new (Marionette.ItemView.extend({ template: templates.productDetailsView }))({ model: app.productList.get(product) }));
				console.log(app.productList.get(product));
				$("#product-modal").modal("show").on('hide',function(){
					app.router.navigate("#", { trigger: false });
				});
			}

			app.router.navigate("product/"+product, { trigger: false });
		});

		vent.on("productList:refetch", function(){
			vent.trigger("appendAlert","Redoing searches. This may take a minute.","warning");
			app.productList.forEach(function(product){
				product.set("status",3);
			});

			Parse.Object.saveAll(app.productList.models,{
				success: function(){ console.log("removed all items"); },
				error: function(error){ vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error", true); }
			});

			app.productList.reset();

			app.answerList.forEach(function(answer){
				app.appendSearch(answer);
			});
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

			if(sortedData.length > 0){
				$("#products-source").quicksand(sortedData,{
					useScaling: true,
					//adjustHeight: 'dynamic',
					adjustWidth: 'dynamic'
				},function(){
					$(".products").css("height",($(window).height()-35-110)+"px");
				});
			}
		});

		vent.on('appendAlert', function(text, kind, permanent){
			var alert = $("<div />").html(text+'<button type="button" class="close" data-dismiss="alert">&times;</button>')
				.addClass("alert alert-"+kind)
				.appendTo("#alert-container");

			if(!permanent) setTimeout(function(){alert.hide("slideup");},5000);
		});

		app.appendSearch = function(answer){
			var question = app.questionList.get(answer.get("question2"));
			question.get("appendTerms").forEach(function(term){
				app.ajax_list.push({
					qid: question.id,
					category: question.get("category"),
					term: term,
					query: answer.get("answer")[0] + " " + term
				});
			});
			if(!app.etsyInProgress){
				app.etsyInProgress = true;
				app.etsySearch();
			}
		};

		app.etsySearch = function() {
			var search = app.ajax_list.shift(),
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
						'description'		: item.description,
						'listing_id'		: item.listing_id,
						'price'					: item.price,
						'tags'					: item.tags,
						'views'					: item.views,
						'url'						: item.url
					}
				});

				//console.log(prod);

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
							Parse.Object.saveAll(prods,{
								success: function(list){ app.productList.add(list); },
								error: function(a,err){ console.log(err + "\n error adding products"); }
							});
							//app.productList.add(prods);
							console.log("successful ajax. adding products");
							vent.trigger("productList:filter");
						}else{
							vent.trigger("appendAlert","A search returned no results.","warning");
						}

						if(app.ajax_list.length > 0){
							app.etsySearch();
						}else{
							app.etsyInProgress = false;
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
