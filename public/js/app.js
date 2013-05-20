define(
	[       'marionette','vent', 'templates', 'views', 'collections/AnswerList', 'collections/QuestionList','collections/ProductList', 'models/Product'],
	function(Marionette,  vent,   templates,   views,               AnswerList,               QuestionList,              ProductList,          Product){
		"use strict";

		var app = new Marionette.Application(),
		user,
		productList = {
			travel           : new ProductList(),
			places           : new ProductList(),
			food_drink       : new ProductList(),
			hobbies          : new ProductList(),
			activities       : new ProductList(),
			art_entertainment: new ProductList()
		},
		productLayout = new views.ProductLayout(),
		questionList = new QuestionList(),
		navbarView = new views.NavbarView({ collection: questionList, model: user }),
		answerList = new AnswerList();

		app.addRegions({
			navbar: "#navbar",
			main   : views.MainRegion,
			list   : '#question-list-wrapper'
		});

		//dont start app until questions have loaded
		app.init = function(Router, Controller){
			var query = new Parse.Query(questionList.model);
			query.find({
				success: function(results){
					questionList.add(results.map(function(question){
						var atts = question.attributes;
						atts.id = question.id;
						return atts;
					}));

					app.start();
					console.log("started app");
					app.router = new Router({
						controller : Controller
					});

					user = Parse.User.current();
					if(user){
						vent.trigger("user:logIn",function(){Backbone.history.start();});
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
			app.navbar.show(navbarView);
		});

		vent.on("temp", function(){
			if(answerList.length > 0){
				$('#empty-list').hide();
				$('#get-results').removeAttr("disabled").attr("href","#results");
			}else{
				$('#empty-list').show();
				$('#get-results').attr("disabled","disabled").removeAttr("href");
			}
		});

		vent.on('home', function() {
			app.main.show(new views.HomeView());
		});

		vent.on('account', function(){
			var userLayout = new views.UserLayout();
			app.main.show(userLayout);
			userLayout.account.show(new views.AccountView({ model: user }));
			userLayout.answers.show(new views.AnswerListCompositeView({ collection: answerList }));
		});

		vent.on('tos', function() {
			app.main.show(new (Marionette.ItemView.extend({ template: templates.tos }))());
		});

		vent.on('user:logIn',function(callback) {
			user = Parse.User.current();

			var query = new Parse.Query(answerList.model);
			query.equalTo('user',user);
			query.find({
				success: function(results){
					answerList.reset();
					answerList.add(results);
					answerList.map(function(answer){
						questionList.get(answer.get("question2")).set({"answered": answer.get("answer")});
					});
					console.log("added answerlist");
					navbarView.render();
					if(callback) (callback)(answerList);
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
			answerList.reset();
			for(var prod in productList){
				productList[prod].reset();
			}
			questionList.forEach(function(question){ question.set("answered", false); });
			navbarView.render();

			app.router.navigate("#");
		});

		vent.on('submitNewAnswer', function(answer){
			var user = Parse.User.current(),
			query = new Parse.Query(Product);

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

			var question2_list = answerList.pluck("question2"),
			remove_ans = answerList.at(question2_list.indexOf(answer.get("question2")));
			answerList.remove(remove_ans);
			remove_ans.destroy();

			vent.trigger("submitAnswer", answer);

			vent.trigger("account");
			app.router.navigate("#account");
		});

		vent.on('submitAnswer',function(answer){
			answer.save();
			answerList.add(answer);
			console.log(answerList);

			app.appendSearch(answer);
		});

		vent.on("answerList:remove", function(answer){
			answerList.remove(answer);
			questionList.get(answer.get("question2")).set({"answered": false});
		});

		vent.on('getQuestion:category', function(_category, _currentQuestionId) {
			app.router.navigate('category/'+_category);

			var list = questionList.getCategory(_category, _currentQuestionId),
			len = list.length;

			if(len === 0 || _category == "all"){
				list = questionList.getUnanswered();
				len = list.length;

				if(_category != "all"){ vent.trigger('appendAlert',"You answered all the questions in this category!", "success"); }
			}

			var ind = Math.floor( Math.random() * len );

			app.main.show(new views.QuestionView({ model: list[ind] }));
		});

		vent.on('getQuestion:id', function(id){
			app.main.show(new views.QuestionView({ model: questionList.get(id) }));
		});

		vent.on('questionList:clear:answered', function(){
			//function clear(question){ question.set("answered",false).save(); }
			//questionList.getAnswered().forEach(clear);
		});

		vent.on('answerList:getResults', function(){
			for(var prod in productList){
				productList[prod].reset();
			}
			app.main.show(productLayout);

			var user = Parse.User.current(),
			queryCount = 0,
			cats = ['travel','places','food_drink','hobbies','activities','art_entertainment'],
			getResults = function(cat){
				var query = new Parse.Query(Product);

				query.equalTo('user',user);
				query.lessThan("status",2);
				query.equalTo("category",cat);
				query.descending("views");
				query.find({
					success: function(results){
						var existing_ids = [];

						results.map(function(product){
							var listing_id = product.get("etsy_item").listing_id;

							if(existing_ids.indexOf(listing_id) == -1){
								productList[cat].add(product);
								existing_ids.push(listing_id);
							}
						});
						queryCount++;
						checkQueryCount();
					}
				});
			},
			checkQueryCount = function(){
				if(queryCount == 6){
					//app.main.show(productLayout);
					vent.trigger("showResults");
				}
			};

			cats.forEach(getResults);
		});

		vent.on('showResults', function(){
			//var answeredCategories = answerList.pluck("category"),
			var cats = ['travel','places','food_drink','hobbies','activities','art_entertainment'],
			showResults = function(cat){
				//if(answeredCategories.indexOf(cat) != -1){
					//$("#" + cat.replace('_','-') + "-products").fadeIn();
					productLayout[cat].show(new views.ProductListCompositeView({ collection: productList[cat] }));
				//}
			};

			cats.forEach(showResults);
		});

		vent.on('appendAlert', function(text, kind){
			$("<div />").html(text+'<button type="button" class="close" data-dismiss="alert">&times;</button>')
				.addClass("alert alert-"+kind)
				.appendTo("#alert-container");
		});

		app.appendSearch = function(answer){
			var question = questionList.get(answer.get("question2")),
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
				}).save({
					success: function(){},
					error: function(a,err){ console.log(err + "\n error adding product"); }
				});
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
							data.results.forEach(newProduct);
							console.log("successful ajax. adding products");
						}

						if(ajax_list.length > 0){
							app.etsySearch(ajax_list);
						}else{
							$('#results-btn').find('.badge').show('bounce','slow');
							//vent.trigger("showResults");
						}
					} else {
						alert(data.error);
					}
				},
				error: function(result){console.log(result);}
			});
		return false;
		};
	return app;
	}
);
