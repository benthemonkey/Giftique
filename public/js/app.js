/*global $*/
define(
	[       'marionette','vent', 'templates', 'views', 'collections/AnswerList', 'collections/QuestionList','collections/ProductList', 'models/Product'],
	function(Marionette,  vent,   templates,   views,               AnswerList,               QuestionList,              ProductList,          Product){
		"use strict";

		var app = new Marionette.Application(),
		user,
		anonymous_user = true,
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
		sidebarView = new views.SidebarView({ collection: questionList }),
		answerList = new AnswerList();

		app.addRegions({
			sidebar: "#sidebar",
			main   : views.MainRegion,
			list   : '#question-list-wrapper'
		});

		//dont start app until questions have loaded
		app.loadQuestions = function(Router, Controller){
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
					Backbone.history.start();
				},
				error: function(error){
					vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error");
				}
			});
		};

		app.addInitializer(function(){
			$('#meet-robbie').on('shown', function(){
				$('body').css('overflow', 'hidden');
			}).on('hidden', function(){
				$('body').css('overflow', 'auto');
			});

			app.sidebar.show(sidebarView);

			//User already signed in
			if(Parse.User.current()){
				vent.trigger("user:logIn");
			}else{
				//User not signed in, check for anonymous user
				if(localStorage['giftique_user']){
					var username = localStorage['giftique_user'];

					Parse.User.logIn(username,"temp",{
						success: function(user){
							console.log('successfully logged into previous anonymous session');
							vent.trigger("user:logIn");
						},
						error: function(error){
							vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error");
						}
					});
				}else{
					//no anonymous user, make one
					var newUser = "anon" + Math.random().toString(36).substr(2,16);
					localStorage['giftique_user'] = newUser;

					Parse.User.signUp(newUser, "temp", { ACL: new Parse.ACL() },{
						success: function(user){
							console.log('you are now in an anonymous user session');
						},
						error: function(error){
							vent.trigger('appendAlert',"Error: " + error.code + " " + error.message, "error");
						}
					});
				}
			}
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
			/*$('.nav-large').addClass("hide");
			$('.nav-small').removeClass("hide");*/
			$('.nav > li').removeClass("active");
			$('#home').addClass("active");

			user = Parse.User.current();

			if(user && user.get("username").substr(0,4) != "anon"){
				var userLayout = new views.UserLayout();
				app.main.show(userLayout);
				userLayout.account.show(new views.AccountView({ model: user }));
				userLayout.answers.show(new views.AnswerListCompositeView({ collection: answerList }));
			}else{
				app.main.show(new (Marionette.ItemView.extend({ template: templates.homeView }))());
			}
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
					sidebarView.render();
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
			sidebarView.render();
		});

		vent.on('submitAnswer',function(answer){
			answer.save();
			answerList.add(answer);
			console.log(answerList);

			var appendSearch = function(answer){
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

			appendSearch(answer);
		});

		vent.on('getQuestion:category', function(_category, _currentQuestionId) {
			$('.nav > li').removeClass("active");
			$("#"+_category).addClass("active");
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
			$('.nav > li').removeClass("active");
			$('#results').addClass("active");

			var user = Parse.User.current(),
			query = new Parse.Query(Product);

			query.equalTo('user',user);
			query.find({
				success: function(results){
					results.map(function(product){
						if(productList[product.get('category')].isUniqueListingId(product)) productList[product.get('category')].add(product);
					});
					app.main.show(productLayout);
					vent.trigger("showResults");
				}
			});
		});

		vent.on('showResults', function(){
			var answeredCategories = answerList.pluck("category"),
			cats = ['travel','places','food_drink','hobbies','activities','art_entertainment'],
			showResults = function(cat){
				if(answeredCategories.indexOf(cat) != -1){
					$("#" + cat.replace('_','-') + "-products").fadeIn();
					productLayout[cat].show(new views.ProductListCompositeView({ collection: productList[cat] }));
				}
			};

			cats.forEach(showResults);
		});

		vent.on('appendAlert', function(text, kind){
			$("<div />").html(text+'<button type="button" class="close" data-dismiss="alert">&times;</button>')
				.addClass("alert alert-"+kind)
				.appendTo("#alert-container");
		});

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
					error: function(a,err){ console.log(err); alert("error adding product"); }
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
							vent.trigger("showResults");
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
