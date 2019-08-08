var database = [
	{
		username:"Bob",
		password:"12345"
	}
];

var newsfeed = [
	{
		username:"Bob",
		timeline:"wowowowowoowowow"
	}
];

// login username and password
var username;
var password;

// is user login?
var login = false;

// user interface loop
function userInterface(){

	var exit = false;

	while(!exit){
		var option = prompt("Sign in, Register or Exit?(Case non-senstive)");

		// sign in
		if(option.toLowerCase() === "sign in"){

			var c_username = prompt("Username(Case senstive)");
			var c_password = prompt("Password(Case senstive)");

			login = loginUser(c_username, c_password);

			if(login){
				username = c_username;
				password = c_password;

				logUsers();
				alert("You login as "+username);

				actionInterface();
			}
			else{
				alert("username or password is not correct");
			}

		}
		// register
		else if(option.toLowerCase() === "register"){

			var r_username = prompt("Username");
			var r_password = prompt("Password");

			if(!userExist(r_username)){

				login = registerUser(r_username, r_password);

				username = r_username;
				password = r_password;

				logUsers();
				alert("Register username: "+username+" successful");

				actionInterface();
			}
			else{
				alert("username "+username+" already exited");
			}
		}
		else if(option.toLowerCase() === "exit"){

			exit = true;
		}
	}
	
}

// action interface loop
function actionInterface(){

	var logout = false;

	while(!logout){

		var option = prompt("Newsfeed, Add feed or Logout?(Case non-senstive)");

		// show all newsfeed from user
		if(option.toLowerCase() === "newsfeed"){

			if(login){
				var n_username = prompt("Username for feed");
				var allfeeds = getfeeds(n_username);

				if(allfeeds.length > 0){

					var feedDesc = n_username +" have feeds:\n";

					for(var i=0; i<allfeeds.length; i++){
						feedDesc += allfeeds[i] + "\n";
					}

					logfeeds();
					alert(feedDesc);
				}
				else{
					alert(n_username+" have no feeds");
				}
				
			}
			else{
				alert("Login to see newsfeed");
			}
			
		}
		// add new feed to user
		else if(option.toLowerCase() === "add feed"){
			if(login){

				var feed = prompt("timeline");
				addfeed(username, feed);

				logfeeds();
				alert("New timeline: "+feed+"\nAdd to username: "+username);
			}
			else{
				alert("Login to add feed");
			}
		}
		else if(option.toLowerCase() === "logout"){
			logout = true;
		}
	}
}

// function to register user
function registerUser(user_name, pass){
	database.push({
		username:user_name,
		password:pass
	});

	return true;
}

// function to login user
function loginUser(user_name, pass){

	for(var i=0; i<database.length; i++){
		var user = database[i];

		if(user.username === user_name
			&& user.password === pass){

			return true;
		}
	}

	return false;
}

// function check if user existed
function userExist(user_name){

	for(var i=0; i<database.length; i++){
		var user = database[i];

		if(user.username === user_name){

			return true;
		}
	}

	return false;
}

// function to get all feeds from user
function getfeeds(user_name){

	var allfeeds = [];

	for(var i=0; i<newsfeed.length; i++){
		var feed = newsfeed[i];

		if(feed.username === user_name){
			allfeeds.push(feed.timeline);
		}
	}

	return allfeeds;
}

// function to add feed to user
function addfeed(user_name, feed){
	newsfeed.push({
		username:user_name,
		timeline:feed
	});
}

// log all users to console
function logUsers(){
	database.forEach(function(user){
		console.log(user);
	});
}

// log all feeds to console
function logfeeds(){
	newsfeed.forEach(function(feed){
		console.log(feed);
	});
}

// main
logUsers();
logfeeds();
userInterface();