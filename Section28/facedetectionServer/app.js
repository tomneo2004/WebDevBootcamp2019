require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const imageRoute = require('./router/imageRoute');
const db = require('./database/database')();



// const db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'Nelson',
//     password : '',
//     database : 'facedetectionDB'
//   }
// });

// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//   	ssl: process.env.DBSSL
//   }
// });

const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next)=>{

	req.appConfig = {
		db:db
	}

	next();
});


app.get('/', (req, res)=>{

	res.send(`Server is working`);
})

app.post('/signin', (req, res)=>{signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db)})

app.use('/image',imageRoute)

// app.put('/image', (req, res)=>{image.handleImage(req, res, db)})

// app.post('/image/detectface', (req, res)=>{image.handleAPICall(req, res)})

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`Server started at port ${process.env.PORT} !!!!`);
})