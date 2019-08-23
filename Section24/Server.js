const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next)=>{
	console.log("middleware execute");
	next();
})

app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
	const user={
		name:"Marry",
		age:44
	}
	res.send(user);
})

app.post('/profile', (req, res)=>{
	console.log(req.body);
	const profile = {
		name:"Hen",
		age:29,
		relationship:"single",
		rich:true
	}

	res.send(profile);
})

app.listen(3000, ()=>{
	console.log('Server started!!!');
});