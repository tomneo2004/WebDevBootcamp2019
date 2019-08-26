const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

let users = [
	{
		id:"1",
		name:"John",
		email:"john@gmail.com",
		password:"1234",
		entry:0
	},
	{
		id:"2",
		name:"Ken",
		email:"Ken@gmail.com",
		password:"12345",
		entry:0
	}
]

app.get('/', (req, res)=>{

	res.send(users);
})

app.post('/signin', (req, res)=>{

	// if(req.body.email === users[0].email 
	// 	&& req.body.password === users[0].password){

	// 	res.json(users[users.length-1]);
	// }
	// else{

	// 	res.status(400).json("Sign in fail");
	// }

	let userArr = users.filter((user)=>{
		if(req.body.email === user.email 
		&& req.body.password === user.password){
			return true;
		}
		return false;
	});

	userArr.length === 0?res.status(400).json("Sign in fail") : res.json(userArr[0]);
})

app.post('/register', (req, res)=>{
	
	const {email, password, name} = req.body;

	users.push({
		id:'3',
		name:name,
		email:email,
		password:password,
		entry:0
	});

	res.json(users[users.length-1]);
})

app.get('/profile/:id', (req, res)=>{

	const {id} = req.params;

	const userArr = users.filter(user=>{

		if(user.id===id)
			return user;
	})

	if(userArr.length > 0){
		return res.json(userArr[0]);
	}

	res.status(400).json('user not found');
})

app.put('/image', (req, res)=>{

	const {id} = req.body;

	let found = false;
	users.forEach(user=>{
		if(user.id===id){
			found = true;
			user.entry+=1;
			return res.json({entry:user.entry});
		}
	})

	if(!found)
		return res.json(users);
})

app.listen(3000, ()=>{
	console.log('Server started !!!!');
})