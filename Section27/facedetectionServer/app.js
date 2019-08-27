const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
var knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Nelson',
    password : '',
    database : 'facedetectionDB'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res)=>{

	res.send(users);
})

app.post('/signin', (req, res)=>{

	const {email, password} = req.body;

	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(async data=>{

		if(data.length > 0){

			const isValid = await bcrypt.compare(password, data[0].hash);

			if(isValid){

				db.select('*').from('users')
				.where('email', '=', req.body.email)
				.then(user=>{

					return res.json(user[0]);
				})
			}
			else{
				
				throw 'incorrect password';
			}
		}
		else{
			throw 'incorrect email';
		}
		
	})
	.catch(err=>{
		res.status(400).json('unable to sign in '+err);
	})
})

app.post('/register', async (req, res)=>{
	
	const {email, password, name} = req.body;
	const hash = await bcrypt.hash(password, 10);

	db.transaction(trx=>{

		
		db.insert({
			email:email,
			hash:hash
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{

			db.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.into('users')
			.returning('*')
			.then(user=>{

				res.json(user[0])
			})
		})
		.then(trx.commit)
		.catch(trx.rollback);
	})
	.catch(err=>{
		console.log(err);
		res.status(400).json('Unable to register');
	});
	
})

app.get('/profile/:id', (req, res)=>{

	const {id} = req.params;

	db.select('*').from('users').where({
		id:id
	})
	.then(user=>{

		if(user.length > 0){
			return res.json(user);
		}
		else{

			throw 'User does not exist';
		}
	})
	.catch(err=>{

		return res.status(400).json(err);
	})
	
})

app.put('/image', (req, res)=>{

	const {id} = req.body;

	db('users')
  	.where({id:id})
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries=>{

  		if(entries.length > 0)
  			return res.json(entries[0]);
  		else
  			throw 'Increase entries fail'
  	})
  	.catch(err=>{

  		return res.status(400).json(err);
  	});

})

app.listen(3000, ()=>{
	console.log('Server started !!!!');
})